const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu } = electron;

let mainWindow;
let calculateWindow;

//Listen for app to be ready
app.on('ready', function () {
    //Create new window
    mainWindow = new BrowserWindow({});
    //Load html into window
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file',
        slashes: true
    }));

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Isert menu
    Menu.setApplicationMenu(mainMenu);
});

//Handle create calculate window
function createCalculateWindow() {
    //Create new window
    calculateWindow = new BrowserWindow({
        width: 200,
        height: 300,
        title: 'Please enter meter number'
    });


    //Load html into window
    calculateWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'calculateWindow.html'),
        protocol: 'file',
        slashes: true
    }));

}

//Create menu template
const mainMenuTemplate = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Calculate Bill',
                click() {
                    creatCalculateWindow();
                }

            },
            {
                label: 'Clear'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click() {
                    app.quit();
                }
            }

        ]
    }
];
