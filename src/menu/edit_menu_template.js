import {openDialog} from '../helpers/fileSystem';

export const editMenuTemplate = {
  label: 'File',
  submenu: [
    {
      label: 'Instellingen', accelerator: 'CmdOrCtrl+,', click: (item, currentWindow) => {
          openDialog();
      }
    },
    {label: 'Undo', accelerator: 'CmdOrCtrl+Z', selector: 'undo:'},
    {label: 'Redo', accelerator: 'Shift+CmdOrCtrl+Z', selector: 'redo:'},
    {type: 'separator'},
    {label: 'Cut', accelerator: 'CmdOrCtrl+X', selector: 'cut:'},
    {label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:'},
    {label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:'},
    {label: 'Select All', accelerator: 'CmdOrCtrl+A', selector: 'selectAll:'},
    {
      label: 'About', accelerator: 'CmdOrCtrl+1', click: (item, currentWindow) => {
        currentWindow.webContents.send('test', item);
      }
    }
  ]
};
