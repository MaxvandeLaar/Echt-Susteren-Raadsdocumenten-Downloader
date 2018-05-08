import React from 'react';
import 'foundation-sites/dist/js/foundation';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {ipcRenderer, shell} from 'electron';

export default class SettingsBar extends React.Component {
    componentDidMount() {
        $(document).foundation();
    }
    render() {
        const activeDownloadsCount = this.props.downloads.active.length;
        return (
            <div className="grid-x">
                <div className="cell small-2">
                    <span className="fa-layers fa-fw  icon-container" id="preferences">
                        <a className="text-white " onClick={() => {
                            selectFolder();
                        }}>
                            <FontAwesomeIcon icon={['fas', 'cog']} style={{fontSize:'1.5em'}}/>
                        </a>
                    </span>
                </div>
                <div className="cell small-2">
                    <span className="fa-layers fa-fw icon-container" data-open="download-list" id="preferences">
                        <a className="text-white">
                            <FontAwesomeIcon icon={['fas', 'info-circle']} style={{fontSize:'1.5em'}}/>
                        </a>
                    </span>
                </div>
                <div className="cell small-offset-4 small-2">
                    <span className="fa-layers fa-fw icon-container" id="refresh">
                        <a className="text-white float-right" onClick={() => {
                            this.props.click();
                        }}>
                            <FontAwesomeIcon className={this.props.loading ? 'fa-spin' : ''} icon="sync" style={{fontSize:'1.5em'}}/>
                        </a>
                    </span>
                </div>
                <a className="text-white" data-open="download-list">
                    <div className="cell small-2">
                        <span className="fa-layers fa-fw icon-container" id="download-icon">
                            <FontAwesomeIcon icon="arrow-alt-circle-down" style={{fontSize:'1.5em'}}/>
                            <span className={'fa-layers-counter fa-2x' + (!activeDownloadsCount || activeDownloadsCount === 0 ? ' hide' : '')} id="download-counter">{activeDownloadsCount}</span>
                        </span>
                    </div>
                </a>
                <div className="reveal" id="download-list" data-reveal>
                    <h4>{this.props.downloads.active.length > 0?'Actief':''}</h4>
                    <Downloads list={this.props.downloads.active}/>
                    <h4>Gedownload</h4>
                    <Downloads list={this.props.downloads.finished}/>
                    <button className="close-button" data-close="" aria-label="Sluit" type="button">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
        );
    }
}

class Downloads extends React.Component {
    render(){
        return <div className="grid-y grid-padding-y">
            {this.props.list.map((item, index) => {
                return <div className="cell download-list-cell" key={'downloadedMeeting' + index}>
                    <div className="grid-x">
                        <div className="cell small-1">
                            <a onClick={() => {
                                openInFileExplorer(item.folder);
                            }}><FontAwesomeIcon icon="search"/></a>
                        </div>
                        <div className="cell small-3">
                            {item.meeting.date}
                        </div>
                        <div className="cell auto">
                            {item.meeting.title}
                        </div>

                    </div>
                </div>;
            })}
        </div>
    }
}

function openInFileExplorer(folder) {
    shell.showItemInFolder(folder);
}

function selectFolder() {
    console.log('select Folder');
    ipcRenderer.send('open-dialog');
}
