const geonames = require("geonames-stream");
const through = require("through2");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const app = express();
const geonamesSearch = require("search-geonames");

const port = 3000;

app.use(bodyParser.json());

app.use(cors());

function strcmp(str1, str2) {
  // if (str1.match(str2)) {
  //   return 1;
  // }
  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();
  if (str1 == str2) {
    return 1;
  }
  return 0;
}

app.post("/filter", (req, res) => {
  // request parameters
  const sname = req.body.sname;
  const LANGUAGE = "en";

  // you can use Geonames options to manage result format
  var options = {
    language: LANGUAGE
  };

  // use callback to return result from geocoding process
  function callback(error, result) {
    if (error) console.log(error);
    // on error
    else {
      console.log(result); // on success
      const payload = {
        final: result
      };
      res.send(payload);
    }
  }
  // address geocoding
  geonamesSearch.searchByQuery(sname, callback, options);
});
var path = __dirname + "/project/";
// or like this for a non index.js name
var path = __dirname + "/project/server.js";

// app.post("/search", (req, res) => {
//   const name = req.body.city;
//   const codeiso = req.body.countryIso + ".zip";

//   let res_obj = null;

//   console.log("\nrequet received");

//   fs.createReadStream("./allcs/" + codeiso)
//     .pipe(geonames.pipeline)
//     .pipe(
//       through.obj((data, enc, next) => {
//         if (strcmp(data.name, name) === 1) {
//           var aestTime = new Date().toLocaleString("en-US", {
//             timeZone: data.timezone
//           });
//           aestTime = new Date(aestTime);
//           console.log("sending response");
//           res_obj = {
//             name: data.name,
//             timezone: data.timezone,
//             latitude: data.latitude,
//             longitude: data.longitude,
//             time: aestTime.toLocaleString()
//           };
//         } else {
//           next();
//         }
//       })
//     );

//   let int = setInterval(() => {
//     if (res_obj) {
//       clearInterval(int);
//       res.json(res_obj);
//     }
//   }, 50);
// });

app.post("/search", (req, res) => {
  const name = req.body.city;
  const codeiso = req.body.countryIso + ".zip";

  let res_obj = null;
  fs.createReadStream("./allcs/" + codeiso)
    .pipe(geonames.pipeline)
    .pipe(
      through.obj((data, enc, next) => {
        console.log(data.name + data.timezone + data.latitude + data.longitude);
      })
    );
  //     through.obj((data, enc, next) => {
  //       if (strcmp(data.name, name) === 1) {
  //         var aestTime = new Date().toLocaleString("en-US", {
  //           timeZone: data.timezone
  //         });
  //         aestTime = new Date(aestTime);
  //         console.log("sending response");
  //         res_obj = {
  //           name: data.name,
  //           timezone: data.timezone,
  //           latitude: data.latitude,
  //           longitude: data.longitude,
  //           time: aestTime.toLocaleString()
  //         };
  //         this.emit("end");
  //       }
  //       next();
  //     })
  //   )
  //   .on("end", () => {
  //     doSomethingSpecial();
  //   });

  // // let int = setInterval(() => {
  // //   if (res_obj) {
  // //     clearInterval(int);
  // res.json(res_obj);
  // // }
  // // }, 50);
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
