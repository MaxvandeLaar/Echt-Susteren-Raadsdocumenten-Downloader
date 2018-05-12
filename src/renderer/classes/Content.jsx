import React from 'react';
import Subjects from './subjects';
import Agenda from './Agenda';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class Content extends React.Component {
    render() {
        return <div className="grid-y grid-margin-y">
            <div className="cell small-12">
                <Agenda agenda={this.props.agenda}/>
            </div>
            <div className="cell small-12">
                <Subjects agenda={this.props.agenda} subjects={this.props.subjects}/>
            </div>
        </div>;
    }
}
