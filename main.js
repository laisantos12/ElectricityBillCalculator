const electron = require('electron');
const url = require('url');
const path = require('path');

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let calculateWindow;


function calculateBill() {

    var charges = 0.04;
    var rate = 0.20;
    var vat = 13.50;

    var inputUnit = document.getElementById('number');
    var inputDays = document.getElementById('period'); 

    var billClean = inputUnit * rate + inputDays * charges;

        if (inputUnit == 225 && inputDays == 60){

         return  billClean + billClean * vat / 100;

        }
       
        else{
            return "Plese check your input and try again";
        }
    }

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
    //Quit app when closed
    mainWindow.on('closed', function () {
        app.quit();
    });

    //Build menu from template
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    //Isert menu
    Menu.setApplicationMenu(mainMenu);
});

//Handle create calculate window
function createCalculateWindow() {
    //Create new window
    calculateWindow = new BrowserWindow({
        width: 300,
        height: 200,
        title: 'Calculate bill',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    //Garbage collection handle
    calculateWindow.on('close', function () {
        calculateWindow = null;
    });

    //Load html into window
    calculateWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'calculateWindow.html'),
        protocol: 'file',
        slashes: true
    }));

}

//Catch amount:calculate
ipcMain.on('amount:calculate', function (e, amount) {
    console.log(amount);
    mainWindow.webContents.send('amount:calculate', amount);
    calculateWindow.close();
})

//Create menu template
const mainMenuTemplate = [
    {
        label: 'Menu',
        submenu: [
            {
                label: 'Calculate Bill',
                click() {
                    createCalculateWindow();
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

//If mac, add empty object to menu
if (process.platform == 'darwin') {
    mainMenuTemplate.unshift({});
}

//Add developer tool item if not in prod
if (process.env.NODE_ENV !== 'production') {
    mainMenuTemplate.push({
        label: 'Developer Tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();

                }
            },
            {
                role: 'reolad'
            }

        ]
    });
}
