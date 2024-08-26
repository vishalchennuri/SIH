// farmerController.js
const bcrypt = require("bcryptjs");
const dotEnv = require("dotenv");
const jwt = require('jsonwebtoken')
const Farmer = require("../models/Farmer");

dotEnv.config()

const secretKey = process.env.JKEY;


// Farmer registration controller
const farmerRegister = async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  try {
    // Check if the email is already taken
    const existingFarmerByEmail = await Farmer.findOne({ email });
    if (existingFarmerByEmail) {
      return res.status(400).json("Email already taken");
    }

    // Check if the phone number is already taken
    const existingFarmerByPhoneNumber = await Farmer.findOne({ phoneNumber });
    if (existingFarmerByPhoneNumber) {
      return res.status(400).json("Phone number already taken");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Farmer
    const newFarmer = new Farmer({
      username,
      email,
      phoneNumber, // Include phoneNumber in the new Farmer object
      password: hashedPassword,
    });

    // Save the new farmer in the database
    await newFarmer.save();

    // Send success response
    res.status(201).json({ message: "Farmer registered successfully" });
    console.log("Farmer registered");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const farmerLogin = async (req, res) => {
    const { phoneNumberOrEmail, password } = req.body;

    try {
        // Find farmer by phone number or email
        const farmer = await Farmer.findOne({
            $or: [{ phoneNumber: phoneNumberOrEmail }, { email: phoneNumberOrEmail }]
        });

        if (!farmer || !(await bcrypt.compare(password, farmer.password))) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ farmerId: farmer._id }, secretKey, { expiresIn: "1h" });
        res.status(200).json({ success: "Login Successful", token });
        console.log(`${farmer.email} logged in. Token: ${token}`);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

module.exports = { farmerRegister,farmerLogin };
