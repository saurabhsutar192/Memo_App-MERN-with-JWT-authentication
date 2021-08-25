require("dotenv").config();
const express = require("express");

const cors = require("cors");
const mongoose = require("mongoose");
const Memo = require("./models/Memo");
const User = require("./models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
mongoose.connect("mongodb://127.0.0.1:27017/memo", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Mongodb connection established successfully");
});

const PORT = process.env.PORT || 4000;
const SECRET = process.env.SECRET;
const app = express();

app.use(cors());
app.use(express.json());

function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.json({ message: "No token found!" });
  } else {
    jwt.verify(token, SECRET, (err, decoded) => {
      if (err) {
        res.status(404).json({ message: "Token not verified" });
      } else {
        req.userId = decoded.id;
        console.log("token verified");
        next();
      }
    });
  }
}

app.get("/:auth", verifyJWT, (req, res) => {
  const auth = req.params.auth;
  Memo.find({ author: auth }, (err, memos) => {
    if (err) {
      res.status(404).json({ message: err.message });
    } else {
      res.status(200).json(memos);
    }
  }).catch((err) => {
    res.status(404).json({ message: err.message });
  });
});

app.post("/", verifyJWT, (req, res) => {
  const memo = new Memo(req.body);
  memo
    .save()
    .then((memo) => {
      console.log(memo);
      res.status(200).json({ message: "added" });
    })
    .catch((err) => {
      res.status(404).json({ message: err.message });
    });
});

app.delete("/:id", verifyJWT, (req, res) => {
  const id = req.params.id;

  Memo.deleteOne({ _id: id }, function () {
    console.log("Deleted " + id);
    Memo.find((err, memos) => {
      if (err) {
        res.status(404).json({ message: err.message });
      } else {
        console.log(memos);
        res.status(200).json({ message: "deleted" });
      }
    });
  });
});

app.patch("/:id", verifyJWT, (req, res) => {
  const id = req.params.id;

  Memo.updateOne({ _id: id }, { text: req.body.text }, function () {
    Memo.find((err, memos) => {
      if (err) {
        res.status(404).json({ message: err.message });
      } else {
        console.log(memos);
        res.status(200).json({ message: "edited" });
      }
    });
  });
});

app.post("/register", async (req, res) => {
  let { name, email, password } = req.body.user;
  let encPass = await bcrypt.hash(password, 12);
  let user = new User({ name, email, password: encPass });
  let oldUser = await User.findOne({ email: email });
  let token;
  if (oldUser) {
    res.status(400).json({ message: "User already exists!" });
  } else {
    user
      .save()
      .then((user) => {
        token = jwt.sign({ email: user.email, id: user._id }, SECRET);
        res.status(200).json({ user, token });
      })
      .catch((err) => {
        res.status(404).json({ message: err.message });
      });
  }
});

app.post("/login", (req, res) => {
  let { email, password } = req.body.user;
  let token;

  User.findOne({ email })
    .then(async (result) => {
      let isPasswordCorrect = await bcrypt.compare(password, result.password);
      if (isPasswordCorrect) {
        token = jwt.sign({ email: result.email, id: result._id }, SECRET);
        res.status(200).json({ result, token: token });
      } else {
        res.status(400).json({ message: "Password Incorrect!" });
      }
    })
    .catch((err) => {
      res.status(404).json({ message: "User Not found!" });
    });
});

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
