const electron = require('electron');
const {app, Menu} = electron;

const Window = require('./js/window')

let window;

function createWindow()
{
    window = new Window({
        file: 'html/loadingscreen.html'
    });
    
    //Menu.setApplicationMenu(null);
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
    if (process.platform != "darwin")
    {
        app.quit();
    }
})
