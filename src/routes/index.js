const bingMapRouter = require('./bingmap');

function route(app) {

    app.use('/bingmap/', bingMapRouter);
}

module.exports = route;
