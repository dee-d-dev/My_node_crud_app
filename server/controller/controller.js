let userdb = require("../model/model");

//create and save new user
exports.create = (req, res) => {
  //validate request
  //if request doesnt have a body i.e empty
  if (!req.body) {
    res.staus(400).send({ message: "body cannot be empty" });
    return;
  }

  //new user
  const user = new userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  //save user in database
  user
    .save(user)
    .then((data) => {
      // res.send(data);
      res.redirect('/add-user')
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "error occured while creating a create operation",
      });
      console.log(err);
    });
};

//find users, return users/ find a user, return a user either with an id
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    userdb
      .findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `no user with ${id} found` });
        } else {
          res.send(data);
        }
      })
      .catch((err) => {
        res.status(500).send({ message: `there is ${err}` });
      });
  } else {
    userdb
      .find()
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "error occurred while retriving user info",
        });
      });
  }
};

//update a new user with user id
exports.update = (req, res) => {
  //validation to check if the body of item is empty or not
  if (!req.body) {
    return res.status(400).send("request body cannot be empty");
  }
  const id = req.params.id;

  userdb
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send(`we cannot find user with ${id} `);
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Error update user information" });
    });
};

//delete a new user with user id
exports.delete = (req, res) => {
  const id = req.params.id;

  userdb
    .findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `cannot delete with id ${id}` });
      } else {
        res.send({ message: `user was deleted successfully` });
      }
    })
    .catch((err) => {
      res.status(500).send(`${id} has this ${err.message}`);
    });
};
