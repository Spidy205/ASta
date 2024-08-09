const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const express = require('express');

const app = express();

const GOOGLE_CLIENT_ID = 'your-google-client-id';
const GOOGLE_CLIENT_SECRET = 'your-google-client-secret';

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Verify the user's identity and grant access to your website
    // ...
    done(null, profile);
}));

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile']
}));

app.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // Redirect the user to your website
    // ...
    res.redirect('/');
});

app.listen(3000, () => {
    console.log('Server started on port 5501');
});