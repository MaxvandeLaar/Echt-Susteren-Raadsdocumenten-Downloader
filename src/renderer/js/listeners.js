import {ipcRenderer, ipcMain} from 'electron';
import {renderSidebar} from './sideBar';
import {renderTopBar} from './topBar';
import {renderContent} from './content';
import {renderSettingsBar} from './settingsBar';

ipcRenderer.on('received-meetings', (event, args) => {
    renderSidebar(args);
    const data = ipcRenderer.sendSync('get-downloads');
    renderSettingsBar(false, data);
});

ipcRenderer.on('received-meeting', (event, args) => {
    renderTopBar(args);
    renderContent(args);
});

ipcRenderer.on('download-meeting-start', (event, args) => {
    document.body.style.cursor = 'wait';
    renderSettingsBar(false, args);
});

ipcRenderer.on('download-meeting-done', (event, args) => {
    document.body.style.cursor = 'default';
    renderSettingsBar(false, args);
});