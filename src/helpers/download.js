import {ipcMain, dialog} from 'electron';
import download from 'download';
import moment from 'moment';
import Store from 'electron-store';
const store = new Store();
import readChunk from 'read-chunk';
import fileType from 'file-type';
import fs from 'fs';

let activeDownloads = [];
let downloads = [];

export function getActiveDownloads(){
    return activeDownloads;
}

export function getDownloads() {
    return downloads;
}

export async function downloadMeeting(event, args) {
    const agenda = args.agenda;
    const selectedEvent = args.meeting;
    const subjects = args.subjects;
    const date = moment(selectedEvent.date, 'DD-MM-YYYY').format('YYYY-MM-DD');
    const rootFolder = store.has('folder') && store.get('folder') ? `${store.get('folder')}/` : '';
    const folder = `${rootFolder}${date} ${selectedEvent.title}`;
    args.folder = folder;
    activeDownloads.push(args);
    event.sender.send('download-meeting-start', {active: activeDownloads, finished: downloads});
    await downloadAsync(folder, agenda, subjects);

    if (!downloads.includes(args)){
        downloads.push(args);
    }
    activeDownloads.splice(activeDownloads.indexOf(args), 1);
    event.sender.send('download-meeting-done', {active: activeDownloads, finished: downloads});
}

async function downloadAsync(folder, agenda, subjects) {
    await downloadDocuments(`${folder}/0 Agenda`, agenda.attachments);


    await download(agenda.pdfForm.url, `${folder}/0 Agenda`, {filename: 'Agenda.pdf', method:"POST", form:true, body:agenda.pdfForm}).then(() => {
        console.log('DONE DOWNLOADING AGENDA');
    });
    for (let i = 0; i < subjects.length; i++){
        await downloadDocuments(`${folder}/${subjects[i].title}`, subjects[i].documents);
    }
}

function downloadDocuments(folder, documents){
    return new Promise(async (fulfill, reject) => {
        let count = 0;
        await Promise.all(documents.map(
            async (x) => {
                await download(x.url, folder, {filename: x.title}).then(() => {
                    const buffer = readChunk.sync(`${folder}/${x.title}`, 0, 4100);
                    const type = fileType(buffer);
                    const ext = type.ext || '';
                    fs.renameSync(`${folder}/${x.title}`,`${folder}/${x.title}.${ext}`);
                    count++;
                    console.log(`##---------- ${count}/${documents.length}: '${x.title}' is downloaded`);
                });
            })).then(() => {
            console.log(`############ ${folder} Finished! ${count} of ${documents.length} files downloaded`);
            fulfill(true);
        });
    });
}
