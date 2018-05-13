import SideBar from '../classes/SideBar';
import {renderSettingsBar} from './settingsBar';
import React from 'react';
import ReactDOM from 'react-dom';
import {ipcRenderer} from "electron";
import OutsideContainer from '../classes/OutsideContainer';


export function renderSidebar (meetings) {
    ReactDOM.render(<SideBar meetings={meetings}/>, document.getElementById('side-bar'));
    ReactDOM.render(<OutsideContainer downloads={{active:[], finished:[]}}/>, document.getElementById('off-canvas-container'));

}

export function loadMeetings(){
    ipcRenderer.send('get-meetings');
    const data = ipcRenderer.sendSync('get-downloads');
    renderSidebar({past:[], upcoming:[]});
    renderSettingsBar(true, data);
}