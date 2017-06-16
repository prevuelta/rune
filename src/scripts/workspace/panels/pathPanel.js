'use strict';

import * as actionCreators from '../../actions/actions';
import React from 'react';
import { connect } from 'react-redux';

// Components:
import Switch from '../components/switch';
import Sheet from '../components/sheet';
import Button from '../components/button';
import ButtonGroup from '../components/buttonGroup';
import Cross from '../icons/cross';
import X from '../icons/x';
import Stack from '../icons/stack';
import PointIcon from '../icons/point';
import PathIcon from '../icons/path';

class PathPanel extends React.Component {

    constructor (props) {
        super(props);

    }

    render () {
        return (
            <div>
                <Sheet
                    name="Paths">
                    <Button
                        onClick={() => this.props.addPath()}>
                        <Cross />
                    </Button>
                </Sheet>
                {
                    this.props.paths.map((path, i) => {
                        return <Path path={path} key={i}></Path>
                    })
                }
            </div>
        )
    }
}

function Point (props) {
    return (
        <p>Point</p>
    );
//         <Sheet
//             active={this.props.point.isSelected}
//             onClick={this.selectPoint.bind(this, this.props.point)}>
//             <Button>
//                 <PointIcon />
//             </Button>
//             <ButtonGroup>
//                 <Button
//                     handler={this.deletePoint.bind(this, this.props.point)}>
//                     <X/>
//                 </Button>
//             </ButtonGroup>
//         </Sheet>

}

function Path (props) {
    return (
        <Sheet name="Path" >
        </Sheet>
    );
}

// let Path = React.createClass({
//     getInitialState: function () {
//         return {path: this.props.path};
//     },
//     changeHandler: function () {
//         this.state.path.isClosed = !this.state.path.isClosed;
//         this.setState({path: this.state.path, collapsed: false});
//         Events.redrawView.dispatch();
//     },
//     componentWillReceiveProps : function (nextProps) {
//         this.setState({path :nextProps.path });
//         return nextProps;
//     },
//     selectPath : function (path) {
//         console.log("should not be firung");
//         if (!this.state.path.isActive) {
//             Events.selectPath.dispatch(path);
//         }
//     },
//     removePath: function (path) {
//         Events.deletePath.dispatch(path);
//     },
//     addSubPath: (path) => {
//         console.log("should be");
//         Events.addSubPath.dispatch(path);
//     },
//     toggleCollapsed: function () {
//         this.setState({collapsed: !this.state.collapsed});
//     },
//     render: function () {
//         return (
//             <div className="path">
//                 <Sheet
//                     active={this.state.path.isActive}>
//                     <Button
//                         handler={this.selectPath.bind(this, this.state.path)}>
//                         <PathIcon/>
//                     </Button>
//                     <ButtonGroup>
//                         <Button
//                             handler={this.addSubPath.bind(this, this.state.path)}>
//                             <Cross />
//                         </Button>
//                         <Switch onToggle={this.changeHandler}>
//                            <svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg"><path d="M120 0h80v200H0V0h80v40H40v120h120V40h-40" fill-opacity=".6" stroke-miterlimit="10" font-family="sans-serif" font-size="12"/></svg>
//                         </Switch>
//                         <Button
//                             handler={this.toggleCollapsed}>
//                             <Stack/>
//                         </Button>
//                         <Button
//                             handler={this.removePath.bind(this, this.state.path)}>
//                             <X/>
//                         </Button>
//                     </ButtonGroup>
//                 </Sheet>
//                 { !this.state.collapsed ?
//                     this.state.path.points.map((p) => <Point point={p}></Point> )
//                     : null
//                 }
//                 {
//                     this.state.path.hasChildren ?
//                         this.state.path.children.map((p) => {
//                             return <Path path={p}></Path>;
//                         })
//                     : null
//                 }
//             </div>
//         );
//     }
// });

function mapStateToProps (state) {
    return {
        paths: state.paths.all
    };
}

export default connect(mapStateToProps, actionCreators)(PathPanel);
