const dotenv = require("dotenv");
const logger = require("../config/logger");
const User = require("../Models/User");
const UserMessages = require("../Models/UserMessages");
dotenv.config({ path: "../.env" });
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);
const { validationResult } = require("express-validator");

class ContactsController {
  static async validationError(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.errors[0].msg });
    }
  }

  static async sendOTP(req, res) {
    try {
      const { mobileNumber,userId,OTP } = req.body;
      
      // validators
      ContactsController.validationError(req, res);

      let message = await client.messages.create({
        body: `Hii.Your is:${OTP}.`,
        from: "+19382224891",
        to: `+91${mobileNumber}`,
      });

      await UserMessages.create({
        OTP,
        userId,
      });

      logger.info(message.sid);
      console.log(message.sid)

      return res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      logger.error(error);
      console.log(error);
      return res.status(400).json({
        error: {
          message: error.message,
        },
      });
    }
  }

  static async addContact(req, res) {
    try {
      const { firstName, lastName, mobileNumber } = req.body;

      // validators
      ContactsController.validationError(req, res);

      await User.create({ firstName, lastName, mobileNumber });

      return res.status(201).json({ message: "User added successfully" });
    } catch (error) {
      logger.error(error);
      console.log(error);
      return res.status(500).json({
        error: {
          message: error.message,
        },
      });
    }
  }

  static async listContacts(req, res) {
    try {
      let contacts = await User.find({}, { firstName: 1, lastName: 1 })
       
      return res.status(200).json({ contacts });
    } catch (error) {
      logger.error(error);
      console.log(error);
      return res.status(500).json({
        error: {
          message: error.message,
        },
      });
    }
  }

  static async getContactDetails(req, res) {
    try {
      const { userId } = req.query;

      // validators
      ContactsController.validationError(req, res);

      let contact = await User.findOne({ _id: userId });

      return res.status(200).json({ details: contact });
    } catch (error) {
      logger.error(error);
      console.log(error);
      return res.status(500).json({
        error: {
          message: error.message,
        },
      });
    }
  }

  static async listMessages(req, res) {
    try {
      let data = await UserMessages.aggregate([
        {
          $lookup: {
            from: "users",
            foreignField: "_id",
            localField: "userId",
            as: "users",
          },
        },
        {
          $project: {
            name: { $first: "$users.firstName" },
            lastName: { $first: "$users.lastName" },
            time: {
              $dateToString: {
                date: "$createdAt",
                format: "%Y-%m-%d %H:%M",
                timezone: "Asia/Kolkata",
                // onNull: <expression>
              },
            },
            OTP: "$OTP",
          },
        },
        { $sort: { time: -1 } },
      ])
      return res.status(200).json({ data });
    } catch (error) {
      logger.error(error);
      logger.error(error);
      console.log(error);
      return res.status(500).json({
        error: {
          message: error.message,
        },
      });
    }
  }
}

module.exports = ContactsController;
