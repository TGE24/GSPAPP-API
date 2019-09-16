var express = require("express");
var Lecture = require("../models/lecture");
var router = express.Router();

const formidable = require("formidable");

// import our authenticate middleware
const { authenticate } = require("../middleware/authenticate");

router.post("/upload", authenticate, (req, res, next) => {
  new formidable.IncomingForm()
    .parse(req, (err, fields, files) => {
      Lecture.findOne({ title: "Library Skills" }).then(function(subtopics) {
        subtopics.topics.map((subtopic, index) => {
          if (String(subtopic._id) === fields.topicid) {
            if (err) {
              console.error("Error", err);
              throw err;
            }
            if (!fields.name || !files.material.name) {
              sendJSONresponse(res, 400, {
                message: "Please fill all the required fields"
              });
              return;
            }
            subtopic.materials.push({
              name: fields.name,
              material: files.material.name,
              topicid: subtopic._id
            });
          }
        });
        subtopics.save().then(function(savedmaterial) {
          res.send(savedmaterial);
        });
      });
    })
    .on("fileBegin", (name, file) => {
      file.path = __dirname + "/upload/" + file.name;
    });
  //     const course = new Lecture({
  //   title: "Library Skills",
  //   coursecode: "GSP 101",
  //   topics: [
  //     { topic: "The Introduction to The Use of Library" },
  //     { topic: "Modern Technologies in Library" }
  //   ]
  // });
  // course.save().then(function(savedcourse) {
  // res.send(savedcourse)
  // })
});

module.exports = router;
