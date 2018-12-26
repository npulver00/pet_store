
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





}