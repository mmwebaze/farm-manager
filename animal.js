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
function addLivestockType(){
    let addLiveStockTypeWin = new BrowserWindow(
        {width: 800, height: 600, title: 'Add Livestock Type'}
    );

    addLiveStockTypeWin.loadURL(url.format({
        pathname: path.join(__dirname, 'livestock/livestocktype.html'),
        protocol: 'file:',
        slashes: true
    }));

    addLiveStockTypeWin.on('close', function(){
        addLiveStockTypeWin = null;
    });

    return addLiveStockTypeWin;
}
function addLivestockCategory(){
    let addLiveStockCategoryWin = new BrowserWindow(
        {width: 800, height: 600, title: 'Add Livestock Category'}
    );

    addLiveStockCategoryWin.loadURL(url.format({
        pathname: path.join(__dirname, 'livestock/livestockcategory.html'),
        protocol: 'file:',
        slashes: true
    }));

    addLiveStockCategoryWin.on('close', function(){
        addLiveStockCategoryWin = null;
    });

    return addLiveStockCategoryWin;
}
module.exports.addAnimal = addAnimal;
module.exports.addLivestockType = addLivestockType;
module.exports.addLivestockCategory = addLivestockCategory;