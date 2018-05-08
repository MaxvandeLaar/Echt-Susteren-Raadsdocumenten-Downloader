import SettingsBar from '../classes/SettingsBar';
import {loadMeetings} from './sideBar';
import React from 'react';
import ReactDOM from 'react-dom';

export function renderSettingsBar (loading, downloads) {
    ReactDOM.render(<SettingsBar loading={loading} click={loadMeetings} downloads={downloads}/>, document.getElementById('settings-bar'));
}

