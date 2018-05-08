import TopBar from '../classes/TopBar';
import React from 'react';
import ReactDOM from 'react-dom';
import {ipcRenderer} from 'electron';
import {renderSidebar} from './sideBar';

export function renderTopBar(data) {
    const meeting = data.meeting;
    const agenda = data.agenda;
    const subjects = data.subjects;
    ReactDOM.render(<TopBar click={downloadAll} agenda={agenda} subjects={subjects} meeting={meeting}/>, document.getElementById('top-bar'));
}

function downloadAll(meeting, agenda, subjects) {
    const data = {meeting: meeting, agenda: agenda, subjects: subjects};
    ipcRenderer.send('download-meeting', data);
}