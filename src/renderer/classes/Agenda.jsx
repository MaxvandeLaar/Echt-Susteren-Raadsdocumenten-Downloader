import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class Agenda extends React.Component {
    render() {
        const agenda = this.props.agenda;
        return (
            <div className="grid-x">
                <div className="cell medium-12">
                    {agenda.title}
                </div>
                <div className="cell medium-6">
                    <div className="grid-y">
                        <div className="cell medium-12">
                            <small><FontAwesomeIcon icon="map-marker-alt"/> {agenda.location}</small>
                        </div>
                        <div className="cell medium-12">
                            <small><FontAwesomeIcon icon="calendar-alt"/> {agenda.date}</small>
                        </div>
                        <div className="cell medium-12">
                            <small><FontAwesomeIcon icon={['far', 'clock']}/> {agenda.startTime}</small>
                        </div>
                    </div>
                </div>
                <div className="cell medium-6">
                    <div className="grid-y">
                        <div className="cell medium-12">
                            <small><FontAwesomeIcon icon={['fas', 'user-circle']}/> {agenda.chairmen}</small>
                        </div>
                        <div className="cell medium-12">
                            <small><FontAwesomeIcon icon={['far', 'edit']}/> {agenda.clerk}</small>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

