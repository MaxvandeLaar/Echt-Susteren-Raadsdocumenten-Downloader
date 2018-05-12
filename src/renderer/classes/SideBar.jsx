import React from 'react';
import MeetingsList from './Meetings';
import 'foundation-sites/dist/js/foundation';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import {ipcRenderer} from 'electron';

export default class SideBar extends React.Component {
    componentDidMount() {
        $(document).foundation();
    }

    render() {
        return (
                <div>
                    <MeetingsList meetings={this.props.meetings}/>
                </div>
            );
    }
}

function selectFolder() {
    ipcRenderer.send('open-dialog');
}
