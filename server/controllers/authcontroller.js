const axios = require("axios");

module.exports = {
  login: (req, res) => {
    const { code } = req.query;
    let redirect_uri =
      process.env.HOST == "localhost"
        ? `http://${req.headers.host}/auth/callback`
        : `https://${req.headers.host}/auth/callback`
    const payload = {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code,
      grant_type: "authorization_code",
      redirect_uri
    };

    function tradeCodeForAccessToken() {
      return axios.post(
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`,
        payload
      );
    }
    function tradeAccessTokenForUserInfo(response) {
      return axios.get(
        `https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${
        response.data.access_token
        }`
      );
    }
    function storeUserInfoInDatabase(response) {
      // console.log("storeUserInfo", response.data);
      const user = response.data;
      const db = req.app.get("db");
      return db.get_user([user.sub]).then(users => {
        if (users.length) {
          req.session.user = {
            username: users[0].username,
            email: users[0].email,
            picture: users[0].picture,
            auth0_id: users[0].auth0_id
          };
          res.redirect("/");
        } else {
          return db
            .create_user([user.name, user.email, user.picture, user.sub])
            .then(newUsers => {
              console.log("new user");
              req.session.user = newUsers[0];
              res.redirect("/");
            });
        }
      });
    }

    tradeCodeForAccessToken()
      .then(tradeAccessTokenForUserInfo)
      .then(storeUserInfoInDatabase)
      .catch(error => {
        console.log("Error in the login route", error);
        res.status(500).send("Something bad happen on the Server");
      });
  },

  getUser: (req, res) => {
    res.json(req.session.user);
  },

  logout: (req, res) => {
    req.session.destroy();
    res.send("Logged out");
  }
};
