import path from 'path';
import url from 'url';
import {app, Menu} from 'electron';
import {devMenuTemplate} from '../menu/dev_menu_template';
import {editMenuTemplate} from '../menu/edit_menu_template';
import createWindow from '../helpers/window';
import './listeners';
const log = require('electron-log');
import {autoUpdater} from 'electron-updater';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from 'env';
import provider from 'provider';
autoUpdater.logger = log;
autoUpdater.logger.transports.file.level = 'info';
log.info('App starting...');

const setApplicationMenu = () => {
    const menus = [editMenuTemplate];
    if (env.name !== 'production') {
        menus.push(devMenuTemplate);
    }
    // Menu.setApplicationMenu(Menu.buildFromTemplate(menus));
};

// Save userData in separate folders for each environment.
// Thanks to this you can use production and development versions of the app
// on same machine like those are two separate apps.
if (env.name !== 'production') {
    const userDataPath = app.getPath('userData');
    app.setPath('userData', `${userDataPath} (${env.name})`);
}

autoUpdater.on('checking-for-update', () => {
    log.info('Checking for update...');
});
autoUpdater.on('update-available', (info) => {
    log.info('Update available.');
});
autoUpdater.on('update-not-available', (info) => {
    log.info('Update not available.');
});
autoUpdater.on('error', (err) => {
    log.info('Error in auto-updater. ' + err);
});
autoUpdater.on('download-progress', (progressObj) => {
    let log_message = "Download speed: " + progressObj.bytesPerSecond;
    log_message = log_message + ' - Downloaded ' + progressObj.percent + '%';
    log_message = log_message + ' (' + progressObj.transferred + "/" + progressObj.total + ')';
    log.info(log_message);
});
autoUpdater.on('update-downloaded', (info) => {
    log.info('Update downloaded');
});

app.on('ready', () => {
    // autoUpdater.setFeedURL(provider);
    autoUpdater.checkForUpdates().then((value) => {
        log.info(value);
    }, (reason) => {
        log.error(reason);
    });
    setApplicationMenu();

    const mainWindow = createWindow('main', {
        width: 1000,
        height: 600
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, 'app.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    if (env.name === 'development') {
        mainWindow.openDevTools();
    }
});

app.on('window-all-closed', () => {
    app.quit();
});
