import jwt from "jsonwebtoken";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const token = authHeader.split(" ")[1]; 
    console.log("Checking bearer token:", token);

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Error in decoding token" });
    }

    req.user = decoded;
    
    next();
  } catch (error) {
    console.log("Error in isAuthenticated:", error);
    return res.status(401).json({ message: "Invalid token" });
  }
};


// import jwt from "jsonwebtoken";

// export const isAuthenticated = (req, res, next) => {
//   try {
//     const token = req.body.jwt_token;

//     if (!token) {
//       return res.status(401).json({ message: "User not authenticated" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_KEY);
//     if (!decoded) {
//       return res.status(401).json({ message: "Error in decoding token" });
//     }

//     req.user = decoded; // Optional: store user info for later use
//     next();
//   } catch (error) {
//     console.log("Error in isAuthenticated:", error.message);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };
