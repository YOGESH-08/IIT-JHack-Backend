import {db} from '../firebase.js';

const collection = db.collection('universities');

// POST /universities
export const createUniversity = async (req, res) => {
  try {
    const uni = req.body;

    if (!uni.id || !uni.name || !uni.location) {
      return res.status(400).json({
        status: 'fail',
        message: 'id, name, and location are required'
      });
    }

    const doc = await collection.doc(String(uni.id)).get();
    if (doc.exists) {
      return res.status(409).json({
        status: 'fail',
        message: 'University with this id already exists'
      });
    }

    await collection.doc(String(uni.id)).set(uni);

    return res.status(201).json({
      status: 'success',
      message: 'University created successfully',
      data: uni
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: err.message
    });
  }
};

// GET /universities
export const getUniversities = async (req, res) => {
  try {
    const snapshot = await collection.get();
    const universities = snapshot.docs.map(doc => doc.data());

    return res.status(200).json({
      status: 'success',
      data: universities
    });
  } catch (err) {
    return res.status(500).json({
      status: 'error',
      message: 'Server error',
      error: err.message
    });
  }
};