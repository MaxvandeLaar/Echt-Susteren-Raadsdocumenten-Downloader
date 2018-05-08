import {ipcMain} from 'electron';
import {openDialog} from '../helpers/fileSystem';
import {getMeetings, getAgenda, getSubjects} from '../helpers/parser';
import {downloadMeeting, getActiveDownloads, getDownloads} from '../helpers/download';
import env from 'env';

ipcMain.on('open-dialog', (event, args) => {
    openDialog();
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