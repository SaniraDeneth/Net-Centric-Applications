const eventEmitter = require('./emitters');
const Notification = require('../models/Notification');
const Follower = require('../models/Follower');
const { emitToUser } = require('../socket/socketManager');

const saveAndEmit = async (userId, message) => {
  const notif = await Notification.create({ userId, message });
  emitToUser(userId.toString(), 'notification', notif.toJSON());
  return notif;
};

const initEventListeners = () => {
  // ── Project Liked ──────────────────────────────────────────────────────────
  eventEmitter.on('ProjectLiked', async ({ project, likerUser, action }) => {
    try {
      if (action !== 'liked') return;
      const ownerId = project.studentId._id || project.studentId;
      const likerId = likerUser._id || likerUser.id;

      if (ownerId.toString() !== likerId.toString()) {
        await saveAndEmit(
          ownerId,
          `${likerUser.name} liked your project: "${project.title}"`
        );
      }
    } catch (error) {
      console.error('Error in ProjectLiked listener:', error);
    }
  });

  // ── Student Followed ───────────────────────────────────────────────────────
  eventEmitter.on('StudentFollowed', async ({ student, recruiterUser }) => {
    try {
      await saveAndEmit(
        student._id || student.id,
        `${recruiterUser.name} is now following your profile`
      );
    } catch (error) {
      console.error('Error in StudentFollowed listener:', error);
    }
  });

  // ── Project Made Public ────────────────────────────────────────────────────
  eventEmitter.on('ProjectMadePublic', async ({ project, adminUser }) => {
    try {
      const studentId = project.studentId._id || project.studentId;

      // 1. Notify the student that their project was approved
      await saveAndEmit(
        studentId,
        `Your project "${project.title}" has been approved and is now public!`
      );

      // 2. Notify all recruiters who follow this student
      const followers = await Follower.find({ studentId });
      for (const follow of followers) {
        await saveAndEmit(
          follow.recruiterId,
          `${project.studentId?.name || 'A student'} published a new project: "${project.title}"`
        );
      }
    } catch (error) {
      console.error('Error in ProjectMadePublic listener:', error);
    }
  });

  // ── Project Created (legacy — kept for internal logging) ──────────────────
  eventEmitter.on('ProjectCreated', async ({ project, user }) => {
    // Project starts private — no notifications sent yet.
    // Notifications are sent when admin makes it public via ProjectMadePublic.
    console.log(`[Event] ProjectCreated: "${project.title}" by ${user.name} (private)`);
  });
};

module.exports = initEventListeners;
