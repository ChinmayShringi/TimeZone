const mysql = require("mysql");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const geonamesSearch = require("search-geonames");
const port = 5002;

app.use(bodyParser.json());
app.use(cors());

var connection = mysql.createConnection({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "mysqlroot",
    database: "timezonecities"
});

// connection.connect();

app.post("/search", (req, res) => {
    const name = req.body.city;
    const id = req.body.geonameId;
    const iso = req.body.countryIso;
    let res_obj = null;
    if (name === null && iso === null) {
        console.log("Error" + err);
    } else {
        let sql = `SELECT name,timezone,latitude,longitude FROM ${iso}1 where name="${name}" and geonameid=${id}`;
        connection.query(sql, (err, results, fields) => {
            if (err) throw err;
            var aestTime = new Date().toLocaleString("en-US", {
                timeZone: results[0].timezone
            });
            aestTime = new Date(aestTime);
            res_obj = {
                name: results[0].name,
                timezone: results[0].timezone,
                latitude: results[0].latitude,
                longitude: results[0].longitude,
                time: aestTime.toLocaleString()
            };
            res.json(res_obj);
        });
    }
});

app.post("/filter", (req, res) => {
    // request parameters
    const sname = req.body.sname;

    // you can use Geonames options to manage result format
    var options = {
        language: "en"
    };

    // use callback to return result from geocoding process
    function callback(error, result) {
        if (error) console.log(error);
        // on error
        else {
            const payload = {
                final: result
            };
            res.send(payload);
        }
    }
    // address geocoding
    geonamesSearch.searchByQuery(sname, callback, options);
});

app.listen(port, "0.0.0.0", () => {
    console.log("Server started on port " + port);
});