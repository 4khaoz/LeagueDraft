const {BrowserWindow} = require('electron');

const DefaultProperties = {
    width: 1280,
    height: 800,
    webPreferences: {
        nodeIntegration: true,
    }
}

class Window extends BrowserWindow {
    constructor({file, ...windowSettings})
    {
        super({...DefaultProperties, ...windowSettings});
        this.loadFile(file);
        console.log(file);

        this.resizable = false;

        this.once('ready-to-show', () => {
            this.show();
        })

        require("../auth.js")
        setTimeout(() => {
            this.loadFile("html/index.html");
        }, 3000);
        
    }
}

module.exports = Window;