#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Color from 'colorjs.io';
import chalk from 'chalk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const args = process.argv.slice(2);

if (args.includes('--help') || args.length < 1) {
  console.log(`
${chalk.bold('🎨 OKLCH CSS Generator')}
Converte uma lista de cores HEX em variáveis CSS usando OKLCH.

${chalk.bold('Uso:')}
  oklch-css-generator.mjs <arquivo_entrada> [arquivo_saida]

${chalk.bold('Exemplo:')}
  oklch-css-generator.mjs cores.txt cores.css
`);
  process.exit(0);
}

const inputFile = args[0];
const outputFile = args[1] || 'cores.css';

if (!fs.existsSync(inputFile)) {
  console.error(chalk.red(`❌ Arquivo não encontrado: ${inputFile}`));
  process.exit(1);
}

const inputLines = fs.readFileSync(inputFile, 'utf-8')
  .split('\n')
  .map(line => line.trim())
  .filter(line => line.length > 0);

// Expressão para capturar HEX válidos (#rgb, #rrggbb, #rgba, #rrggbbaa)
const hexRegex = /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/;

const lines = [':root {'];
let index = 1;

inputLines.forEach((line) => {
  const match = line.match(hexRegex);

  if (!match) {
    console.log(chalk.yellow(`⚠ Ignorado (sem cor HEX): ${line}`));
    return;
  }

  const hex = match[0];

  try {
    const color = new Color(hex);
    const oklchColor = color.to('oklch');
    let [l, c, h] = oklchColor.coords;

    l = Number(l).toFixed(4);
    c = Number(c).toFixed(4);
    h = c == 0 ? '0' : Number(h).toFixed(2); // hue deve ser 0 se acromático

    const oklch = `oklch(${l} ${c} ${h})`;

    const varName = `--color-${index}`;
    lines.push(`  ${varName}: ${oklch};`);
    console.log(chalk.green(`✔ ${varName}`), chalk.hex(hex)(hex), chalk.gray('→'), chalk.whiteBright(oklch));
    index++;
  } catch {
    console.log(chalk.red(`✖ Ignorado: ${hex} (cor inválida)`));
  }
});

lines.push('}');

fs.writeFileSync(outputFile, lines.join('\n') + '\n', 'utf-8');
console.log(chalk.blueBright(`\n🎉 CSS gerado com ${index - 1} variáveis.`));
console.log(chalk.gray(`📁 Salvo em: ${outputFile}`));
