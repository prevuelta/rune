'use strict';

import React, { Component } from 'react';
// const runes = Data.getRunes(state);
import * as actionCreators from '../../actions';
import { connect } from 'react-redux';
import { COLORS, POINT_TYPES } from '../../util/constants';
import { keyCodes } from '../../util/keys';

const char = '█';
const charArr = new Array(10).fill(char).join('');

// function format(number) {
//     return (+number).toFixed(2);
// }

// Sample instruction:
const sampleInstruction = `
   0,0 w,0 w,h 0,h +.5w,-.5w a(0,0 w)
`;

class Path extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            value: props.path,
        };
    }

    componentDidMount() {
        this.ref.current.focus();
    }

    _handleKeyPress = e => {
        const { path, index } = this.props;
        const { keyCode } = e.nativeEvent;
        if (keyCodes[keyCode] === 'delete') {
            if (this.state.value === '') {
                // this.props.deleteHandler(this.props.point._id, this.ref);
                e.nativeEvent.preventDefault();
            }
        }
        if (keyCodes[keyCode] === 'enter') {
            this.props.addPath();
            e.preventDefault();
        }
        this.props.keyPressHandler(e.nativeEvent.keyCode);
    };

    _handleBlur = e => {};

    _handleInput = e => {
        // const val = e.target.innerText;
        // const xy = val.split(',');
        // console.log(e.target, val);
        // console.log(parseStr.keys());
        // const result = parseStr.keys().some(key => key.test(e.target.value));
        // console.log(result);
        // const exp = /^(\d*(?:[.]\d*)?) (\d*(?:[.]\d*)?)$/;
        let value = e.target.value;

        // const matches = e.target.value.match(exp);
        // if (matches) {
        // let [, x, y] = matches;
        // if (typeof x !== 'undefined' && typeof y !== 'undefined') {
        // value = `${x} ${y}`;
        // this.props.updatePoint(this.props.point._id, { x: +x, y: +y });
        // }
        // }
        // value = value.replace(/ +/g, ' ');
        this.setState({ value }, () => {
            this.props.updatePath(this.props.index, value);
        });
    };

    render() {
        // const { x, y } = this.props.p
        // <input
        //     defaultValue={charArr}
        // className="editable-highlight"
        // tabIndex="-1">
        const { value } = this.state;
        return (
            <div className="editable-container">
                <textarea
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
        this.pathRefs = props.paths.map(p => React.createRef());

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
            pointCount: props.paths.length,
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
            const { paths } = this.props;
            const { selectedIndex } = this.state;
            let index;
            if (keyCode === 40) {
                index = Math.min(paths.length - 1, selectedIndex + 1);
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
        const { paths } = this.props;
        return (
            <div className="paths">
                {paths.map((path, j) => (
                    <PathConnected
                        key={point._id}
                        passRef={this._passRef}
                        path={path}
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
    return { paths: state.paths.all };
}

export default connect(mapStateToProps, actionCreators)(PathEditor);
