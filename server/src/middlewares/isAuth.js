import jwt from "jsonwebtoken";

function isAuth(req, res, next) {
    const { authorization } = req.headers;

    if (!authorization) {
        res.status(401);
        throw new Error('No token');
    }

    try {
        const token = authorization.split(' ')[1];
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
        req.user = payload;
    } catch (err) {
        res.status(401);
        if (err.name === 'TokenExpiredError') {
            throw new Error(err.name);
        }
        console.log(err);
        throw new Error('Unauthorized');
    }

    return next();
}

export default isAuth