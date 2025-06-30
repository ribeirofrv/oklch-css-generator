## 🎨 OKLCH CSS Generator

Converta uma lista de cores HEX para variáveis CSS usando o espaço de cor `oklch()` — ideal para melhor controle de luminosidade e contraste.

---

### Instalação

1. Clone este repositório ou copie os arquivos:

   ```bash
   git clone https://github.com/seu-usuario/oklch-css-generator.git
   cd oklch-css-generator
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

---

### Uso

```bash
node oklch-css-generator.mjs <entrada.txt> [saida.css]
```

* `entrada.txt`: Arquivo com cores HEX, uma por linha.
* `saida.css`: (opcional) Nome do arquivo gerado. Padrão: `cores.css`.

#### Ajuda

```bash
node oklch-css-generator.mjs --help
```

---

### Exemplo

#### entrada: `cores.txt`

```
#ff6347
#3498db
#1e1e1e
#ffffff
```

#### comando:

```bash
node oklch-css-generator.mjs cores.txt
```

#### saída: `cores.css`

```css
:root {
  --color-1: oklch(0.627 0.257 29.23);
  --color-2: oklch(0.692 0.153 250.15);
  --color-3: oklch(0.181 0.011 262.25);
  --color-4: oklch(1 0 0);
}
```

---

### Como usar no seu CSS

```css
body {
  background: var(--color-3);
  color: var(--color-4);
}

button {
  background: var(--color-1);
  border-color: var(--color-2);
}
```

---

### Tecnologias

* [Color.js](https://colorjs.io/) – Conversão de espaços de cor
* [Chalk](https://www.npmjs.com/package/chalk) – Saída colorida no terminal
* Node.js (Módulo ES)

---

### Referências

* [OKLCH: Better color for the web](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl)
* [colorjs.io](https://colorjs.io/)
* [OKLCH color converter](https://oklch.com/)

---

### Licença

MIT © Hyimi 💜
