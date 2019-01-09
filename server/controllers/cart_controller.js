module.exports={
    postToCartAdd: (req, res)=>{
        const{id} = req.body;
        if(!req.session.user.cart){
            req.session.user.cart = []}
        let{cart} = req.session.user;
        const db = req.app.get("db");
        db.post_Cart(
            id,
        ).then((products)=>{
            console.log("products", products)
            const index = cart.findIndex(product => product.id == id)
            console.log("index", index)
        if(index === -1){
            const selectAdd = products.find(product=>product.id == id);
            cart.push(selectAdd);
            console.log("selectAdd", selectAdd)
        }
        res.status(200).json(req.session.user)})
        console.log("req.session", req.session.user)
        
    },
    getProductsInCart:(req, res) =>{
        console.log("req.session.user.cart11", req.session.user.cart)
        if(req.session.user.cart){
            res.json(req.session.user.cart)
            console.log("req.session.user.cart", req.session.user.cart)
        }else{
            console.log("Please add to cart")
        }

    },
    deleteFromCart: (req, res)=>{
        const{id} = req.params;
        console.log("sean",req.session)
        // if(!req.session.user.cart){
        //     req.session.user.cart = id}
        let{cart} = req.session.user;      
        const itemtoDelete = cart.findIndex(product=>{
             console.log("id", id),
             console.log("product.id", product.id)
          return product.id === +id});
             
        console.log("itemtoDelete", itemtoDelete)
        if(itemtoDelete!== -1){
            const userCart = cart.findIndex(product=>product.id === +id);
            // console.log("userCart", userCart)
            // console.log("precart", cart)
            cart.splice(userCart, 1);
            // console.log("postCart", cart)
            res.json(cart)
        }else{
            console.log("item deleted")
        }
    },
    postFormToCart: (req, res)=>{
        const{ auth0_id, address, city, state, zip, name}= req.body
        
       const db = req.app.get("db")
        db.postAddress({
            auth0_id,
            address,
            city,
            state,
            zip,
            name
        }).then(address=>{
            const posttheAddress = address[0]
            res.status(200).json(posttheAddress)
        })
        .catch(error=>{
            console.log("Error in Controller Post", error)
        })
    },
    getAddressHistory: (req, res)=>{
        const db = req.app.get("db");
        db.get_addresses().then(address=>{
            // console.log("address back", address)
                res.json(address);
        }).catch(error =>{
            console.log("error in getAddressHistory", error);
            res.status(500).json("Issue with the Server in getAddressHistory");
        })

    }






}






