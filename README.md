# cmspid 🆔

**Creative Managed Serialized Pseudo-Identifier**

`cmspid` is a specialized encoding library designed to transform any data into a string that mirrors the visual structure of a **UUID (RFC 4122)**, while remaining fully reversible—just like **Base64**.

---

## 🚀 Installation

### Node.js
```bash
npm install cmspid
```

### Web (CDN)
You can include `cmspid` directly in your HTML using a CDN:

```html
<script src="https://cdn.jsdelivr.net/gh/JuniorSchueller/cmspid@main/dist/cmspid.min.js"></script>
```

---

## 🛠 Usage

### In the Browser
Once the script is loaded, the `cmspid` object is available globally:

```javascript
// Encoding
const token = cmspid.encode("Hello World");
console.log(token); // 48656c6c-6f20-576f-726c-64

// Decoding
const original = cmspid.decode(token);
console.log(original); // "Hello World"
```

### In Node.js
```javascript
const cmspid = require('cmspid');

const encoded = cmspid.encode("secure_data");
const decoded = cmspid.decode(encoded);
```

---

## ✨ Features
- **UUID Aesthetic**: Outputs standard `8-4-4-4-N` formatting.
- **Ultra Lightweight**: Less than 1kb minified.
- **Bi-directional**: Encodes and decodes strings or Buffers.
- **Zero Dependencies**: Pure JavaScript.

## ⚙️ API
- `cmspid.encode(input)`: Returns a UUID-formatted string.
- `cmspid.decode(pid, encoding)`: Returns decoded data (Default: `utf8`).
- `cmspid.isValid(str)`: Returns `true` if the string matches the cmspid format.

## 📄 License
MIT License.
