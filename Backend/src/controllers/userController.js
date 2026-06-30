const User = require('../models/User');
const Project = require('../models/Project');

const getAllUsers = async (req, res) => {
  try {
    const { search, role, isVerified } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }

    if (role) {
      query.role = role;
    }

    if (isVerified !== undefined) {
      query.isVerified = isVerified === 'true';
    }

    const users = await User.find(query).sort({ createdAt: -1 });
    return res.status(200).json({
      count: users.length,
      users
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const { role, isVerified } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (role) {
      const validRoles = ['Student', 'Recruiter', 'Admin'];
      if (!validRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
      user.role = role;
    }

    if (isVerified !== undefined) {
      user.isVerified = isVerified;
    }

    await user.save();
    return res.status(200).json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete all projects created by this user
    await Project.deleteMany({ studentId: user._id });
    await user.deleteOne();

    return res.status(200).json({
      message: 'User and their associated projects deleted successfully',
      id: req.params.id
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser
};
