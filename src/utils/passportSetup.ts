import passport from 'passport'
import FacebookStrategy from 'passport-facebook'

import UserModel from '../models/UserModel'

const passportSetup = () => {
  // serialize the user.id to save in the cookie session
  // so the browser will remember the user when login
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  // deserialize the cookieUserId
  passport.deserializeUser((user: any, done) => {
    done(null, user)
  });

  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL: '/auth/facebook/redirect'
  }, async (accessToken: any, refreshToken: any, profile: any, cb: any) => {
      const currentUser = await UserModel.findOne({
        facebookId: profile.id
      });

      // If user not exist, create
      if(!currentUser) {
        const newUserModel = new UserModel({
          fullName: profile.displayName,
          facebookId: profile.id,
          active: 1,
        }).save()

        if (newUserModel) {
          return cb(null, newUserModel);
        }
      }
      return cb(null, currentUser);
    }
  ));
}

export default passportSetup

