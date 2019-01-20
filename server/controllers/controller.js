
module.exports = {
    getProducts: (req, res) => {
        const db = req.app.get("db");
        db.get_products().then(products => {
            res.json(products);
        }).catch(error => {
            res.status(500).json("Issue with the Server in getProducts", error);
        })
    },
    postToCart: (req, res) => {
        const { id } = req.params
        // const { image, name, price } = req.body
        const db = req.app.get("db");
        db.post_Cart({
            id,
        }).then(productCart => {
            const producttoCart = productCart[0]
            req.session.user.cart = productCart
            res.status(200).json(producttoCart)
        }).catch(error => {
            console.log("error in postToCart", error)
        })
    },

}





