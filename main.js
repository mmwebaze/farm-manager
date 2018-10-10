// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, ipcMain} = require('electron');
const url = require('url');
const path = require('path');
const uuid = require('uuid4');

let knex = require('./database');
let menuTemplate = require('./MainMenu');
let livestockDb = require('./livestockdb');

let win = null;


function createWindow() {
    win = new BrowserWindow({fullscreen: true, transparent: true})

    // load the dist folder from Angular
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));

    win.on('closed', function () {
        app.quit()
    });


    // Open the DevTools optionally:
    win.webContents.openDevTools()

    win.on('closed', function () {
        win = null;
    });


    if (process.platform === 'darwin') {

        menuTemplate.menuTemplate.unshift({});

    }

    const menu = Menu.buildFromTemplate(menuTemplate.menuTemplate);
    Menu.setApplicationMenu(menu);
}

//handle database requests
ipcMain.on('Hello', function (e, item) {
    console.log(item);
    menuTemplate.livestockCategoryWin.webContents.send('info' , {msg:'hello from main process'});
});

ipcMain.on('livestock', function (e, item) {

    if ('addLiveStockCategory' === item['id']){
        console.log('**** '+item['id']);
        livestockDb.save('livestock_category', {'uuid': uuid(), 'name': item['categoryName'], 'livestock_type_uuid': item['typeUuid']})
    }
    else{

    }

});

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    if (win === null) {
        createWindow();
    }
});

if (process.env.NODE_ENV !== 'production') {
    menuTemplate.menuTemplate.push({
        label: 'Developer tools',
        submenu: [
            {
                label: 'Toggle DevTools',
                accelerator: process.platform === 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}