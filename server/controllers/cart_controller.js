module.exports = {
  postToCartAdd: (req, res) => {
    const { product_id, auth0_id } = req.body;
    const db = req.app.get("db");
    db.get_productstocart(auth0_id).then(cart => {
      const getcartIndex = cart.findIndex(product => {
        return product_id === product.product_id
      })
      if (getcartIndex === -1) {
        db.post_Cart({ product_id, auth0_id }).then(products => {
          res.status(200).json(products);
        })
      } else {
        const productQty = cart[getcartIndex].quantity + 1
        const cartId = cart[getcartIndex].cart_id
        db.updateQuantity([productQty, cartId]).then(product => {
          res.status(200).json(product)
        })
      }
    });
  },
  getProductsInCart: (req, res) => {
    const { auth0_id } = req.params
    const db = req.app.get("db");
    db.get_productstocart(auth0_id).then(response => {
      res.status(200).json(response)
    })
  },
  deleteFromCart: (req, res) => {
    const { product_id, quantity } = req.params
    console.log("req.params!", req.params)
    const db = req.app.get("db");
    db.deleteCart(product_id).then(deleteProduct => {
      console.log("deleteProduct", deleteProduct)
      res.json(deleteProduct);
    })
      .catch(error => {
        console.log("error in deleteAddress", error);
      })
  },

  ///regarding address and form 
  postFormToCart: (req, res) => {
    const { auth0_id, address, city, state, zip, name } = req.body;
    console.log("address req.body", req.body)
    const db = req.app.get("db");
    db.postAddress({
      auth0_id,
      address,
      city,
      state,
      zip,
      name
    })
      .then(address => {
        const posttheAddress = address[0];
        res.status(200).json(posttheAddress);
        console.log("response from Post", posttheAddress)
      })
      .catch(error => {
        console.log("Error in Controller Post", error);
      });
  },
  getAddressHistory: (req, res) => {
    console.log("getAddress", req.session.user)
    const db = req.app.get("db");
    db.get_addresses({
      auth0_id: req.session.user.auth0_id
    })
      .then(address => {
        // console.log("address back", address)
        res.json(address);
      })
      .catch(error => {
        console.log("error in getAddressHistory", error);
        res.status(500).json("Issue with the Server in getAddressHistory");
      });
  },
  editAddress: (req, res) => {
    const { id } = req.params;
    const { address, city, state, zip, name } = req.body;
    console.log("editAddress req.body", req.body, id);
    var zipcode = 33967;
    const { auth0_id } = req.session.user;
    console.log("auth0_id ")
    const db = req.app.get("db");
    db.editAddress({
      id: +id,
      auth0_id: auth0_id,
      address: address,
      city: city,
      state: state,
      zipcode: zipcode,
      name: name
    })
      .then((address) => {
        res.status(200).json(address);
      })
      .catch(error => {
        console.log("error in editAddress", error);
      });
  },
  deleteAddress: (req, res) => {
    const { id } = req.params;
    const db = req.app.get("db");
    db.deleteAddress([id])
      .then(removeAddress => {
        res.json(removeAddress);
      })
      .catch(error => {
        console.log("error in deleteAddress", error);
      });
  }
};
