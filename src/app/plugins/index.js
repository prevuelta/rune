module.exports = function(exposedData) {
    return [
        require('./GridManager.jsx')(exposedData),
        require('./PointTranslate.jsx')(exposedData)
    ];
};