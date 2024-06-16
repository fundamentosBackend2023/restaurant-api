const globalMw = (req, res, next) => {
    console.log('this is a global mw');
    next()
}

const localMw = (req, res, next) => {
    console.log('this is a local mw');
    next();
}

module.exports = { globalMw, localMw };