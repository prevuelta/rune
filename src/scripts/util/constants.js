export default {
    SILVER_RATIO: Math.sqrt(2),
    GOLDEN_RATIO: (1 + Math.sqrt(5)) / 2,
    DEFAULT_ZOOM_LEVEL: 24,
    CANVAS_SIZE: 280,
};

export const COLORS = {
    BLUE: '#27dded',
    RED: '#e13d1c',
    GREEN: '#14bb5b',
    CREAM: '#ece5d4',
};

export const MODE = {
    DOCUMENT: 0,
    PATH: 1,
    DRAW: 2,
    ARC: 3,
};

export const MODE_TAG = {
    [MODE.DOCUMENT]: 'Document',
    [MODE.PATH]: 'Path',
    [MODE.DRAW]: 'Draw',
    [MODE.ARC]: 'Arc',
};

export const POINT_TYPES = {
    STRAIGHT: 0,
    ARC: 1,
};
