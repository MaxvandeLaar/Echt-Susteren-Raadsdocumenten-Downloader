import {ipcMain} from 'electron';
import {getFolder, openDialog} from '../helpers/fileSystem';
import {getMeetings, getAgenda, getSubjects} from '../helpers/parser';
import {downloadMeeting, getActiveDownloads, getDownloads} from '../helpers/download';
import env from 'env';
import Store from 'electron-store';
const store = new Store();

ipcMain.on('open-dialog', (event, args) => {
    const callback = (folderPaths) => {
        if (folderPaths && folderPaths[0]) {
            store.set('folder', folderPaths[0]);
            event.sender.send('folder-stored', folderPaths[0]);
        }
    };
    openDialog({}, callback);
});

ipcMain.on('get-meetings', (event, args) => {
    getMeetings(env.meetingsPage).then((meetings) => {
        event.sender.send('received-meetings', meetings);
    }, (reason) => {
        console.error(reason);
    });
});

ipcMain.on('get-meeting', (event, args) => {
    Promise.all([getAgenda(args), getSubjects(args)]).then((values) => {
        let data = {meeting:args, agenda: values[0], subjects:values[1]};
        event.sender.send('received-meeting', data);
    }, (reason) => {
        console.error(reason);
    });
});

ipcMain.on('download-meeting', (event, args) => {
    event.sender.send('');
    downloadMeeting(event, args);
});

ipcMain.on('get-downloads', (event, args) => {
    event.returnValue = {active:getActiveDownloads(), finished: getDownloads()};
});

ipcMain.on('get-folder', (event, args) => {
    event.returnValue = getFolder();
});