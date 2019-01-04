module.exports={
    postToCartAdd: (req, res)=>{
        const{id} = req.body;
        if(!req.session.user.cart){
            req.session.user.cart= []}
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
    
       
    }






