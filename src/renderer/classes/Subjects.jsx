import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default class Subjects extends React.Component {
    render() {
        return (
            <div className="grid-x">
                <div className="cell medium-12">
                    <List agenda={this.props.agenda} subjects={this.props.subjects}/>
                </div>
            </div>
        );
    }
}

class List extends React.Component {
    render() {
        return (
            <ul className="accordion" data-accordion data-allow-all-closed="true">
                <li key="agenda" className="accordion-item" data-accordion-item>
                    <a href="#" className="accordion-title">Agenda</a>
                    <DocumentList documents={this.props.agenda.attachments}/>
                </li>
                {this.props.subjects.map((subject, index) => {
                    return <li key={'subject' + index} className="accordion-item" data-accordion-item>
                        <a href="#" className="accordion-title">{subject.title}</a>
                        <DocumentList documents={subject.documents}/>
                    </li>;
                })}
            </ul>
        );
    }
}

class DocumentList extends React.Component {
    render() {
        return (
            <div className="accordion-content" data-tab-content>
                <ul>
                    {this.props.documents.map((document, index) => {
                        return <li key={'document' + index}><a href={document.url}>
                            <small>{document.title}</small>
                        </a></li>;
                    })}
                </ul>
            </div>
        );
    }
}

class Tabs extends React.Component {
    render() {
        return (
            <ul className="tabs" data-tabs id="example-tabs">
                <li className="tabs-title is-active"><a href="#panel1" aria-selected="true">Tab 1</a></li>
                <li className="tabs-title"><a data-tabs-target="panel2" href="#panel2">Tab 2</a></li>
            </ul>
        );
    }
}

class Panels extends React.Component {
    render() {
        return (
            <div className="tabs-content" data-tabs-content="example-tabs">
                <div className="tabs-panel is-active" id="panel1">
                    <p>Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.</p>
                </div>
                <div className="tabs-panel" id="panel2">
                    <p>Suspendisse dictum feugiat nisl ut dapibus. Vivamus hendrerit arcu sed erat molestie vehicula. Ut in nulla enim. Phasellus molestie magna non est bibendum non venenatis nisl tempor. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.</p>
                </div>
            </div>
        );
    }
}