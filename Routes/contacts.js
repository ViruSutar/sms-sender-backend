const express = require("express");
const router = express.Router();
const {
  sendOTP,
  addContact,
  listContacts,
  getContactDetails,
  listMessages,
} = require("../Controllers/ContactsController");
const { check } = require("express-validator");

router.post(
  "/sendOTP",
  [
    check("mobileNumber")
      .isLength({ min: 10, max: 10 })
      .isAlphanumeric()
      .withMessage("Invalid mobile number"),
    check("userId")
      .isString()
      .isLength({ min: 24, max: 24 })
      .withMessage("Invalid userId"),
    check("OTP")
      .isLength({ min: 6, max: 6 })
      .isAlphanumeric()
      .withMessage("Invalid mobile number"),
  ],
  sendOTP
);

router.post(
  "/add",
  [
    check("firstName")
      .isAlpha()
      .isLength({ min: 3 })
      .withMessage("Invalid first name"),
    check("lastName")
      .isAlpha()
      .isLength({ min: 3 })
      .withMessage("Invalid last name"),
    check("mobileNumber")
      .isLength({ min: 10, max: 10 })
      .withMessage("Invalid mobile number"),
  ],
  addContact
);

router.get("/list", listContacts);

router.get(
  "/getDetails",
  [
    check("userId")
      .isString()
      .notEmpty()
      .isLength({ min: 24, max: 24 })
      .withMessage("Invalid userId"),
  ],
  getContactDetails
);

router.get("/listMessages", listMessages);

module.exports = router;
