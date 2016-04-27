module.exports = function(exposedData) {
    return [
    	require('./InspectPoint.jsx')(exposedData),
    	require('./InspectPath.jsx')(exposedData),
        require('./GridManager.jsx')(exposedData),
        require('./Nudge.jsx')(exposedData),
        require('./LayerManager.jsx')(exposedData),
        require('./PointRandomise.jsx')(exposedData),
        require('./Shapes.jsx')(exposedData),
        require('./FourPointWeightTransform.jsx')(exposedData)
    ];
};