const express = require("express");
const userAuth = require("./routes/auth")
const cors = require("cors")

const PORT = process.env.PORT || 9000
const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors())



app.get("/", (req, res) => {
    res.send("Hello world")
})



app.use("/api/auth",userAuth)

app.listen(PORT, () => {
    console.log(`app listening on http://localhost:${PORT}`)
})

