const express = require("express");
const Lecture = require("../models/lecture");
const router = express.Router();


const { authenticate } = require("../middleware/authenticate");
router.post("/upload", authenticate, (req, res, next) => {
  const course = new Lecture({
    title: "Library Skills",
    coursecode: "GSP 101",
    topics: [
      {
         topic: "The Introduction to The Use of Library",
         materials: [
           {
            "name" : "Definition",
            "material": "1. The word library is derived from the Latin word “liber” which means book. 2. The library is a storehouse of knowledge. 3. That view derives from the fact that libraries were originally places were books as media of documentation of knowledge were kept and visited in order to use the stored knowledge",
            "topicid":"5d7f2f819c177300045e4a9d",
            quiz:[
              {
                "question":"Imagine you have an assignment to write a paper based on scholarly information. Which of the following places is most appropriate place to source for information?",
              "correct_answer":"d",
               "answers": {
                    "a": "Village",
                    "b": "Police station",
                    "c": "Building",
                    "d": "Library",
                    "e": "None of the mentioned"
                  }
              },
              {
                "question":"Which of the following would you not include among the types of library?",
              "correct_answer":"e",
               "answers": {
                    "a": "National library",
                    "b": "Public library",
                    "c": "Special library",
                    "d": "Academic libraries ",
                    "e": "Automatic library"
                  }
              }
              ]
           },
           {
            "name" : "Types of library",
            "material": "National Library 1. This is the apex library of any nation. 2. It is usually established and funded by the executive arm of government at the national level with branches spread across the nation. Functions  1. Serves as the depository for copyrighted publication in a country. 2. Prepares the national bibliography 3. Encourages reading habits/study skill and research.",
            "topicid":"5d7f2f819c177300045e4a9d",
            quiz: [
              {
                "question":"There are two organizational systems practiced in the University library. What are they?",
              "correct_answer":"a",
               "answers": {
                    "a": "Centralized and decentralized",
                    "b": "Localized and foreign",
                    "c": "Higher and lower",
                    "d": "Specific and general",
                    "e": "Public and private"
                  }
              },
              {
                "question":"Which approaches in organizing university library encourages decentralization and activities such as acquisition; cataloguing, circulation and references are carried out together in various subject areas and this requires subject specialist library?",
                "correct_answer":"a",
                 "answers": {
                      "a": "Subject approach",
                      "b": "Function approach",
                      "c": "Hybrid approach",
                      "d": "System approach",
                      "e": "None of the mentioned"
                    }
                },
            ]
           },

           {
            "name" : "Public library",
            "material": "1. This is a government owned and funded at state level with its presence in state capital and branches in local government headquarters. Functions 1.Encouragement of reading habits; 2. Promotion of enlighten and leisure; 3. Preservation and promotion of cultural heritage; and  4. Promotion and use of public libraries as education agencies for the individual",
            "topicid":"5d7f2f819c177300045e4a9d",
            quiz: [
              {
                "question":"In the administration and management of the university library, which of the following is not a function of the administration?",
              "correct_answer":"e",
               "answers": {
                    "a": "Budget planning and implementation",
                    "b": "ICT administration",
                    "c": "Maintainance of building",
                    "d": "Maintainance of ground/equipment",
                    "e": "Ordering and acquisition of materials"
                  }
              },
              {
                "question":"What division is responsible for ordering and acquisition of materials such as books, journals and all non-book materials? i. Collection Development Division  ii. Technical services division",
              "correct_answer":"a",
               "answers": {
                    "a": "i",
                    "b": "ii",
                    "c": "i & ii",
                    "d": "ii only",
                    "e": "All of the mentioned"
                  }
              }
            ]
           },
          {
            "name" : "Special library",
            "material": "1. They are libraries meant specially for research on a particular field of study and often for a limited group of users. 2. Everything about the library is special – collections, subjects, users and parent body. 3. The collection is made up of mainly of periodicals, books report, executive summaries and abstract. Functions 1. Encouragement of reading habits; 2. Promotion of enlighten and leisure; 3. Preservation and promotion of cultural heritage; and 4. Promotion and use of public libraries as education agencies for the individual",
            "topicid":"5d7f2f819c177300045e4a9d",
            quiz: [
              {
                "question":"Technical services division include all the following except?",
                "correct_answer":"e",
                 "answers": {
                      "a": "Cataloguing section",
                      "b": "Bindery section",
                      "c": "Audio visual section",
                      "d": "Reprographic section",
                      "e": "All of the mentioned"
                    }
              },
                {
                  "question":"What section involves describing each of these materials bibliographical and assigning subjects and class mark and their number on them?",
                "correct_answer":"a",
                 "answers": {
                      "a": "Cataloguing",
                      "b": "Bindery",
                      "c": "Audio Visual",
                      "d": "Reprographic",
                      "e": "Acquisition"
                    }
                },
            ]
          },
          {
            "name" : "Special library",
            "material": "1. They are libraries meant specially for research on a particular field of study and often for a limited group of users. 2. Everything about the library is special – collections, subjects, users and parent body. 3. The collection is made up of mainly of periodicals, books report, executive summaries and abstract. Functions 1. Encouragement of reading habits; 2. Promotion of enlighten and leisure; 3. Preservation and promotion of cultural heritage; and 4. Promotion and use of public libraries as education agencies for the individual",
            "topicid":"5d7f2f819c177300045e4a9d",
            quiz:[
            {
              "question":"The ________ section is responsible for the preservation of the life span of library materials such as books and periodicals.",
            "correct_answer":"b",
             "answers": {
              "a": "Cataloguing",
              "b": "Bindery",
              "c": "Audio Visual",
              "d": "Reprographic",
              "e": "Acquisition"
                }
            },
          {
              "question":"Since the introduction of computers, they are a collection of specialized non book materials managed for accessibility by the users. They include micro form, micro card, slide projector, CD-Rom, Digital Camera, Scanner and others. What section manages this?",
              "correct_answer":"b",
               "answers": {
                "a": "Cataloguing",
                "b": "Bindery",
                "c": "Audio Visual",
                "d": "Reprographic",
                "e": "Acquisition"
                  }
          },
            ]
          },

          {
            "name" : "Private library",
            "material": "1. These are collections of individuals. 2. The purpose of the personal collection is to foster personal development, research and consultancy services. 2. Examples are Nwafor Orizu Library Nwewi, Njoku Memorial Library donated to the University of Nigeria Nsukka and many more.",
            "topicid":"5d7f2f819c177300045e4a9d",
            quiz: [
              {
                "question":"What involves the systematic application of organized knowledge (synthesis) and tangibles (tools) for the extension of human facilities that are restricted as a result of the evolutionary process?",
              "correct_answer":"d",
               "answers": {
                    "a": "Data",
                    "b": "Information",
                    "c": "Communication",
                    "d": "Technology",
                    "e": "Computer"
                  }
              },
              {
                "question":"Computer consists of a collection of hardware and software.  What is the physical parts of a computer that can be seen and touched?",
              "correct_answer":"b",
               "answers": {
                "a": "Software",
                "b": "Hardware",
                "c": "Hardware and Software",
                "d": "Microsoft Software",
                "e": "Operating System"
                  }
              },
            ]
          },

          {
            "name" : "Children's Library",
            "material": "The organization of a University Library 1. There are two organizational systems practiced in the University library, these are:  2. Centralized; and 3. decentralized systems Centralized: 1. collections, services and activities of the library are carried out in a central library. 2. This facilitate decision making and ensure easy administration of the university library. Decentralized: 1. this is practiced in a multi-campus university with one main library and other branches or autonomous one serving the campuses.",
            "topicid":"5d7f2f819c177300045e4a9d",
            quiz:[
              {
                "question":"Computer consists of a collection of hardware and software.  What is the physical parts of a computer that can be seen and touched?",
              "correct_answer":"b",
               "answers": {
                "a": "Software",
                "b": "Hardware",
                "c": "Hardware and Software",
                "d": "Microsoft Software",
                "e": "Operating System"
                  }
            },
            {
            "question":"The term library is made of the word",
            "correct_answer":"a",
             "answers": {
              "a": "Liber",
              "b": "Libra",
              "c": "Liberes",
              "d": "Libre",
              "e": "Lebra"
                }
            },
            ]
          },
          {
            "name" : "The organization of a University Library",
            "material" : "There are two organizational systems practiced in the University library, these are: 1. Centralized; and 2. decentralized systems Centralized: 1. collections, services and activities of the library are carried out in a central library. 2. This facilitate decision making and ensure easy administration of the university library. Decentralized: 1. this is practiced in a multi-campus university with one main library and other branches or autonomous one serving the campuses.",
            "topicid":"5d7f2f819c177300045e4a9d",
            quiz: [
              {
                "question":"What computers solve problems by operating on continuous variables such as lengths, voltages or current?",
              "correct_answer":"b",
               "answers": {
                    "a": "Digital",
                    "b": "Analogue",
                    "c": "Automatic",
                    "d": "Analog and digital",
                    "e": "None of the mentioned"
                  }
              },
              {
                "question":"Computer networks are simply defined as a number of groups or systems whose numbers are connected in some way. What do you call the devices that tie these numbers of LANs together are called?",
              "correct_answer":"b",
               "answers": {
                "a": "Router",
                "b": "Switch",
                "c": "Key",
                "d": "Spot",
                "e": "Point"
                  }
              },
            ]
          }
         ]
     },
    { 
      topic: "Modern Technologies in Library",
      materials:[
        {
          "name" : "Definition of terms",
          "material": "Data: Data (singular datum) mean facts used in describing or discussing an item or a set of items. Information: Information is processed data that changes the state of a system that perceives it, whether a computer or a brain, hence a stream of data that does not change the state of its receiver is not information. Communication: is the activity of conveying information between two or more communicating entities. Technology: is defined as study of the technical means undertaken in all culture (a universal) which involves the systematic application of organized knowledge (synthesis) and tangibles (tools) for the extension of human facilities that are restricted as a result of the evolutionary process. Computer: is an electronic device that accepts input from a user, processes the input, stores the result if desired and /or produces output. Computer consists of a collection of hardware and software. Hardware is the physical parts of a computer that can be seen and touched. Software is the intangible part of the computer that cannot be seen but like the wind can be felt.",
          "topicid":"5d7f2f819c177300045e4a9d",
          quiz:[
           {
             "question":"________ are libraries without walls that depend on virtual reality technology for the creation of highly realistic simulations and surrogating in which users can become totally immersed Which of the following physical conditions can be translated?",
             "correct_answer":"a",
              "answers": {
               "a": "Virtual libraries",
               "b": "Modern libraries",
               "c": "Conventional libraries",
               "d": "Closed libraries",
               "e": "None of the mentioned"
                 }
             },
             {
               "question":"The functions of library include the following except",
             "correct_answer":"e",
              "answers": {
                   "a": "Information retrieval",
                   "b": "Storage",
                   "c": "Documentation",
                   "d": "Design",
                   "e": "System"
                 }
             },
            ]
         }
      ]
   }
    ]
  });
  course.save().then(function(savedcourse) {
  res.send(savedcourse)
  })
});


// console.log(req.body);
//   Lecture.findOne({ title: "Library Skills" }).then(function(subtopics) {
//     subtopics.topics.map((subtopic, index) => {
//       if (String(subtopic._id) === req.body.topicid) {
//         if (!req.body.name) {
//           sendJSONresponse(res, 400, {
//             message: "Please fill all the required fields"
//           });
//           return;
//         }
//         subtopic.materials.push({
//           name: req.body.name,
//           material: req.body.material,
//           topicid: subtopic._id
//         });
//         subtopic.materials.map((material, index) => {
//           if (String(material._id)) {
//             material.quiz.push([
//               {
//                 question: req.body.question,
//                 correct_answer: req.body.correct_answer,
//                 answers: req.body.answers,
//                 materialid: material._id
//               }
//             ]);
//           }
//         });
//       }
//     });
//     subtopics.save().then(function(savedmaterial) {
//       res.send(savedmaterial);
//     });
//   });
// });

module.exports = router;
