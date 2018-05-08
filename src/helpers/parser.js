import {ipcMain} from 'electron';
import request from 'request';
import cheerio from 'cheerio';
import sanitizeFile from 'sanitize-filename';

function createEvent(item) {
    let event = {};
    event.url = item.attr('href');
    event.title = item.find('.vergadering_lijst_item').text().trim();
    event.date = item.find('.datum').text().trim();
    return event;
}

export function getMeetings(url) {
    return new Promise((fulfill, reject) => {
        request(url, function (error, response, html) {
            if (error) {
                reject(error);
            } else {
                const $ = cheerio.load(html);
                let events = {past: [], upcoming: []};
                $('#recente_vergaderingen').find('.content').find('ul').children().each((x, elem) => {
                    const item = $(elem).find('a');
                    let event = createEvent(item);
                    if (event.date) {
                        events.past.push(event);
                    }
                });

                $('#toekomstige_vergaderingen').find('.content').find('ul').children().each((x, elem) => {
                    const item = $(elem).find('a');
                    let event = createEvent(item);
                    if (event.date) {
                        events.upcoming.push(event);
                    }
                });

                fulfill(events);
            }
        });
    });
}

export function getSubjects(meeting) {
    return new Promise((fulfill, reject) => {
        request(meeting.url, function (error, response, html) {
            if (!error) {
                let $ = cheerio.load(html);

                let subjects = [];
                $('.agenda_item').each((x, item) => {
                    const titleElem = $(item).find('.item_title');
                    const prefix = titleElem.find('.item_prefix').text();
                    const caption = titleElem.clone().children().remove().end().text().trim();
                    let subject = {};
                    subject.title = sanitize(`${prefix} ${caption}`);
                    subject.documents = [];
                    $(item).find('.documents').children().each((y, elem) => {
                        let documentElem = $(elem).find('a');
                        let document = {};
                        document.url = documentElem.attr('href');
                        document.title = sanitize(documentElem.find('.document_title').first().text());
                        subject.documents.push(document);
                    });
                    subjects.push(subject);
                });
                fulfill(subjects);
            } else {
                reject(error);
            }
        });
    });
}

export function getAgenda(meeting) {
    return new Promise((fulfill, reject) => {
        request(meeting.url, function (error, response, html) {
            if (!error) {
                let $ = cheerio.load(html);

                let agenda = {};
                let agendaElem = $('#agenda_container');
                agenda.title = agendaElem.find('h2').clone().children().remove().end().text().trim().replace(/\s\s+/g, ' ');
                agenda.date = agendaElem.find('.field_date').text().trim();
                agenda.startTime = agendaElem.find('.field_start_time').text().trim();
                agenda.location = agendaElem.find('.field_location').text().trim();
                agenda.clerk = agendaElem.find('.field_clerk').text().trim();
                agenda.chairmen = agendaElem.find('.field_chairman').text().trim();
                agenda.attachments = [];
                agenda.pdfForm = {};
                agenda.pdfForm.export_format = 'pdf';
                agenda.pdfForm.export_type = 'event';
                const entityIdRegex = /entity_id\s?:\s?"(.*)"/gi;
                const entityId = entityIdRegex.exec($.html());
                agenda.pdfForm.selected_items = entityId[1] || null;
                agenda.pdfForm.url = $('#export_form').attr('action');


                $('#agenda_attachments_list').children().each((x, item) => {
                    let attachment = {};
                    let elem = $(item);
                    attachment.url = elem.find('a').attr('href');
                    let tempElem = elem.find('a').clone();
                    tempElem.find('.pdf').remove();
                    tempElem.find('.document_size').remove();
                    tempElem.find('.document_type').remove();
                    attachment.title = sanitize(tempElem.find('span').text());

                    agenda.attachments.push(attachment);
                });
                fulfill(agenda);
            } else {
                reject(error);
            }
        });
    });
}

function sanitize(string){
    return sanitizeFile(string.trim().replace(/"g/, "'"));
}


ipcMain.on('get-events', async (event, args) => {
    let events = await getEvents(config.eventsPage).catch((reason) => {
        console.error('SOMETHING WENT WRONG!!!');
        console.error(reason);
        event.sender.send('get-events-error', reason);
    });
    console.log(events);
    if (events){
        event.sender.send('get-events-done', events);
    }
});

ipcMain.on('get-single-event', async (event, args) => {
    let data = {};
    data.event = args;
    data.agenda = await getAgenda(args).catch((reason) => {
        console.error(reason);
        event.sender.send('get-single-event-error', reason);
    });
    data.subjects = await getSubjects(args).catch((reason) => {
        console.error(reason);
        event.sender.send('get-single-event-error', reason);
    });
    event.sender.send('get-single-event-done', data);
});