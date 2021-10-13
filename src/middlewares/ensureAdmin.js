module.exports = (req, res, next) => {
  if (!req.is_admin)
    return res.status(403).json({ error: 'forbidden' });

  return next();
}