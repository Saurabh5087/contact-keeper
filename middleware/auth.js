import jwt from 'jsonwebtoken';
import config from 'config';

const auth = async (req, res, next) => {
  // Get the token from the header
  const token = req.header('x-auth-token');

  // Check if not token
  if(!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: 'Token is not valid' });
  }
}

export default auth;