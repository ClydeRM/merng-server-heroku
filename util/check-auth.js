const { AuthenticationError } = require("apollo-server");

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

// 解析express req 封包
module.exports = (context) => {
  // context = {...headers,...body}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // 解析authorization欄位拿token 在 Bearer .... (格式: Bearer空token)
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY); // 驗證token
        return user;
      } catch (error) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
