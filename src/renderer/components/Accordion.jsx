import React from 'react';
import {createClassNames} from './util';

export class Accordion extends React.Component {
    componentDidMount() {
        $(this.accordion).foundation();
    }

    componentDidUpdate(oldValue, newValue) {
        Foundation.reInit($('[data-accordion]'));
    }

    render() {
        const classes = createClassNames(this.props);
        return (
            <ul {...this.props} className={`accordion ${classes}`} data-accordion ref={c => this.accordion = c}>
                {this.props.children || []}
            </ul>
        );
    }
}

export class AccordionItem extends React.Component {
    render() {
        const classes = createClassNames(this.props);
        return (
            <li {...this.props} className={`accordion-item ${classes}`} data-accordion-item>
                {this.props.children || []}
            </li>
        );
    }
}

export class AccordionContent extends React.Component {
    render() {
        const classes = createClassNames(this.props);
        return (
            <div {...this.props} className={`accordion-content ${classes}`} data-tab-content>
                {this.props.children || []}
            </div>
        );
    }
}

export class AccordionTitle extends React.Component {
    render() {
        const classes = createClassNames(this.props);
        return (
            <a {...this.props} href={"#"} className={`accordion-title ${classes}`}>{this.props.children || []}</a>
        );
    }
}