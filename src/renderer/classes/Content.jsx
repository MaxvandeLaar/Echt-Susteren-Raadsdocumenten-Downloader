import React from 'react';
import Subjects from './subjects';
import Agenda from './Agenda';

export default class Content extends React.Component {
    render() {
        return (
            <div className="grid-y grid-margin-y">
                <div className="cell">
                    <Agenda agenda={this.props.agenda}/>
                </div>
                <div className="cell">
                    <Subjects agenda={this.props.agenda} subjects={this.props.subjects}/>
                </div>
            </div>);
    }
}
