const express = require("express");
const Lecture = require("../models/lecture");
const router = express.Router();

const { authenticate } = require("../middleware/authenticate");
router.post("/upload", authenticate, (req, res, next) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    const path = files.material.path;
    const uniqueFilename = new Date().toISOString();
    cloudinary.uploader.upload(
      path,
      { resource_type: "raw", public_id: `${uniqueFilename}` },
      function(err, file) {
        if (err) return res.send(err);
        console.log("file uploaded to Cloudinary");
        // remove file from server
        const fs = require("fs");
        fs.unlinkSync(path);
        Lecture.findOne({ title: "Library Skills" }).then(function(subtopics) {
          subtopics.topics.map((subtopic, index) => {
            if (String(subtopic._id) === fields.topicid) {
              if (err) {
                console.error("Error", err);
                throw err;
              }
              if (!fields.title || !files.material.name) {
                sendJSONresponse(res, 400, {
                  message: "Please fill all the required fields"
                });
                return;
              }
              subtopic.materials.push({
                title: fields.title,
                material: file.url,
                filetype: fields.filetype,
                colour: fields.colour,
                topicid: subtopic._id
              });
            }
          });
          subtopics.save().then(function(savedmaterial) {
            res.send(savedmaterial);
          });
        });
      }
    );
  });
  course.save().then(function(savedcourse) {
    res.send(savedcourse);
  });
});

router.post("/quizupload", authenticate, (req, res, next) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    Lecture.findOne({ title: "Library Skills" }).then(function(subtopics) {
      subtopics.topics.map((subtopic, index) => {
        subtopic.materials.map((material, index) => {
          if (String(material._id) === fields.materialid) {
            material.quiz.push({
              question: fields.question,
              correct_answer: fields.correct_answer,
              materialid: material._id
            });
            material.answers.push({
              a: fields.a,
              b: fields.b,
              c: fields.c,
              d: fields.d,
              e: fields.e
            });
          }
        });
      });
      subtopics.save().then(function(savedmaterial) {
        res.send(savedmaterial);
      });
    });
  });
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
module.exports = router;
