const { BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');

let addWin;

function addAnimal(win) {
	addWin = new BrowserWindow(
		{width: 800, height: 600, title: 'Add Animal'}
	);

	 addWin.loadURL(url.format({
        pathname: path.join(__dirname, 'addAnimal.html'),
        protocol: 'file:',
        slashes: true
    }));

	 addWin.on('close', function(){
	 	addWin = null;
	 });

	 return addWin;
}

module.exports.addAnimal = addAnimal;