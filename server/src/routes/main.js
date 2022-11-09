const { Router } = require('express')

const router = Router()

router.get('/', (req, res) => {
    res.send("Hello world!")
})

router.post('/login', (req, res) => {
    res.send("Login")
})

module.exports = router