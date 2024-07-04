const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided.' });
    }
    try {
        const decoded = jwt.verify(token, 'super-secret-key');
        req.user = decoded; // Assumes token contains user_id
        next();
    } catch (ex) {
        res.status(400).json({ error: 'Invalid token.' });
    }
};

module.exports = authenticate;
