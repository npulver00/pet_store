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
          // console.log("product", product)
          // console.log("price", price)
          const productQty = cart[getcartIndex].quantity + 1
          const priceId = +productQty * +price
          // console.log("quantity", productQty)
          // console.log("priceId", priceId)
          // console.log("productQty", productQty)
          const cartId = cart[getcartIndex].cart_id
          console.log("cardId", cartId)
          db.updateQuantity([productQty, priceId, cartId]).then(product => {
            res.status(200).json(product)
            console.log("product", product)
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
  // deleteFromCart: (req, res) => {
  //   const { product_id, quantity } = req.params
  //   console.log("req.params!", req.params)
  //   const db = req.app.get("db");
  //   if (+quantity === 1) {
  //     db.deleteCart(product_id).then(deleteProduct => {
  //       console.log("deleteProduct", deleteProduct)
  //       res.json(deleteProduct);
  //     })
  //       .catch(error => {
  //         console.log("error in deleteAddress", error);
  //       })
  //   } else {
  //     db.updateQuantity(product_id).then(deleteitem => {
  //       res.status(200).json(deleteitem)
  //     })
  //   }
  // },
  deleteFromCart: (req, res) => {
    const { product_id } = req.params
    console.log("req.params!", req.params)
    const db = req.app.get("db");

    db.deleteCart(product_id).then(deleteProduct => {
      console.log("deleteProduct", deleteProduct)
      res.json(deleteProduct);
    })
      .catch(error => {
        console.log("error in deleteFormCart", error);
      })
  },

  totalFromCart: (req, res) => {
    const db = req.app.get("db");
    db.totalofcart().then(response => {
      console.log("backkkkk")
      console.log("responsetotal", response)
      res.status(200).json(response)
    })


  },


  // deleteFromCart: (req, res) => {
  //   const { product_id } = req.params
  //   const { auth0_id } = req.body

  //   console.log("req.params!", req.params)
  //   const db = req.app.get("db");
  //   db.delete_productstocart(auth0_id).then(deleteProduct => {
  //     console.log("1st Delete", deleteProduct)
  //     const deleteoneitem = deleteProduct.findIndex(oneproduct => {
  //       console.log("2nd Delete", deleteoneitem)
  //       return product_id === oneproduct.product_id
  //     })
  //     if (deleteoneitem === -1) {
  //       db.deleteCart(product_id).then(product => {
  //         res.json(deleteProduct);
  //       })
  //     } else {
  //       const deleteqty = deleteProduct[deleteoneitem].quantity - 1
  //       const deleteID = deleteProduct[deleteoneitem].cart_id
  //       db.decrementQty([deleteqty, deleteID]).then(product => {
  //         res.status(200).json(product)
  //       })
  //     }
  //   }).catch(error => {
  //     console.log("error in deleteAddress", error);
  //   })
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
