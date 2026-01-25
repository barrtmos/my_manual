import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const taxonomyPath = path.join(root, "src", "config", "taxonomy.ts");
const outputPath = path.join(root, "public", "admin", "config.yml");

const taxonomySource = fs.readFileSync(taxonomyPath, "utf-8");

const extractList = (name) => {
  const match = taxonomySource.match(new RegExp(`export const ${name} = \\[(?<body>[\\s\\S]*?)\\]`, "m"));
  if (!match?.groups?.body) {
    throw new Error(`Unable to read ${name} from taxonomy.ts`);
  }
  return Array.from(match.groups.body.matchAll(/"([^"]+)"/g)).map((item) => item[1]);
};

const structuralSections = extractList("structural");
const topicTags = extractList("topics");

const list = (items, indent = 6) =>
  items.map((item) => `${" ".repeat(indent)}- "${item}"`).join("\n");

const yml = `backend:\n  name: git-gateway\nlocal_backend: true\nmedia_folder: "public/img"\npublic_folder: "/img"\n\ncollections:\n  - name: "notes"\n    label: "Notes"\n    folder: "src/content/notes"\n    create: true\n    slug: "{{slug}}"\n    fields:\n      - { label: "Title", name: "title", widget: "string" }\n      - { label: "Date", name: "date", widget: "datetime", format: "YYYY-MM-DD", date_format: "YYYY-MM-DD", time_format: false }\n      - label: "Structural"\n        name: "structural"\n        widget: "select"\n        options:\n${list(structuralSections, 10)}\n      - label: "Topics"\n        name: "topics"\n        widget: "select"\n        options:\n${list(topicTags, 10)}\n        multiple: true\n      - { label: "Draft", name: "draft", widget: "boolean", required: false, default: false }\n      - { label: "Body", name: "body", widget: "markdown" }\n`;

fs.writeFileSync(outputPath, yml);
console.log(`CMS config written to ${outputPath}`);
