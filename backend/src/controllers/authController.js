const userModel = require("../model/userModel");

const registerController = async (req, res) => {
    try {
        const { userName, email, password } = req.body;

        // Validate required fields
        if (!userName || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide all required information"
            }); 
        }

        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "Email already registered. Please login.",
            });
        }

        // Create new user with plain text password
        const user = await userModel.create({
            userName,
            email,
            password, // Directly storing plain text password (not recommended)
        });

        // Send success response
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        console.error("Error in register API:", error);
        res.status(500).send({
            success: false,
            message: "Error in register API",
            error: error.message || error
        });
    }
};

// Login Controller
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Please provide email and password",
            });
        }

        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false, 
                message: "User not found",
            });
        }

        // Compare plain text passwords (direct comparison)
        if (user.password !== password) {
            return res.status(401).send({
                success: false,
                message: "Invalid credentials",
            });
        }

        // Remove password from response
        user.password = undefined;

        res.status(200).send({
            success: true,
            message: "Login successful",
            user,
        });
    } catch (error) {
        console.error("Error in login API:", error);
        res.status(500).send({
            success: false,
            message: "Error in login API",
            error: error.message || error
        });
    }
};

module.exports = { registerController, loginController };
