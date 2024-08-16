import express from 'express'
import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

import { verifyMessage } from 'ethers';

const router = express.Router();

// User Model
const userSchema = new mongoose.Schema({
  address: { type: String, unique: true },
});

const User = mongoose.model('User', userSchema);

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET;

// Generate Nonce
router.get('/api/auth/nonce', (req, res) => {
  const nonce = crypto.randomBytes(16).toString('hex');
  res.json({ nonce });
});

// Login Route
router.post('/api/auth/login', async (req, res) => {
  const { address, signature, nonce } = req.body;

  console.log('address', address)
  console.log('signature', signature)
  console.log('nonce', nonce)

  try {
    // Verify signature
    const recoveredAddress = verifyMessage(nonce, signature);

    console.log('recoveredAddress', recoveredAddress)

    if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    let user = await User.findOne({ address });

    console.log('user', user)

    if (!user) {
      user = new User({ address });
      await user.save();
    }

    const token = jwt.sign({ address: user.address }, JWT_SECRET, { expiresIn: '1h' });
    console.log('token', token)

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router
