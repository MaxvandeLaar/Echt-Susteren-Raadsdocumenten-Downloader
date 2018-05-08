import SideBar from '../classes/SideBar';
import {renderSettingsBar} from './settingsBar';
import React from 'react';
import ReactDOM from 'react-dom';
import {ipcRenderer} from "electron";

export function renderSidebar (meetings) {
    console.log('meetings', meetings);
    ReactDOM.render(<SideBar meetings={meetings}/>, document.getElementById('side-bar'));
}

export function loadMeetings(){
    ipcRenderer.send('get-meetings');
    renderSidebar({past:[], upcoming:[]});
    const data = ipcRenderer.sendSync('get-downloads');
    renderSettingsBar(true, data);
}