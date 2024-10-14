import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import expressAsyncHandler from 'express-async-handler';
import nodemailer from 'nodemailer';
import User from '../models/userModel.js';  // Adjust the path to your User model
import * as dotenv from 'dotenv';
import { hassPassword } from '../utils/passwordUtils.js';
dotenv.config();

console.log('SMTP_USER:', process.env.SMTP_USER);
console.log('SMTP_PASS:', process.env.SMTP_PASS ? '[REDACTED]' : 'undefined');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? '[REDACTED]' : 'undefined');

// Configure Nodemailer transporter
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "mohammedfaizulla17@gmail.com",
        pass: process.env.SMTP_PASS,
    },
});

// Generate JWT for Reset Password
const generateResetToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

// Forgot Password Controller
export const forgotPassword = expressAsyncHandler(async (req, res) => {
    const { email } = req.body;
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
        // For security reasons, don't reveal if the email exists or not
        return res.status(200).json({ message: 'If a user with this email exists, a password reset link has been sent.' });
    }

    // Generate a reset token and store it in the database
    const resetToken = generateResetToken(user._id);

    // Store the hashed token in the database
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
    await user.save({ validateBeforeSave: false });

    // Create reset URL
    // const resetURL = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;

    // Configure email options
    const mailOptions = {
        from: process.env.SMTP_USER,
        to: email,
        subject: 'Password Reset Request',
        text: `You are receiving this because you (or someone else) requested the reset of the password for your account.\n\n
           Please click on the following link, or paste this into your browser to complete the process:\n\n
           ${resetURL}\n\n
           If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    // Send email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: 'If a user with this email exists, a password reset link has been sent.' });
    } catch (error) {
        console.error('Error sending email:', error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({ validateBeforeSave: false });
        res.status(500).json({ message: 'Error sending the email. Please try again later.' });
    }
});

export const resetPassword = expressAsyncHandler(async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    // Hash the token
    const resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');

    try {
        // Find user by token and check if it's expired
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Hash the new password and update the user's password
        user.password = await hassPassword(password);

        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error) {
        console.error('Error resetting password:', error);
        res.status(400).json({ message: 'Error resetting password' });
    }
});

// // Test email function
// export const testEmail = expressAsyncHandler(async (req, res) => {
//     try {
//         let info = await transporter.sendMail({
//             from: process.env.SMTP_USER,
//             to: process.env.SMTP_USER, // sending to yourself for testing
//             subject: "Test Email",
//             text: "If you receive this, the email configuration is working.",
//         });
//         console.log("Test email sent: %s", info.messageId);
//         res.status(200).json({ message: 'Test email sent successfully' });
//     } catch (error) {
//         console.error("Error sending test email:", error);
//         res.status(500).json({ message: 'Error sending test email' });
//     }
// });