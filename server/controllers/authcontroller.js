const axios = require("axios");

module.exports={

        login: (req, res)=>{
            const{code} = req.query;
            console.log("Login Code query", code);
            const payload ={
                client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
            redirect_uri: `http://${req.headers.host}/auth/callback`
        };

        function tradeCodeForAccessToken(){
            return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
        }
        function tradeAccessTokenForUserInfo(response){
            console.log("tradeAccessTokenForUserInfo", response.data.access_token)
            return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${response.data.access_token}`)
        }
        function storeUserInfoInDatabase(response){
            console.log("storeUserInfo", response.data);
            const user = response.data;
            const db = req.app.get('db');
            return db.get_user([user.sub]).then(users=>{
                if(users.length){
                    req.session.user={
                        name: users[0].name,
                        email: users[0].email,
                        picture: users[0].picture,
                        auth0_id: users[0].auth0_id,
                    } 
                    res.redirect('/')
                }else{
                    return db.create_user([
                        user.name,
                        user.email,
                        user.picture,
                        user.sub
                    ]).then(newUsers=>{
                        console.log("new user")
                        req.session.user = newUsers[0]
                        res.redirect('/')
                    })
                }
            })
        }

            tradeCodeForAccessToken()
            .then(tradeAccessTokenForUserInfo)
            .then(storeUserInfoInDatabase)
            .catch(error=>{
                console.log("Error in the login route", error);
                res.status(500).send("Something bad happen on the Server")
        });            

    },

        getUser: (req, res)=>{
            res.json({ user: req.session.user, cart:req.session.cart});
        },

        logout: (req, res)=>{
            res.session.destroy();
            res.send("Logged out");
           
        },

}