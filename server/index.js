const socket = require("socket.io")
const express = require("express")
const path = require("path")

const app = express()
const io = socket(app)

app.use(express.static("public"))

app.listen(8080)