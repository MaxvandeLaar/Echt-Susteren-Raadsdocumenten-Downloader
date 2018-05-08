import Content from '../classes/Content';
import React from 'react';
import ReactDOM from 'react-dom';

export function renderContent(data) {
    const meeting = data.meeting;
    const agenda = data.agenda;
    const subjects = data.subjects;
    ReactDOM.render(<Content title={meeting.title} agenda={agenda} subjects={subjects}/>, document.getElementById('content'));
}