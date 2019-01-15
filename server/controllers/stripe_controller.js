const stripe = require('stripe')(process.env.STRIPE_SECRET)

module.exports = {
    stripeCheckout: (req, res) => {
        const { token, total } = req.body;
        stripe.charges.create({
            source: token.id,
            amount: total * 100,
            currency: 'usd',
            description: 'petstore'
        },
            (error, response) => {
                error
                    ? res.status(500).json({ error })
                    : res.status(200).send({ response })
            })
    },

}