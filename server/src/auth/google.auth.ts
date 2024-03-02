import passport from "passport";
// var GoogleStrategy = require("passport-google-oauth20").Strategy;
import { Strategy as GoogleStrategy } from "passport-google-token";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Create a passport strategu for Google OAuth2
const what = passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      // callbackURL: "http://localhost:3000/auth/google/callback",
    },
    (accessToken, refreshToken, profile, done) => {
      // console.log({ message: "Strategy created", refreshToken });
      done(null, profile);
    },
    (error) => {
      console.log({ error });
    }
  )
);

// console.log({ what });

export default function authenticateGoogle(req, res) {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "google-token",
      { session: false },
      (err, data, info) => {
        if (err) {
          console.log({ err });
          reject(err);
        }
        // console.log({ message: "Authenticated", data });
        return resolve({ ...data });
      }
    )(req, res);
  });
}
