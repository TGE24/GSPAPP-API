const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  question: String,
  correct_answer: String,
  answers: Schema.Types.Mixed,
  materialid: String
})

const MaterialsSchema = new Schema({
  material: String,
  name: String,
  topicid: String,
  quiz: [QuizSchema],
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
