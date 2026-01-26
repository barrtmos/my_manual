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

const updateOptionsBlock = (source, label, items, indent) => {
  const pattern = new RegExp(
    `(label:\\s*\\"${label}\\"[\\s\\S]*?options:\\n)([\\s\\S]*?)(?=\\n\\s*(?:- label:|- \\{ label:|$))`,
    "m"
  );
  const replacement = `$1${list(items, indent)}`;
  if (!pattern.test(source)) {
    return source;
  }
  return source.replace(pattern, replacement);
};

const defaultYml = `backend:\n  name: git-gateway\nlocal_backend: true\nmedia_folder: "public/img"\npublic_folder: "/img"\n\ncollections:\n  - name: "notes"\n    label: "Notes"\n    folder: "src/content/notes"\n    create: true\n    slug: "{{slug}}"\n    fields:\n      - { label: "Title", name: "title", widget: "string" }\n      - { label: "Date", name: "date", widget: "datetime", format: "YYYY-MM-DD", date_format: "YYYY-MM-DD", time_format: false }\n      - label: "Structural"\n        name: "structural"\n        widget: "select"\n        options:\n${list(structuralSections, 10)}\n      - label: "Topics"\n        name: "topics"\n        widget: "list"\n        max: 1\n        field:\n          label: "Topic"\n          name: "topic"\n          widget: "select"\n          options:\n${list(topicTags, 12)}\n      - { label: "Draft", name: "draft", widget: "boolean", required: false, default: false }\n      - { label: "Body", name: "body", widget: "markdown" }\n`;

const existingYml = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, "utf-8") : defaultYml;
let yml = updateOptionsBlock(existingYml, "Structural", structuralSections, 10);
yml = updateOptionsBlock(yml, "Topics", topicTags, 12);

fs.writeFileSync(outputPath, yml);
console.log(`CMS config written to ${outputPath}`);
