const proxy = require('http-proxy-middleware');

module.exports = app =>{
    app.use("/auth", proxy({target: "http://localhost:4015"}));
    app.use("/store", proxy({ target: "http://localhost:4015"}));
    app.use("/cart", proxy({ target: "http://localhost:4015"}));
    app.use("/session", proxy({ target: "http://localhost:4015"}));
}