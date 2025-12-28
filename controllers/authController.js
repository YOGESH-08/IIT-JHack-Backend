  // routes/auth.js
  import {admin,db} from "../firebase.js";

  export const googleAuthController = async (req, res) => {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        message: "ID token is required",
      });
    }

    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);

      const {
        uid,
        email,
        name: displayName,
        picture: photoURL,
      } = decodedToken;

      const userRef = db.collection("users").doc(uid);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        const username = `student_${uid.slice(0, 6)}`;

        await userRef.set({
          uid,
          email,
          username,
          displayName,
          photoURL,
          role: "student",

          basicProfileCompleted: false,
          bioCompleted: false,

          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        return res.status(200).json({
          status: "NEW_USER",
          uid,
          profileCompleted: false,
        });
      }

      const userData = userSnap.data();

      return res.status(200).json({
        status: "EXISTING_USER",
        uid,
        profileCompleted: userData.basicProfileCompleted === true,
      });

    } catch (error) {
      console.error("Google Auth Error:", error);
      return res.status(401).json({
        message: "Invalid or expired ID token",
      });
    }
  };
  export const logout = async (req, res) => {
    try {
      res.clearCookie("session", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
      });
      res.clearCookie("session_exists", {
        secure: true,
        sameSite: "strict",
      });

      return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
      return res.status(500).json({ error: "Logout failed" });
    }
  };
