'use strict';

import React from 'react';
import Paper from '../../canvas/paper';
import Grid from './grid';
import Group from './group';

class Tablet extends React.Component {

    constructor (props) {
        super(props);
    }

    render () {
        console.log("Rendering")
        let line = new Paper.paper.Path.Rectangle([20.5, Paper.view.center.y - 1000], 1, 2000);
        line.fillColor = 'black';
        let rec = new Paper.paper.Path.Rectangle(0,0, 100, 100);
        rec.fillColor = 'black';

        let grid = <Grid />

        return (
            <Group>
                <Grid data={this.props.data.options.grid} />
            </Group>
        );
    }
}

export default Tablet;