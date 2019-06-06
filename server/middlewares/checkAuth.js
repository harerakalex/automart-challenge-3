import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  try {
    // take token from headers
    const token = req.headers.authorization;
    if (!token || token === '') 
      return res.status(401).json({ status: 401, error: 'Unauthorized' });

    const decode = jwt.verify(token, 'automart-key');
    req.userData = decode;
    next();
  } catch {
    return res.status(401).json({ status: 401, error: 'Invalid token' });
  }
  return false;
};

export default checkAuth;