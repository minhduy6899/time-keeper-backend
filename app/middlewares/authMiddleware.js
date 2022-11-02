
const jwt = require('jsonwebtoken')
const firebase = require("../../firebase/admin");

function authMiddleware(req, res, next) {
  const headerToken = req.headers.authorization;
  if (!headerToken) {
    return res.status(401).send({ message: "No token provided" });
  }

  if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
    return res.status(401).send({ message: "Invalid token" });
  }

  const token = headerToken.split(" ")[1];

  firebase
    .auth()
    .verifyIdToken(token)
    .then(async () => {
      // Validate user on database
      req.user = await User.findById(decodedData.id)
      next()
    })
    .catch(() => res.status(403).send({ message: "Could not authorize" }));
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


const isAuthenticatedUser = async (req, res, next) => {
  const headerToken = req.headers.authorization;

  if (!headerToken) {
    return next(new ErrorHandler("Please Login for access this resource", 401));
  }

  const token = headerToken.split(" ")[1];

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decodedData.id);

  next();
};

// Admin Roles
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`${req.user.role} can not access this resources`));
    };
    next();
  }
}

module.exports = { authMiddleware, verifyToken, isAuthenticatedUser, authorizeRoles };
