export { };
const { User } = require('./../models/user');

const auth = (req: any, res: any, next: any) => {
  const token = req.cookies.auth;

  User.findByToken(token, (err: any, user: any) => {
    if (err) throw err;
    if (!user) {
      return res.json({
        error: true
      });
    }

    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
