'use strict';

import React, { Component } from 'react';
import * as actionCreators from '../../actions';
import { connect } from 'react-redux';
import { COLORS, POINT_TYPES } from '../../util/constants';
import { keyCodes } from '../../util/keys';

const parseStr = new Map();

const char = '█';

const charArr = new Array(10).fill(char).join('');

function format(number) {
    return (+number).toFixed(2);
}

class Path extends Component {
    constructor(props) {
        super(props);
        const { path } = props;
    }

    _handleKeyPress = e => {
        this.props.keyPressHandler(e.nativeEvent.keyCode);
    };

    render() {
        return (
            <div
                className="editable path"
                onKeyDown={this._handleKeyPress}
                suppressContentEditableWarning={true}
                contentEditable>
                P
            </div>
        );
    }
}

class Point extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.props.passRef(this.props.point._id, this.ref);

        this.state = {
            value: `${props.point.x} ${props.point.y}`,
        };
    }

    componentDidMount() {
        this.ref.current.focus();
    }

    _handleKeyPress = e => {
        const { path, point } = this.props;
        const { keyCode } = e.nativeEvent;
        if (keyCodes[keyCode] === 'delete') {
            if (this.state.value === '') {
                this.props.deleteHandler(this.props.point._id, this.ref);
                e.nativeEvent.preventDefault();
            }
        }
        if (keyCodes[keyCode] === 'enter') {
            this.props.addPoint({
                x: point.x,
                y: point.y,
                path: point.path,
                type: POINT_TYPES.STRAIGHT,
            });
            e.preventDefault();
        }
        this.props.keyPressHandler(e.nativeEvent.keyCode);
    };

    _handleBlur = e => {
        x = format(x);
        y = format(y);
    };

    _handleInput = e => {
        // const val = e.target.innerText;
        // const xy = val.split(',');
        // console.log(e.target, val);
        // console.log(parseStr.keys());
        // const result = parseStr.keys().some(key => key.test(e.target.value));
        // console.log(result);
        const exp = /^(\d*(?:[.]\d*)?) (\d*(?:[.]\d*)?)$/;
        let value = e.target.value;

        const matches = e.target.value.match(exp);
        if (matches) {
            let [, x, y] = matches;
            if (typeof x !== 'undefined' && typeof y !== 'undefined') {
                value = `${x} ${y}`;
                this.props.updatePoint(this.props.point._id, { x: +x, y: +y });
            }
        }
        value = value.replace(/ +/g, ' ');
        this.setState({ value });
    };

    render() {
        // const { x, y } = this.props.p
        const { value } = this.state;
        return (
            <div className="editable-container">
                <input
                    defaultValue={charArr}
                    className="editable-highlight"
                    tabIndex="-1"
                />
                <input
                    className="editable point"
                    onKeyDown={this._handleKeyPress}
                    onChange={this._handleInput}
                    ref={this.ref}
                    onFocus={() => this.props.focusHandler(this.props.index)}
                    value={value}
                />
            </div>
        );
    }
}

const PointWithRef = React.forwardRef((props, ref) => (
    <Point innerRef={ref} {...props} />
));

const PathConnected = connect(null, actionCreators)(Path);
const PointConnected = connect(mapStateToProps, actionCreators)(PointWithRef);

class PathEditor extends Component {
    constructor(props) {
        super(props);
        this.pointRefs = props.points.map(p => React.createRef());

        for (let i = 0; i < 3; i++) {
            this.props.addPoint({
                x: 0,
                y: 0,
                path: props.paths[0]._id,
                type: POINT_TYPES.STRAIGHT,
            });
        }

        this.state = {
            selectedIndex: 0,
            pointCount: props.points.length,
        };
    }

    // static getDerivedStateFromProps(props, state) {
    //     if (props.points.length > state.pointCount) {
    //         return { pointCount: props.points.length };kkk
    //     }
    //     return null;
    // }

    _handleFocus = selectedIndex => {
        this.setState({ selectedIndex });
    };

    _onUpdate = e => {
        // this.props.sendInstructions(e.target.value);
    };

    _passRef = (id, ref) => {
        this.pointRefs.push(ref);
    };

    _handleDelete = (id, ref) => {
        const index = this.state.selectedIndex - 1;
        this.props.deletePoint(id);
        this.pointRefs = this.pointRefs.filter(r => r !== ref);
        this._focusIndex(index);

        this.setState({
            selectedIndex: index,
        });
    };

    _focusIndex = index => {
        if (index > -1) {
            this.pointRefs[index].current.focus();
        }
    };

    _handleKeyPress = keyCode => {
        const key = keyCodes[keyCode];
        if (['up', 'down'].includes(key)) {
            const { points } = this.props;
            const { selectedIndex } = this.state;
            let index;
            if (keyCode === 40) {
                index = Math.min(points.length - 1, selectedIndex + 1);
            } else {
                console.log('Selectd Index', selectedIndex);
                index = Math.max(0, selectedIndex - 1);
            }
            this.setState({ selectedIndex: index });
            this._focusIndex(index);
            // const selected = this.pointRefs;
            // this.setState(
            //     {
            //         focused: Math.min(
            //             this.pointRefs.length - 1,
            //             this.state.focused + 1
            //         ),
            //     },
            //     () => {
            //         this.pointRefs[this.state.focused].focus();
            //     }
            // );
        }
    };

    render() {
        const { paths, points } = this.props;
        return (
            <div className="paths">
                {points.map((point, j) => (
                    <PointConnected
                        key={point._id}
                        passRef={this._passRef}
                        point={point}
                        index={j}
                        keyPressHandler={this._handleKeyPress}
                        focusHandler={this._handleFocus}
                        deleteHandler={this._handleDelete}
                    />
                ))}
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return { paths: state.paths.all, points: state.points.all };
}

export default connect(mapStateToProps, actionCreators)(PathEditor);
