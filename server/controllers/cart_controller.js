module.exports = {
  postToCartAdd: (req, res) => {
    const { product_id, auth0_id } = req.body;
    // console.log("posttocartAdd in CartController1", req.body)
    const db = req.app.get("db");
    db.get_productstocart(auth0_id).then(cart => {
      const getcartIndex = cart.findIndex(product => {
        // console.log("product Now", product_id)
        // console.log("product after", product.product_id)
        // console.log("product", product)
        return product_id === product.product_id
      })
      // console.log("getcartIndex", getcartIndex)
      if (getcartIndex === -1) {
        db.post_Cart({ product_id, auth0_id }).then(products => {
          // console.log("posttocartAdd in CartController2", products);
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

    // const{cart} = req.session.user.cart
    const db = req.app.get("db");
    db.get_productstocart(auth0_id).then(response => {
      console.log("getProductsServer", response)
      console.log("product_id", response.product_id)
      console.log("auth0_id", response.auth0_id)

      res.status(200).json(response)
    })

    // console.log("req.session.user.cart11", req.session.user.cart);
    // if (req.session.user.cart) {
    //   res.json(req.session.user.cart);
    //   console.log("req.session.user.cart", req.session.user.cart);
    // } else {
    //   console.log("Please add to cart");
    // }
  },
  deleteFromCart: (req, res) => {
    const { user_id, product_id } = req.params
    const db = req.app.get("db");
    db.deleteCart(user_id, product_id)
      .then(deleteProduct => {
        res.json(deleteProduct);
      })
      .catch(error => {
        console.log("error in deleteAddress", error);
      });
  },


  // const { id } = req.params;
  // console.log("sean", req.session);
  // // if(!req.session.user.cart){
  // //     req.session.user.cart = id}
  // let { cart } = req.session.user;
  // const itemtoDelete = cart.findIndex(product => {
  //   console.log("id", id), console.log("product.id", product.id);
  //   return product.id === +id;
  // });




  //   console.log("itemtoDelete", itemtoDelete);
  //   if (itemtoDelete !== -1) {
  //     const userCart = cart.findIndex(product => product.id === +id);
  //     // console.log("userCart", userCart)
  //     // console.log("precart", cart)
  //     cart.splice(userCart, 1);
  //     // console.log("postCart", cart)
  //     res.json(cart);
  //   } else {
  //     console.log("item deleted");
  //   }
  // },

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
