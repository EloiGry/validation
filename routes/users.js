const express = require("express")
const app = express()
const {body, validationResult} = require('express-validator')

let users = require("../users.json")

app.get('/', (req, res) => {
    res.json(users)
})

app.get('/:slug', (req, res) => {
    const {slug} = req.params
    const user = users.find(user => user.slug === slug)
    res.json(user)
})

app.post('/',
    body('name')
    .exists().withMessage("name is required")
    .isLength({ min: 4 }).withMessage("name is too short"),
    body('password')
    .exists().withMessage("password is required")
    .isLength({ min: 8 }).withMessage("password is too short"),
    body('city')
    .isIn(["Paris", "Tokyo", "Los Angeles"]).withMessage("this city is not accepted"),
        (req, res) => {
            const {errors} = validationResult(req)

            if (errors.length > 0) {
                res.status(400).json({ errors })
            } else {
                const user = {
                    slug : req.body.name.toLowerCase().replace(/[^\w]/gi, '-'),
                    ...req.body
                }
    
                users = [...users, user]
                res.json(user)
            }
            
} )

module.exports = app