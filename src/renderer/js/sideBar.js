import SideBar from '../classes/SideBar';
import {renderSettingsBar} from './settingsBar';
import React from 'react';
import ReactDOM from 'react-dom';
import {ipcRenderer} from "electron";
import OutsideContainer from '../classes/OutsideContainer';

export function renderSidebar (meetings) {
    // console.log('meetings', meetings);
    ReactDOM.render(<SideBar meetings={meetings}/>, document.getElementById('side-bar'));
    ReactDOM.render(<OutsideContainer downloads={{active:[], finished:[]}}/>, document.getElementById('off-canvas-container'));

}

export function loadMeetings(){
    ipcRenderer.send('get-meetings');
    renderSidebar({past:[], upcoming:[]});
    const data = ipcRenderer.sendSync('get-downloads');
    renderSettingsBar(true, data);
}