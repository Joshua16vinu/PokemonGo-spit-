const { usersRef } = require("./firebase");

// Function to create a new user
const createUser = async (email, name) => {
  try {
    await usersRef.doc(email).set({
      email,
      name,
      credibilityScore: 0,
      reportsSubmitted: 0,
      createdAt: new Date().toISOString(),
    });
    return { success: true, message: "User created successfully" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Function to update credibility score
const updateCredibility = async (email, increment) => {
  try {
    await usersRef.doc(email).update({
      credibilityScore: admin.firestore.FieldValue.increment(increment),
      reportsSubmitted: admin.firestore.FieldValue.increment(1),
    });
    return { success: true, message: "Credibility updated" };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports = { createUser, updateCredibility };
