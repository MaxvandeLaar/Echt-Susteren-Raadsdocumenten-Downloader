import React from 'react';
import 'foundation-sites/dist/js/foundation';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {ipcRenderer, shell} from 'electron';
import {Reveal, RevealCloseButton} from '../components/Reveal';
import {OffCanvas} from '../components/OffCanvas';

export default class SettingsBar extends React.Component {
    // componentDidMount() {
    //     $(document).foundation();
    // }
    render() {
        const activeDownloadsCount = this.props.downloads.active.length;
        return (
            <div className="grid-x">
                <div className="cell small-2">
                    <span className="fa-layers fa-fw icon-container" data-open="settings-canvas" id="preferences">
                        <a className="text-white">
                            <FontAwesomeIcon icon={['fas', 'cog']} style={{fontSize:'1.5em'}}/>
                        </a>
                    </span>
                </div>
                <div className="cell small-offset-6 small-2">
                    <span className="fa-layers fa-fw icon-container" id="refresh">
                        <a className="text-white float-right" onClick={() => {
                            this.props.click();
                        }}>
                            <FontAwesomeIcon className={this.props.loading ? 'fa-spin' : ''} icon="sync" style={{fontSize:'1.5em'}}/>
                        </a>
                    </span>
                </div>
                <a className="text-white" data-toggle="download-canvas">
                    <div className="cell small-2">
                        <span className="fa-layers fa-fw icon-container" id="download-icon">
                            <FontAwesomeIcon icon="arrow-alt-circle-down" style={{fontSize:'1.5em'}}/>
                            <span className={'fa-layers-counter fa-2x' + (!activeDownloadsCount || activeDownloadsCount === 0 ? ' hide' : '')} id="download-counter">{activeDownloadsCount}</span>
                        </span>
                    </div>
                </a>
            </div>
        );
    }
}
