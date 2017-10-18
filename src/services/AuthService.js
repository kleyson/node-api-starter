const { generateToken, secret } = require('../helpers/jwtHandler');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');

const User = require('../models/User');

const provideToken = (req, res) => {
  res.send({
    token: generateToken(req.user),
    user: req.user.name,
    email: req.user.email,
  });
};

const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user) return done(null, false);
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (!isMatch) return done(null, false);
        return done(null, user);
      });
    } catch (err) {
      done(err);
    }
  },
);

const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: secret,
  },
  async (payload, done) => {
    try {
      const user = User.findById(payload.sub);
      if (user) {
        done(null, user);
      } else {
        done(null, false);
      }
    } catch (err) {
      done(err, false);
    }
  },
);

passport.use(localStrategy);
passport.use(jwtStrategy);

const loginAuth = passport.authenticate('local', { session: false });
const jwtAuth = passport.authenticate('jwt', { session: false });

module.exports = { provideToken, loginAuth, jwtAuth };
