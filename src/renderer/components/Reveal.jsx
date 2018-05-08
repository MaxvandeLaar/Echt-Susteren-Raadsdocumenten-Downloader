import React from 'react';
import {createClassNames} from './util';

export class Reveal extends React.Component {
    componentDidMount() {
        $(this.reveal).foundation();
    }

    componentDidUpdate(oldValue, newValue) {
        Foundation.reInit($('[data-reveal]'));
    }

    render() {
        const classes = createClassNames(this.props);
        return (
            <div {...this.props} className={`reveal ${classes}`} data-reveal ref={c => this.reveal = c}>
                {this.props.children || []}
            </div>
        );
    }
}

export class RevealCloseButton extends React.Component {
    render() {
        const classes = createClassNames(this.props);
        return (
            <button className={`close-button ${classes}`} data-close="" aria-label="Close" type="button">
                <span aria-hidden="true">&times;</span>
            </button>
        );
    }
}