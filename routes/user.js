const {
  verifyTokenAndAuth,
  verifyToken,
  adminVerifyToken,
} = require("./verifyToken");
const router = require("express").Router();
const User = require("../models/user");

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("user/:id", adminVerifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const userInfo = user._doc;
    res.status(200).json(userInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", adminVerifyToken, async (req, res) => {
  const query = req.query.last3;
  try {
    const user = query
      ? await User.find().sort({ _id: -1 }).limit(3)
      : await User.find();

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/stats", adminVerifyToken, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    
  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: { $gte:lastYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
