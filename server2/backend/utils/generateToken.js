import jwt from 'jsonwebtoken';

export const generateToken = (res, name) => {
  console.log("generateToken called with name:", name);
  
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not set in environment variables");
    return null;
  }

  const token = jwt.sign({ name }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });

  console.log("JWT Token generated:", token);

  try {
    res.cookie("jwtAdmin", token, {
      httpOnly: true,
      secure: false, 
      sameSite: "lax",
      maxAge: 365 * 24 * 60 * 60 * 1000, 
      path: "/"
    });

    console.log("Cookie settings:", {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    const cookies = res.getHeader('Set-Cookie');
    if (cookies) {
      console.log("Set-Cookie header:", cookies);
    } else {
      console.log("Set-Cookie header not found");
    }

    console.log("Cookie set successfully");
  } catch (error) {
    console.error("Error setting cookie:", error);
  }
  
  return token;
};
