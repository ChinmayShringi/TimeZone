const mysql = require("mysql");
var timezoner = require('timezoner');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const geonamesSearch = require("search-geonames");
const port = 5002;
var dec = moment("2014-12-01T12:00:00Z");

app.use(bodyParser.json());
app.use(cors());



app.post("/search", (req, res) => {
  console.log();
  const name = req.body.city;
  const id = req.body.geonameId;
  const iso = req.body.countryIso;
  const lat=req.body.latitude;
  const lg=req.body.longitude;
  let res_obj=null;
  let time;
  timezoner.getTimeZone(
lat,lg,
    function (err, data) {
        if (err) {
            console.log(err);
        } else {
           time=dec.tz(data.timezone).format('ha z')
        }
    },  { language: 'es', key: 'YOUR_API_KEY' }
);
        res.json({name:name,id:id,iso:iso,lat:lat,long:lg,time:time});

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