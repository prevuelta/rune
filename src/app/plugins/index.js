module.exports = function (exposedData) {
    return [
    	require('./InspectPath.jsx'),
        require('./GridManager.jsx'),
        require('./Nudge.jsx')(exposedData),
        require('./LayerManager.jsx')
        // require('./PointRandomise.jsx'),
        // require('./Shapes.jsx'),
        // require('./FourPointWeightTransform.jsx')
    ];
};