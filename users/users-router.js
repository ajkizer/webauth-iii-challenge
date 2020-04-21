const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");

router.get("/", restricted, (req, res) => {
  Users.find().then(users => {
    res.json(users);
  });
});

router.get("/mydepartment", restricted, (req, res) => {
  const department = req.decodedToken.department;
  console.log(department);
  if (department === "human resources" || department === "IT") {
    console.log("hello");
    Users.find()
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  } else {
    Users.findBy({ department })
      .then(users => {
        res.json(users);
      })
      .catch(err => res.send(err));
  }
});

module.exports = router;
