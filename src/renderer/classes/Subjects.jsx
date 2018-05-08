import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import 'foundation-sites/dist/js/foundation';
import {Accordion, AccordionTitle, AccordionItem, AccordionContent} from '../components/Accordion';

export default class Subjects extends React.Component {
    render() {
        return (
            <div className="grid-x">
                <div className="cell medium-12">
                    <Accordion data-allow-all-closed="true">
                        <AccordionItem>
                            <AccordionTitle>Agenda</AccordionTitle>
                            <AccordionContent>
                                <DocumentList documents={this.props.agenda.attachments}/>
                            </AccordionContent>
                        </AccordionItem>
                        {this.props.subjects.map((subject, index) => {
                            return <AccordionItem key={`subject-${index}`}>
                                <AccordionTitle>{subject.title}</AccordionTitle>
                                <AccordionContent>
                                    <DocumentList documents={subject.documents}/>
                                </AccordionContent>
                            </AccordionItem>;
                        })}
                    </Accordion>
                </div>
            </div>
        );
    }
}

class DocumentList extends React.Component {
    render() {
        return (
            <ul>
                {this.props.documents.map((document, index) => {
                    return <li key={`document-${index}`}><a href={document.url}>
                        <small>{document.title}</small>
                    </a></li>;
                })}
            </ul>
        );
    }
}