# 🥚 Egg Thrower Chrome Extension

Egg Thrower is a fun and light-hearted Chrome extension that lets you throw virtual eggs on any webpage using a keyboard shortcut. Perfect for letting off steam or surprising your coworkers!

## 🚀 Features
- Press `⌘ + /` (Mac) to drop an egg from the top of the screen.
- The egg cracks on impact.
- Eggs clear automatically after 3 seconds.

## 🧩 How to Use
1. Install the extension from the Chrome Web Store (or load as unpacked during development).
2. Press `⌘ + /` to throw an egg!
3. Release the keys to start the countdown for cleanup.

## 🛠 Development Setup
1. Clone/download the extension folder.
2. Visit `chrome://extensions/` in Chrome.
3. Enable **Developer Mode**.
4. Click **Load unpacked** and select the extension folder.

## 📦 Folder Contents
- `manifest.json` – extension metadata
- `content.js` – keyboard logic and egg animation
- `background.js` – placeholder
- `egg.png` – egg image
- `cracked_egg.png` – cracked egg image
- `icon.png` – extension icon

## 🧼 Permissions
We use `activeTab` and `scripting` to inject animation into the current page. No data is collected or tracked.

## 🧃 License
MIT – free to use, remix, and enjoy!

Made with yolk and joy 🐣
