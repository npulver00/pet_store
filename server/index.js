const express = require("express");
const bodyParser = require("body-parser");
const massive = require("massive");
const session = require("express-session");
require("dotenv").config();
const authcontroller = require("./controllers/authcontroller");
const controller = require("./controllers/controller");
const cart_controller = require("./controllers/cart_controller");

//add connect-pg simple???

const app = express();
app.use(bodyParser.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 * 2
    }
  })
);

massive(process.env.CONNECTION_STRING)
  .then(database => {
    app.set("db", database);
  })
  .catch(error => {
    console.log("Error in Massive", error);
  });


//Endpoints for Auth0
app.get("/auth/callback", authcontroller.login);
app.get("/auth/user-data", authcontroller.getUser);
app.post("/auth/logout", authcontroller.logout);

//Endpoints for Products

app.get("/store/pets", controller.getProducts);

//Endpoint for Cart
app.post("/store/cart", cart_controller.postToCartAdd);
app.delete('/store/cart/:product_id/:quantity', cart_controller.deleteFromCart);
app.get('/store/cart/:auth0_id', cart_controller.getProductsInCart);
app.post('/cart/address', cart_controller.postFormToCart);
app.get('/store/cart', cart_controller.totalFromCart)

//Endpoint for Form/Addresses
app.get('/store/addresshistory', cart_controller.getAddressHistory);
app.put('/store/addresshistory/:id', cart_controller.editAddress);
app.delete('/store/addresshistory/:id', cart_controller.deleteAddress);

app.use(express.static(`${__dirname}/../build`));

//   Endpoint for Digital Ocean
const path = require("path");
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build/index.html"));
});

const SERVER_PORT = process.env.SERVER_PORT || 4015;

app.listen(SERVER_PORT, () => {
  console.log(`Server listening on port ${SERVER_PORT} 🎄`);
});
