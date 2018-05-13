import {ipcMain} from 'electron';
import {getFolder, openDialog} from '../helpers/fileSystem';
import {getMeetings, getAgenda, getSubjects} from '../helpers/parser';
import {downloadMeeting, getActiveDownloads, getDownloads} from '../helpers/download';
import env from 'env';
import Store from 'electron-store';
const store = new Store();
import log from 'electron-log';

ipcMain.on('open-dialog', (event, args) => {
    log.info('MainEvent: open-dialog');
    const callback = (folderPaths) => {
        if (folderPaths && folderPaths[0]) {
            log.info(`Save downloads folder ${folderPaths[0]}`);
            store.set('folder', folderPaths[0]);
            event.sender.send('folder-stored', folderPaths[0]);
        }
    };
    openDialog({}, callback);
});

ipcMain.on('get-meetings', (event, args) => {
    log.info('MainEvent: get-meetings');
    getMeetings(env.meetingsPage).then((meetings) => {
        log.debug('MainSend: received-meetings', meetings);
        event.sender.send('received-meetings', meetings);
    }, (reason) => {
        log.error('MainSend: received-meetings-error');
        log.error(reason);
    });
});

ipcMain.on('get-meeting', (event, args) => {
    log.info('MainEvent: get-meeting');
    Promise.all([getAgenda(args), getSubjects(args)]).then((values) => {
        const data = {meeting:args, agenda: values[0], subjects:values[1]};
        log.info('MainSend: received-meeting', data);
        event.sender.send('received-meeting', data);
    }, (reason) => {
        log.error('MainSend: received-meeting-error');
        log.error(reason);
    });
});

ipcMain.on('download-meeting', (event, args) => {
    log.info('MainEvent: download-meeting');
    downloadMeeting(event, args);
});

ipcMain.on('get-downloads', (event, args) => {
    const downloads = {active:getActiveDownloads(), finished: getDownloads()};
    log.debug('MainEvent: get-downloads', downloads);
    event.returnValue = downloads;
});

ipcMain.on('get-folder', (event, args) => {
    event.returnValue = getFolder();
});