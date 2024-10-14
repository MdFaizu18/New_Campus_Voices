
import userModel from "../models/userModel.js"
import { comparePassword, hassPassword } from '../utils/passwordUtils.js';
// Example for Node.js/Express with JWT

export const getCurrentUser = async (req, res) => {
    if (!req.user) {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    try {
        const user = await userModel.findOne({ _id: req.user.userId });
        res.status(200).json({ user: user });

    } catch (error) {
        res.status(500).json({ msg: 'error in current user', error })
    }
}

export const updateUser = async (req, res) => {
    const updatedUser = await userModel.findByIdAndUpdate(req.params.id, req.body,
        { new: true, });
    res.status(200).json({ msg: "user details modified...", updatedUser });
};

export const getUserRole = async (req, res) => {
    const { email: userEmail } = req.params;
    const user = await userModel.findOne({ email: userEmail });
    if (!user) {
        return res.status(404).json({ msg: `no user  with email ${userEmail} ` });
    }
    res.status(200).json({ user });
};

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword, password } = req.body;

    // Retrieve user from database
    const user = await userModel.findOne({ _id: req.user.userId });

    // Check if old password matches
    const isMatch = await comparePassword(oldPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: "Old password is incorrect" });
    }

    // Check if new password matches the confirmation
    if (newPassword !== password) {
        return res.status(400).json({ message: "New password and confirm password do not match" });
    }

    // Hash the new password
    const hashedPassword = await hassPassword(newPassword);

    // Update user's password
    try {
        await userModel.updateOne({ _id: req.user.userId }, { password: hashedPassword });
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        console.error("Error changing password:", error);
        res.status(500).json({ message: "An error occurred while changing password" });
    }
};

export const getUserById = async (req, res) => {
    const { password,userId } = req.body;
    

    try {
        // Hash the new password
        const hashedPassword = await hassPassword(password);

        // Update the user's password in the database
        await userModel.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).json({ msg: 'Password updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error updating password' });
    }
}