const express = require("express");
const path = require("path");

const app = express();
app.use(express.static(__dirname + "/views"));

const port = 8000;



// get "/"
app.get("/", (req, res) => {
    const filePath = path.join(__dirname + "/views/landingPage.html");

    res.sendFile(filePath, function(err) {
        if (err) {
            return res.status(err.status).end();
        } else {
            return res.status(200).end();
        }
})
});


// run on port 8000
app.listen(port, ()=> {
    console.log(`Listening on port ${port}`);
})

