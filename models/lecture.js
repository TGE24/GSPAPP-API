const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  question: String,
  correct_answer: String,
  materialid: String
});

const AnswersSchema = new Schema({
  a: String,
  b: String,
  c: String,
  d: String,
  e: String
})

const MaterialsSchema = new Schema({
  title: String,
  colour: String,
  filetype: String,
  material: String,
  topicid: String,
  quiz: [QuizSchema],
  answers: [AnswersSchema]
});

const SubTopics = new Schema({
  topic: String,
  materials: [MaterialsSchema]
});

const CourseSchema = new Schema({
  title: String,
  coursecode: String,
  topics: [SubTopics]
});

const Course = mongoose.model("course", CourseSchema);

module.exports = Course;
