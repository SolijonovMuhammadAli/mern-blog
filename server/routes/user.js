const mongoose = require("mongoose");
const express = require("express");

const router = express.Router();
const userSchema = require("../models/Users");

// CREATE User
router.route("/create").post(async (req, res, next) => {
  await userSchema
    .create(req.body)
    .then((result) => {
      res.json({
        // data: result,
        message: "Data successfully added!",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// READ Users
router.route("/").get(async (req, res, next) => {
  await userSchema
    .find()
    .then((result) => {
      res.json({
        data: result,
        message: "All items successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});
// Get Single User
router.route("/:id").get(async (req, res, next) => {
  await userSchema
    .findById(req.params.id)
    .then((result) => {
      res.json({
        data: result,
        message: "Data successfully fetched.",
        status: 200,
      });
    })
    .catch((err) => {
      return next(err);
    });
});

// Update User
router.route("/:id").put(async (req, res, next) => {
  await userSchema
    .findByIdAndUpdate(req.params.id, {
      $set: req.body,
    })
    .then((result) => {
      res.json({
        data: result,
        msg: "Data successfully updated.",
        status: 200,
      });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
});

// Delete User
router.route("/:id").delete(async (req, res, next) => {
  await userSchema
    .findByIdAndRemove(req.params.id)
    .then(() => {
      res.json({
        msg: "Data successfully updated.",
      });
    })
    .catch((err) => {
      console.log(err);
      return next(err);
    });
});

module.exports = router;
