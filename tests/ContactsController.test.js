const request = require('supertest');
const app = require('../app');
const UserMessages = require('../models/UserMessages');
const connectDb = require("../config/db")
const dotenv = require('dotenv')
dotenv.config({ path: "./test.env" });
const mongoUrl = process.env.MONGO_URL;

beforeEach(async () => {
  await connectDb(mongoUrl);
});


describe('Contacts Controller', () => {
  describe('POST /sendOTP', () => {
    it('should send OTP successfully', async () => {
      const response = await request(app)
        .post('/api/contacts/sendOTP')
        .send({
          mobileNumber: '9768465336',
          userId: '63ee5ac4a2c0c3f5a1f5d9fa',
          OTP: 456789,
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message', 'OTP sent successfully');
    });

    it('should return 400 with error message for invalid mobile number', async () => {
      const response = await request(app)
        .post('/api/contacts/sendOTP')
        .send({
          mobileNumber: '12345',
          userId: '63ee5ac4a2c0c3f5a1f5d9fa',
          OTP: '123456',
        });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty(
        'errors',
        'Invalid value'
      );
    });
  });
});
