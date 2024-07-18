import jwt from 'jsonwebtoken';

const SECRET_KEY = "rwrwknknrw";

const authMiddleware = (req, res, next) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized User" });
    }
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (e) {
        return res.status(500).json({ message: "Invalid Token" });
    }
};

export default authMiddleware;
