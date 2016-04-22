module.exports = function(exposedData) {
    return [
    	require('./InspectPoint.jsx')(exposedData),
        require('./GridManager.jsx')(exposedData)
        // require('./PointTranslate.jsx')(exposedData),
        // require('./LayerManager.jsx')(exposedData),
        // require('./PointRandomise.jsx')(exposedData),
        // require('./Shapes.jsx')(exposedData),
        // require('./FourPointWeightTransform.jsx')(exposedData)
    ];
};