import { admin, db } from "../firebase.js";

export const getProfile = async (req, res) => {
  const { uid } = req.params;
  if (!uid) return res.status(400).json({ message: "UID is required" });

  try {
    const userRef = db.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists)
      return res.status(404).json({ message: "User not found" });

    return res.status(200).json({ uid, ...userSnap.data() });
  } catch (error) {
    console.error("Get Profile Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateProfile = async (req, res) => {
  const { uid } = req.params;
  if (!uid) return res.status(400).json({ message: "UID is required" });

  const allowedFields = [
    "displayName",
    "bio",
    "username",
    "photoURL",
    "mobile",
    "basicProfileCompleted",
    "bioCompleted",
  ];

  const updates = {};
  for (const key of allowedFields) {
    if (Object.prototype.hasOwnProperty.call(req.body, key)) {
      updates[key] = req.body[key];
    }
  }

  if (Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ message: "No valid fields provided for update" });
  }

  updates.updatedAt = admin.firestore.FieldValue.serverTimestamp();

  try {
    const userRef = db.collection("users").doc(uid);
    const userSnap = await userRef.get();

    if (!userSnap.exists)
      return res.status(404).json({ message: "User not found" });

    await userRef.update(updates);
    const updatedSnap = await userRef.get();

    return res.status(200).json({ uid, ...updatedSnap.data() });
  } catch (error) {
    console.error("Update Profile Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
