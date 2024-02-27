const passport = require("passport");
// var GoogleStrategy = require("passport-google-oauth20").Strategy;
var GoogleStrategy = require("passport-google-token").Strategy;

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Create a passport strategu for Google OAuth2
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      // callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      console.log({ accessToken, refreshToken, profile });
      done(null, profile);
    },
    (error) => {
      console.log({ error });
    }
  )
);

const authenticateGoogle = (req, res) =>
  new Promise((resolve, reject) => {
    passport
      .authenticate(
        "token",
        {
          // scope: [ 'email', 'profile' ],
          accessType: "offline",
          session: false,
          prompt: "consent",
        },
        (err, data, info) => {
          if (err) {
            reject(err);
          }
          resolve({ data, info });
        }
      )(req, res)
      .then((response) => {
        console.log({ response });
      })
      .catch((error) => {
        console.log({ error });
      });
  });

module.exports = authenticateGoogle;
