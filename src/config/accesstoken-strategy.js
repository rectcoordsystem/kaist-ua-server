"use strict";

const passport = require("passport");
const TokenStrategy = require("passport-accesstoken").Strategy;
const models = require("../database/models");

passport.use(
  new TokenStrategy(async (access_token, done) => {
    try {
      const admin = await models.admin.findOne({
        where: {
          access_token,
        },
      });
      if (!admin)
        return done(null, false, {
          message: "this access token does not exist",
        });
      done(null, admin);
    } catch (err) {
      return done(err);
    }
  })
);
