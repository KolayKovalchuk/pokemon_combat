import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET;

const authMiddleware = (req, res, next) => {
  // Get token from Authorization header
  const token = req.headers['authorization']?.split(' ')[1];

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      req.user = decoded; // Attach decoded user info to request
      next();
    });
  } else {
    res.status(401).json({ error: 'No token provided' });
  }
};

export default authMiddleware;
