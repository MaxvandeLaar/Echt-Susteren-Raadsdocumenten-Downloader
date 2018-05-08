import {ipcMain} from 'electron';
import request from 'request';
import cheerio from 'cheerio';
import sanitizeFile from 'sanitize-filename';

function createMeeting(item) {
    let meeting = {};
    meeting.url = item.attr('href');
    meeting.title = sanitize(item.find('.vergadering_lijst_item').text());
    meeting.date = sanitize(item.find('.datum').text());
    meeting.id = `${meeting.date}-${meeting.title}`;
    return meeting;
}

export function getMeetings(url) {
    return new Promise((fulfill, reject) => {
        request(url, function (error, response, html) {
            if (error) {
                reject(error);
            } else {
                const $ = cheerio.load(html);
                let meetings = {past: [], upcoming: []};
                $('#recente_vergaderingen').find('.content').find('ul').children().each((x, elem) => {
                    const item = $(elem).find('a');
                    let meeting = createMeeting(item);
                    if (meeting.date) {
                        meetings.past.push(meeting);
                    }
                });

                $('#toekomstige_vergaderingen').find('.content').find('ul').children().each((x, elem) => {
                    const item = $(elem).find('a');
                    let meeting = createMeeting(item);
                    if (meeting.date) {
                        meetings.upcoming.push(meeting);
                    }
                });

                fulfill(meetings);
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
                agenda.pdfForm.selected_items = entityId[1] || "";
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
