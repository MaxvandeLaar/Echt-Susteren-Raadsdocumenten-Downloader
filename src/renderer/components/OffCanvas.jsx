import React from 'react';
import {createClassNames} from './util';

export class OffCanvas extends React.Component {
    componentDidMount() {
        $(this.offCanvas).foundation();

        $(document).click((e) => {
            if ($(e.target).hasClass('js-off-canvas-overlay')){
                if ($(this.offCanvas).hasClass('is-open') && $(this.offCanvas).attr('data-close-on-click')){
                    $(this.offCanvas).foundation('close');
                }
            }
        });
    }

    componentDidUpdate(oldValue, newValue) {
        Foundation.reInit($('[data-off-canvas]'));
        if ($('.js-off-canvas-overlay').hasClass('is-visible')){
            $('.js-off-canvas-overlay').removeClass('is-visible is-closeable');
        }
    }

    render() {
        const classes = createClassNames(this.props);
        return (
            <div {...this.props} className={`off-canvas ${classes}`} data-off-canvas="" ref={c => this.offCanvas = c}>
                {this.props.children || []}
            </div>
        );
    }
}

export class OffCanvasCloseButton extends React.Component {
    render() {
        return (
            <button className="close-button" aria-label="Close menu" type="button" data-close="">
                <span aria-hidden="true">&times;</span>
            </button>
        );
    }
}