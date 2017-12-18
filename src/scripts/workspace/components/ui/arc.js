import React, { Component } from 'react';
import { Point, Group } from '../.';
import { Position } from '../../workspaceUtil';

class Arc extends Component {
    constructor(props) {
        super(props);
        this.state = {
            radius: 100,
            length: Math.PI / 4,
            startPoint: {
                x: 0.5,
                y: 0.5,
            },
            endPoint: {
                x: 1,
                y: 1,
            },
            center: {
                x: 0.75,
                y: 0.75,
            },
        };
    }

    _onMouseDown(e) {
        console.log('Mouse down', e);
    }

    render() {
        const { x, y } = this.state.center;
        const { radius } = this.state;
        // const { x: mX = 0, y: mY = 0 } = this.props.mousePosition;
        const startPoint = Position.getAbsolute(this.state.startPoint);
        const endPoint = Position.getAbsolute(this.state.endPoint);
        const drawString = `M ${startPoint.x} ${
            startPoint.y
        } a ${radius} ${radius} 0 0 0 ${radius} ${radius}`;
        return (
            <Group>
                <Point
                    {...{ x: 0.5, y: 0.5 }}
                    onMouseDown={e => this._onMouseDown(e)}
                />
                <path
                    fill="none"
                    stroke="red"
                    d={drawString}
                    pointerEvents="none"
                />
            </Group>
        );
    }
}

export default Arc;
