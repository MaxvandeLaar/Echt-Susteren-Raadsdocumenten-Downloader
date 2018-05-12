import {dialog} from 'electron';
import fs from 'fs';
import Store from 'electron-store';
const store = new Store();

/**
 *
 * @param (options) - {}
 * @param (callback) - function
 */
export function openDialog(options, callback) {
    let defaults = {
        title: 'Kies een hoofdmap waarin alles wordt opgeslagen',
        properties: ['openDirectory', 'createDirectory', 'promptToCreate'],
        message: 'Kies een hoofdmap waarin alles wordt opgeslagen'
    };
    const defaultFolder = getFolder();
    if (defaultFolder && fs.existsSync(defaultFolder)){
        defaults.defaultPath = getFolder();
    }
    if (!callback) {
        callback = (folderPaths) => {
            if (folderPaths && folderPaths[0]) {
                store.set('folder', folderPaths[0]);
            }
        };
    }
    const config = Object.assign(defaults, options);
    dialog.showOpenDialog(config, callback);

}

export function getFolder(){
    return store.has('folder') && store.get('folder')? store.get('folder'): '';
}
