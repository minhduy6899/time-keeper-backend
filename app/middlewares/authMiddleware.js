
const jwt = require('jsonwebtoken')
const firebase = require("../../firebase/admin");

function authMiddleware(request, response, next) {
  const headerToken = request.headers.authorization;
  if (!headerToken) {
    return response.status(401).send({ message: "No token provided" });
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return response.status(401).send({ message: "Invalid token" });
  }

  const token = headerToken.split(" ")[1];

  firebase
    .auth()
    .verifyIdToken(token)
    .then(() => {
      // Validate user on database

      next()
    })
    .catch(() => response.status(403).send({ message: "Could not authorize" }));
}

const verifyToken = (req, res, next) => {
  const authHeader = req.header('Authorization')
  const token = authHeader && authHeader.split(' ')[1]

  if (!token)
    return res
      .status(401)
      .json({ success: false, message: 'Access token not found' })

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

    req.userId = decoded.userId
    next()
  } catch (error) {
    console.log(error)
    return res.status(403).json({ success: false, message: 'Invalid token' })
  }
}

module.exports = { authMiddleware, verifyToken };
