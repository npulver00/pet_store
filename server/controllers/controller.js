
module.exports={
    getProducts: (req, res)=>{
        const db = req.app.get("db");
        db.get_products().then(products=>{
            // console.log("product back", products)
                res.json(products);
        }).catch(error =>{
            console.log("error in getProducts", error);
            res.status(500).json("Issue with the Server in getProducts");
        })
    },
    postToCart: (req, res)=>{
        const{id}= req.params
        const{image, name, price}= req.body
        const db = req.app.get("db");
        db.post_Cart({
            id,
           
        }).then(productCart=>{
            console.log("1stproductCart", productCart)
            const producttoCart = productCart[0]
            // console.log("productCart", productCart)
            req.session.user.cart = productCart
            console.log("req.session", req.session.user)

            res.status(200).json(producttoCart)
        }).catch(error=>{
            console.log("error in postToCart", error)
        })
    },
    deleteProduct: (req, res)=>{
        const{id}= req.params
        const db = req.app.get("db");
        db.deleteAProduct([
            id
        ]).then(removeProduct=>{
            res.json(removeProduct)
        }).catch(error=>{
            console.log("error in deleteProduct", error)
        })
    },
    editProduct: (req, res)=>{
        const{id}=req.params;
        const{name}=req.body;
        const db = req.app.get("db");
        db.editAProduct({
            id:id,
            name:name,
        }).then(()=>{
            res.status(200).json()
        }).catch(error=>{
            console.log("error in editProduct", error)
        })                  
     },







    }





