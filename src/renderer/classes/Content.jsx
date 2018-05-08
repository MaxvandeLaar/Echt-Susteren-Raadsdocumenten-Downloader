import React from 'react';
import Subjects from './subjects';
import Agenda from './Agenda';
import 'foundation-sites/dist/js/foundation';

export default class Content extends React.Component {
    componentDidMount() {
        $(document).foundation();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        $(document).foundation();
    }

    render() {
        console.log(this.props.agenda);
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
