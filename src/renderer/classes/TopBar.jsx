import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class TopBar extends React.Component {
    render() {
        return (
            <div className="grid-x">
                <div className="cell small-3 text-center">
                    <h5 className="text-white">{this.props.meeting.date}</h5>
                </div>
                <div className="cell small-8 text-center">
                    <h5 className="text-white">{this.props.meeting.title}</h5>
                </div>
                <div className="cell small-1">
                    <a className="text-white" id="download-meeting" onClick={() => {this.props.click(this.props.meeting, this.props.agenda, this.props.subjects)}}><FontAwesomeIcon icon="download"/></a>
                </div>
            </div>
        );
    }
}