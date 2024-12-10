const jwt = require("jsonwebtoken");
const User = require("../user/user.model");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
  try {
    // Fetch user to verify existence
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw new Error("Token generation failed");
  }
};

module.exports = generateToken;
