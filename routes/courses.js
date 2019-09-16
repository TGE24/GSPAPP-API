const express = require("express");
const Lecture = require("../models/lecture");
const router = express.Router();
const formidable = require("formidable");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "tech-18",
  api_key: "856292739299675",
  api_secret: "8Qcrg5W7BuUizWQ5VYUGmra489g"
});

// import our authenticate middleware
const { authenticate } = require("../middleware/authenticate");

router.get("/course", authenticate, (req, res, next) => {
  Lecture.findOne({
    title: "Library Skills"
  }).then(function(subtopics) {
    res.send(subtopics);
  });
});

router.post("/upload", authenticate, (req, res, next) => {
  new formidable.IncomingForm().parse(req, (err, fields, files) => {
    const path = files.material.path;
    const uniqueFilename = new Date().toISOString();
    cloudinary.uploader.upload(
      path,
      { public_id: `${uniqueFilename}` },
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
              if (!fields.name || !files.material.name) {
                sendJSONresponse(res, 400, {
                  message: "Please fill all the required fields"
                });
                return;
              }
              subtopic.materials.push({
                name: fields.name,
                material: file.url,
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
