import React from 'react';
import ReactDOM from 'react-dom';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {OffCanvas, OffCanvasCloseButton} from '../components/OffCanvas';
import {ipcRenderer, remote, shell} from 'electron';
import jetpack from 'fs-jetpack';

const app = remote.app;
const appDir = jetpack.cwd(app.getAppPath());

const manifest = appDir.read('package.json', 'json');

export default class OutsideContainer extends React.Component {
    componentDidMount(){
        ReactDOM.render(<DownloadList downloads={this.props.downloads}/>, document.getElementById('downloads-list'));
        ReactDOM.render(<FolderSettings/>, document.getElementById('folder-settings'));
    }
    render() {
        return (
            <div>
                <OffCanvas id={'download-canvas'} className="position-top" data-close-on-click>
                    <div className="grid-container">
                        <div className={'grid-x grid-margin-x'}>
                            <div className={'cell medium-12'} id={"downloads-list"}></div>
                        </div>
                    </div>
                    <OffCanvasCloseButton/>
                </OffCanvas>

                <OffCanvas id={'settings-canvas'} className="position-left" data-close-on-click>
                    <div className={"grid-y grid-margin-y"}>
                        <div className={"cell medium-12"}>
                            <div className={"callout"}>
                                <h4>Instellingen</h4>
                                <lead>Selecteer de downloadmap</lead>
                                <div id={"folder-settings"}></div>
                            </div>
                        </div>
                        <div className={"cell medium-12"}>
                            <div className={"callout"}>
                                <h4>Gemeente</h4>
                                <a href={"https://echt-susteren.nl/"} target={"_blank"} className={"js-external-link"}><FontAwesomeIcon icon={"globe"}/> Echt-Susteren</a><br/>
                                <a href={"https://echt-susteren.raadsinformatie.nl/"} className={"js-external-link"}><FontAwesomeIcon icon={"globe"}/> Raadsinformatie</a>
                            </div>
                        </div>
                        <div className={"cell medium-12"}>
                            <div className={"callout"}>
                                <h4>Informatie</h4>
                                <a href={"https://github.com/MaxvandeLaar/Echt-Susteren-Raadsdocumenten-Downloader"} className={"js-external-link"}><FontAwesomeIcon icon={["fab", "github"]}/> Github</a><br/>
                                <a href={"https://www.maxvandelaar.com"} className={"js-external-link"}><FontAwesomeIcon icon={"globe"}/> www.maxvandelaar.com</a><br/>
                                <lead><FontAwesomeIcon icon={"copyright"}/> 2018, <author>Max van de Laar</author></lead>
                            </div>
                        </div>
                    </div>
                    <OffCanvasCloseButton/>
                </OffCanvas>
            </div>
        );
    }
}

export class FolderSettings extends React.Component {
    render(){
        const folder = ipcRenderer.sendSync('get-folder');
        return (
            <div className="input-group">
                <input type={"text"} className={"input-group-field"} id={"download-folder"} readOnly={"readonly"} disabled={"disabled"} value={folder}/>
                <div className="input-group-button">
                    <button className="button" onClick={() => {selectFolder()}}>
                        <FontAwesomeIcon icon={"folder-open"}/>
                    </button>
                </div>
            </div>
        );
    }
}

export class DownloadList extends React.Component {
    render() {
        return (<div>
            <h4>Downloads</h4>
            <ActiveDownloads list={this.props.downloads.active}/>
            <Downloads list={this.props.downloads.finished}/>
        </div>
        );
    }
}

class ActiveDownloads extends React.Component {
    render() {
        return (
            <div className={'grid-y'}>
                {this.props.list.map((item, index) => {
                    return <div className={'cell small-12'} key={"active-download-"+index}>
                        <div className={'grid-x'}>
                            <div className={'cell small-1'}>

                                <a onClick={() => {
                                    openInFileExplorer(item.folder);
                                }}>
                                    <span className="fa-layers fa-fw">
                                    <FontAwesomeIcon icon="folder" style={{fontSize:'1.5em'}}/>
                                    <FontAwesomeIcon icon="spinner" spin color={'white'} style={{fontSize:'1em'}}/>
                                </span>
                                </a>
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
        );
    }
}

class Downloads extends React.Component {
    render() {
        return (
            <div className={'grid-y'}>
                {this.props.list.map((item, index) => {
                    return <div className={'cell small-12'} key={"downloads-"+index}>
                        <div className={'grid-x'}>
                            <div className={'cell small-1'}>

                                <a onClick={() => {
                                    openInFileExplorer(item.folder);
                                }}>
                                    <FontAwesomeIcon icon="folder" style={{fontSize:'1.5em'}}/>

                                </a>
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
        );
    }
}

function openInFileExplorer(folder) {
    shell.showItemInFolder(folder);
}

function selectFolder() {
    ipcRenderer.send('open-dialog');
}