import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {ipcRenderer} from 'electron';
const urlExists = require('url-exists');

export default class MeetingsList extends React.Component {
    render() {
        return (
            <div className="grid-y grid-margin-y">
                <div className="cell medium-12">
                    <h3 className="text-white">Komende</h3>
                    <Meeting meetings={this.props.meetings.upcoming}/>
                </div>
                <div className="cell medium-12">
                    <h3 className="text-white">Geweest</h3>
                    <Meeting meetings={this.props.meetings.past} classes="secondary"/>
                </div>
            </div>
        );
    }
}

class Meeting extends React.Component {
    onItemClick(meeting) {
        this.checkUrl(meeting.url).then((validUrl) => {
            if (validUrl){
                ipcRenderer.send('get-meeting', meeting);
            } else {
                alert('Sorry, er zijn nog geen stukken beschikbaar voor deze vergadering');
            }
        });
    }

    checkUrl(url) {
        return new Promise((fulfill, reject) => {
            urlExists(url, (err, exists) => {
                if (err) reject(err);

                fulfill(exists);
            });
        });
    }

    render() {
        return (
            <div className="callout">
                {this.props.meetings.map((meeting, index) => {
                    let classes = meeting.url && meeting.url !== '#' ? this.props.classes || '' : 'warning';
                    return <a key={'meeting' + index} onClick={() => {
                        this.onItemClick(meeting);
                    }} className={'text-left button ' + (classes || '')} data-url={meeting.url} data-date={meeting.date} data-title={meeting.title.trim()}><FontAwesomeIcon icon={['far', 'calendar-alt']}/> {meeting.date} {meeting.title.trim()}</a>;
                })}
            </div>
        );
    }
}