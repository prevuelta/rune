'use strict';

'use strict';

import React from 'react';

class Sheet extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            active: props.active
        };
    }

    componentWillReceiveProps (nextProps) {
        this.setState({active: nextProps.active});
    }

    render () {
        let classNames = this.state.active ? 'sheet active' : 'sheet';
        return (
            <div
                className={classNames}
                onClick={this.props.onClick}>
                {this.props.children}
            </div>
        );
    }
}

export default Sheet;
