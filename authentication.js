import jwt from 'jsonwebtoken';
const secretKey = process.env['JWT_SECRET_KEY'];

/**
 * Web Tokens Handler for user authentication
 */
class Authenticator {
  /**
   * This is the verification that will be used for admins, it is strict and will boot a user from a page entirely
   * Ex: Admin panel
   */
  verifyHardToken(req, res, next) {
      const token = req.cookies.token;
      if (!token) {
          req.user = null;
          // TODO: DEFINE CORRECT PATH
          res.status(403).send('A token is required for authentication');
          return res.redirect('/'); // No token, redirect requests to login page
      }
      try {
          const decoded = jwt.verify(token, secretKey);
          req.user = decoded;
          next();
      } catch (err) {
          // TODO: DEFINE CORRECT PATH
          res.status(401).send('Invalid Token');
          return res.redirect('/') // Invalid token, redirect to login page
      }
  };

  /**
   * This is the user verification, it is just meant to block specific features from the page if they
   * are not logged in.
   * Ex: If a user is not logged in they shouldn't be able to favorite a song.
   */
  verifySoftToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
      req.user = null;
      return next();
    } 

    try {
      req.user = jwt.verify(token, secretKey);
    } catch (err) {
      console.log(`Error with token verification: ${err}`);
      req.user = null;
    }
    return next();
  }

  /**
   * This verification is for in-function calls. (ie login / create account)
   * It is not meant to be used as middleware
   */
  async verifyQuickToken(req, token) {
    if (!token) {
      req.user = null;
      throw new Error('A token is required for authentication');
    }

    try {
      req.user = jwt.verify(token, secretKey);
    } catch (err) {
      req.user = null;
      throw new Error('Invalid Token');
    }
  }

  /**
   * Generate an auth token for a newly logged in user
   */
  generateToken(user) {
      const token = jwt.sign({ id: user.UserID, username: user.Username },
          secretKey,
          { expiresIn: '72h' });
      return token;
  }
}

export default new Authenticator();