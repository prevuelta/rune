import React, {Component} from 'react';
import {Point, Group} from '../.';
import {Position} from '../../workspaceUtil';

class Arc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: 100,
            length: Math.PI / 4,
            center: {
                x: 0.5,
                y: 0.5,
            },
        };
    }

    _onMouseDown(e) {
        console.log('Mouse down', e);
    }

    render() {
        const {x, y} = this.state.center;
        const {radius} = this.state;
        const actualCoords = Position.getAbsolute(this.state.center);
        console.log(actualCoords);
        const drawString = `M ${actualCoords.x} ${
            actualCoords.y
        } A ${radius} ${radius} 0 0 0 ${radius} ${radius}`;
        return (
            <Group>
                <Point
                    {...{x: 0.5, y: 0.5}}
                    onMouseDown={e => this._onMouseDown(e)}
                />
                <path fill="none" stroke="red" d={drawString} />
            </Group>
        );
    }
}

export default Arc;
