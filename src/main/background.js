import path from 'path';
import url from 'url';
import {app, Menu} from 'electron';
import {devMenuTemplate} from '../menu/dev_menu_template';
import {editMenuTemplate} from '../menu/edit_menu_template';
import createWindow from '../helpers/window';
import './listeners';
import {autoUpdater} from 'electron-updater';

// Special module holding environment variables which you declared
// in config/env_xxx.json file.
import env from 'env';
import provider from 'provider';

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

app.on('ready', () => {
    autoUpdater.setFeedURL(provider);
    autoUpdater.checkForUpdatesAndNotify();
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
