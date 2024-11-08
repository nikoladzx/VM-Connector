import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import client from '../config/client.js';

const protect = asyncHandler(async (req, res, next) => {
  console.log("Middleware is running");
  const token = req.cookies.jwtAdmin;

  console.log("Token:", req);

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Token verified", decoded);

    // LDAP search with proper promise handling
    const searchLDAP = () => {
      return new Promise((resolve, reject) => {
        client.search(
          'ou=admins,dc=diplomski,dc=com', 
          {
            filter: `(uid=${decoded.name})`,
            scope: 'one',
            attributes: ['uid', 'userPassword']
          },
          (err, res) => {
            if (err) {
              console.error('LDAP search error:', err);
              reject(err);
              return;
            }

            let entries = [];

            res.on('searchEntry', (entry) => {
              entries.push(entry.object);
            });

            res.on('error', (err) => {
              console.error('LDAP search error:', err);
              reject(err);
            });

            res.on('end', (result) => {
              resolve(entries);
            });
          }
        );
      });
    };

    try {
      const searchResults = await searchLDAP();
      
      if (searchResults.length > 0) {
        req.user = searchResults[0];
        console.log("User authenticated, proceeding to next middleware");
        next();
      } else {
        res.status(401);
        throw new Error('Not authorized, user does not exist in LDAP');
      }
    } catch (ldapError) {
      console.error("LDAP search error:", ldapError);
      res.status(500);
      throw new Error('LDAP search failed');
    }

  } catch (error) {
    console.error("Error in protect middleware:", error);
    res.status(401);
    throw new Error('Not authorized, token failed');
  }
});

export { protect };