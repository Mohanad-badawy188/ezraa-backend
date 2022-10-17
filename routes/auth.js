const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const saltRounds = 10;
const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, async function (err, hash) {
      const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });
      try {
        const saveduser = await user.save();

        res.status(201).json(saveduser);
      } catch (err) {
        res.status(500).json(err);
      }
    });
  });
});
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }, function (err, foundUser) {
    try {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result === true) {
            const accessToken = jwt.sign(
              {
                id: foundUser.id,
                isAdmin: foundUser.isAdmin,
              },
              process.env.JWT_SEC,
              { expiresIn: "2d" }
            );
            res.status(200).json({ ...foundUser._doc, accessToken });
          } else if (result !== true) {
            res.status(401).json("wrong password !");
          }
        });
      } else {
        res.status(404).json("user not found !");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
