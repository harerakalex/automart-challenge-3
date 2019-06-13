const admin = (req, res, next) => {
  if (!req.userData.admin) return res.status(403).send({ status: 403, error: 'Unathorized access.' });
  next();
};

export default admin;