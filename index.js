const express = require("express")
const app = express()
const morgan = require("morgan")
const cors = require("cors")
const port = 5000


const usersRoutes = require("./routes/users")

app.use(cors())
app.use(morgan("tiny"))
app.use(express.json())

app.use('/users', usersRoutes)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})