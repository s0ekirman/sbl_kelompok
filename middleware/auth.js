const jwt = require('jsonwebtoken');

const SECRET_KEY = 'secret123';

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

function login(req, res) {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Login gagal' });
    }
}

module.exports = { authenticateToken, login };
