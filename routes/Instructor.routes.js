const router = require("express").Router();
let { getTeachers } = require("../data");

router.get("/instructors", (req, res, next) => {
  // Consuming a promise here
  getTeachers()
    .then((teachers) => {
      res.render("instructors.hbs", { instructors: teachers, layout: false });
    })
    .catch(() => {
      next("Instructors failed to fetch");
      // next with parameter runs the next available error handling middleware
      // next without parameter runs the next available middleware
    });
});

module.exports = router;
