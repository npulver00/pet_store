module.exports = {
  postToCartAdd: (req, res) => {
    const { product_id, auth0_id, price } = req.body;
    const db = req.app.get("db");
    db.get_productstocart(auth0_id).then(cart => {
      const getcartIndex = cart.findIndex(product => {
        return product_id === product.product_id
      })
      if (getcartIndex === -1) {

        db.post_Cart({ product_id, auth0_id, price }).then(products => {
          res.status(200).json(products);
        })
      } else {

        db.get_Item_info(product_id).then(product => {
          const productQty = cart[getcartIndex].quantity + 1
          const priceId = +productQty * +price
          const cartId = cart[getcartIndex].cart_id
          // console.log("cardId", cartId)
          console.log("priceId", priceId)
          db.updateQuantity([productQty, priceId, cartId]).then(product => {
            res.status(200).json(product)
            // console.log("product", product)
          })
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
    const { product_id } = req.params
    const db = req.app.get("db");
    db.deleteCart(product_id).then(deleteProduct => {
      res.json(deleteProduct);
    })
      .catch(error => {
        console.log("error in deleteFormCart", error);
      })
  },

  totalFromCart: (req, res) => {
    const db = req.app.get("db");
    db.totalofcart().then(response => {
      res.status(200).json(response)
    })
  },

  amountFromCart: (req, res) => {
    const db = req.app.get("db");
    db.amountofcart().then(response => {
      res.status(200).json(response)
    })
  },


  ///regarding address and form 
  postFormToCart: (req, res) => {
    const { auth0_id, address, city, state, zip, name, primary_address } = req.body;
    const db = req.app.get("db");
    db.postAddress({
      auth0_id,
      address,
      city,
      state,
      zip,
      name,
      primary_address

    })
      .then(address => {
        const posttheAddress = address[0];
        res.status(200).json(posttheAddress);
      })
      .catch(error => {
        console.log("Error in Controller Post", error);
      });
  },
  getAddressHistory: (req, res) => {
    const db = req.app.get("db");
    db.get_addresses({
      auth0_id: req.session.user.auth0_id
    })
      .then(address => {
        res.json(address);
      })
      .catch(error => {
        res.status(500).json("Issue with the Server in getAddressHistory", error);
      });
  },
  editAddress: (req, res) => {
    const { id } = req.params;
    const { address, city, state, zip, name, primary_address } = req.body;
    // var zipcode = 33967;
    const { auth0_id } = req.session.user;
    const db = req.app.get("db");
    db.editAddress({
      id: +id,
      auth0_id: auth0_id,
      address: address,
      city: city,
      state: state,
      zipcode: zip,
      name: name,
      primary_address: primary_address
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
