const express = require("express")
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")
const config = require("./config/config")
const apiRoutes = require("./routes/api")

var allowedOrigins = [
	"http://localhost:3000",
	"https://bits.vercel.app",
	"https://bits-qfwpzo281-erikadev45.vercel.app",
	"https://bits-iy4xmalco-erikadev45.vercel.app",
	"https://bits-dev.netlify.app",
  "https://bits-507kxg0em-erikadev45.vercel.app"
]

app.use(
	cors({
		origin: function (origin, callback) {
			if (!origin) return callback(null, true)
			if (allowedOrigins.indexOf(origin) === -1) {
				var msg =
					"The CORS policy for this site does not " +
					"allow access from the specified Origin."
				return callback(new Error(msg), false)
			}
			return callback(null, true)
		},
	})
)

app.use(bodyParser.json())
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: "50mb",
		parameterLimit: 100000,
	})
)

app.get('/', function(req, res) {
  res.send('<h1>Connected</h1>');
})

app.use("/api", apiRoutes)

app.listen(config.port, function (err) {
	if (err) console.log(err)
	console.log("Server listening on PORT", config.port)
})
