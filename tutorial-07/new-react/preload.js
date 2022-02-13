// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('darkMode', {
    dark: () => ipcRenderer.invoke('dark-mode:dark'),
    light: () => ipcRenderer.invoke('dark-mode:light')
})

contextBridge.exposeInMainWorld('electron', {
    ipcRenderer,
});

contextBridge.exposeInMainWorld('translate', {
    on: (topic, fn) => {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(topic, (event, ...args) => fn(...args));
    },
});

// 所有Node.js API都可以在预加载过程中使用。
// 它拥有与Chrome扩展一样的沙盒。
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})
