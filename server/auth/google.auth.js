import passport from "passport"; 
import { Strategy } from "passport";

const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET; 

// Create a passport strategu for Google OAuth2
passport.use(
  new Strategy({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
  }, (accessToken, refreshToken, profile, done) => {
    done(null, profile);
  })
);

export const authenticateGoogle = (req, res) => new Promise(
  (resolve, reject) => {
    passport.authenticate(
      'google-token', 
      { session: false }, 
      (err, data, info) => {
        if(err) reject(err);
        resolve({ data, info});
      }
    )(req, res);
  }
)