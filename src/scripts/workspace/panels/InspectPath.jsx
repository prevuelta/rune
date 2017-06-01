'use strict';

let React = require('react');
let Events = require('../../global/Events');

// Components:
let Switch = require('../../components/Switch.jsx');
let Sheet = require('../../components/Sheet.jsx');
let Button = require('../../components/Button.jsx');
let ButtonGroup = require('../../components/ButtonGroup.jsx');
let Cross = require('../../icons/Cross.jsx');
let X = require('../../icons/X.jsx');
let Stack = require('../../icons/Stack.jsx');
let PointIcon = require('../../icons/Point.jsx');
let PathIcon = require('../../icons/Path.jsx');


let Point = React.createClass({
    selectPoint: (point) => {
        Events.selectPoint.dispatch(point);
    },
    deletePoint: (point) => {
        Events.deletePoint.dispatch(point);
    },
    // componentWillReceiveProps : function (nextProps) {
    //     this.setState({point: nextProps.point});
    // },
    render: function () {
        return (
            <Sheet
                active={this.props.point.isSelected}
                onClick={this.selectPoint.bind(this, this.props.point)}>
                <Button>
                    <PointIcon />
                </Button>
                <ButtonGroup>
                    <Button
                        handler={this.deletePoint.bind(this, this.props.point)}>
                        <X/>
                    </Button>
                </ButtonGroup>
            </Sheet>
        );
    }
})

let Path = React.createClass({
    getInitialState: function () {
        return {path: this.props.path};
    },
    changeHandler: function () {
        this.state.path.isClosed = !this.state.path.isClosed;
        this.setState({path: this.state.path, collapsed: false});
        Events.redrawView.dispatch();
    },
    componentWillReceiveProps : function (nextProps) {
        this.setState({path :nextProps.path });
        return nextProps;
    },
    selectPath : function (path) {
        console.log("should not be firung");
        if (!this.state.path.isActive) {
            Events.selectPath.dispatch(path);
        }
    },
    removePath: function (path) {
        Events.deletePath.dispatch(path);
    },
    addSubPath: (path) => {
        console.log("should be");
        Events.addSubPath.dispatch(path);
    },
    toggleCollapsed: function () {
        this.setState({collapsed: !this.state.collapsed});
    },
    render: function () {
        return (
            <div className="path">
                <Sheet
                    active={this.state.path.isActive}>
                    <Button
                        handler={this.selectPath.bind(this, this.state.path)}>
                        <PathIcon/>
                    </Button>
                    <ButtonGroup>
                        <Button
                            handler={this.addSubPath.bind(this, this.state.path)}>
                            <Cross />
                        </Button>
                        <Switch onToggle={this.changeHandler}>
                           <svg viewBox="0 0 200 200" width="200" height="200" xmlns="http://www.w3.org/2000/svg"><path d="M120 0h80v200H0V0h80v40H40v120h120V40h-40" fill-opacity=".6" stroke-miterlimit="10" font-family="sans-serif" font-size="12"/></svg>
                        </Switch>
                        <Button
                            handler={this.toggleCollapsed}>
                            <Stack/>
                        </Button>
                        <Button
                            handler={this.removePath.bind(this, this.state.path)}>
                            <X/>
                        </Button>
                    </ButtonGroup>
                </Sheet>
                { !this.state.collapsed ?
                    this.state.path.points.map((p) => <Point point={p}></Point> )
                    : null
                }
                {
                    this.state.path.hasChildren ?
                        this.state.path.children.map((p) => {
                            return <Path path={p}></Path>;
                        })
                    : null
                }
            </div>
        );
    }
});

module.exports = {
    title: 'Inspect path',
    collapsed: false,
    panel: React.createClass({
        getInitialState: function () {
            return {paths: this.props.data.activeRune.paths};
        },
        componentWillReceiveProps: function(nextProps) {
            this.setState({
                paths: nextProps.data.activeRune.paths
            });
        },
        addPath: () => {
            Events.addPath.dispatch();
        },
        render: function() {
            let _this = this;
            return (
                <div>
                    <Sheet
                        name="Paths">
                        <Button
                            handler={this.addPath.bind(this)}>
                            <Cross />
                        </Button>
                    </Sheet>
                    {
                        this.state.paths.map((path) => {
                            return <Path path={path}></Path>
                        })
                    }
                </div>
            );
        }
    })
};