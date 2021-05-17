const socket = require("socket.io")
const express = require("express")
const path = require("path")

const app = express()

app.use(express.static("public"))

const server = app.listen(8080)
const io = socket(server)