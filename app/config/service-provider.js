module.exports = [
    require('app/providers/cors'),
    require('app/providers/body-parser'),
    require('app/providers/morgan'),
    require('app/providers/passport'),
    require('app/providers/helmet'),
    require('app/providers/login'),
    // require('app/providers/handle-error'),
];
