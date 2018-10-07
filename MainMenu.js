const {app, Menu} = require('electron');
//const electron = require('electron')
//const url = require('url');
let animal = require('./animal')

const menuTemplate = [
      {
        label: 'File',
        submenu:[
        {
          label: 'Quit',
          accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
          click(){
            app.quit();
          }
        }
        ]
      },
        {
            label: 'Animals',
            submenu: [
            {
              label: 'Add',
              click(){
                let addWin = animal.addAnimal();
                //addWin.show();
                //win.show();

              }
              //role: 'hello'
            },
            {
              type: 'separator'
            },
            {
              role: 'UNDO'
            }
            ]
        },
        {
            label: 'Health',
            submenu: [{role: 'help'}]
        },
        {
            label: 'Financials',
            submenu: [{role: 'TODO'}]
        },
        {
            label: 'Reports',
            submenu: [{role: 'TODO'}]
        },
        {
            label: 'Settings',
            submenu: [{role: 'TODO'}]
        }
    ];

module.exports.menuTemplate = menuTemplate;