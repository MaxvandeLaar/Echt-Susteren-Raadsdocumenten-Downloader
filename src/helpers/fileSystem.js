import {dialog} from 'electron';
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
