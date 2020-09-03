const { admin, db } = require('../util/admin');

const config = require('../util/config');
const { validationResult } = require('express-validator');

const firebase = require('firebase');
firebase.initializeApp(config);

exports.signup = (req, res) => {
  const noImg = 'no-img.png';

  const signUpUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let token, userId;

  db.doc(`/users/${signUpUser.handle}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return res.status(400).json({ handle: 'this handle is already taken' });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(signUpUser.email, signUpUser.password)
          .then(userData => {
            console.log('1');
            userId = userData.user.uid;
            return userData.user.getIdToken();
          })
          .then(idToken => {
            console.log('2');
            token = idToken;
            const credentials = {
              userId,
              handle: signUpUser.handle,
              email: signUpUser.email,
              createdAt: new Date().toISOString(),
              imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media&token=cbd64b32-8bfa-4e48-b37a-aa188bacd0bf`,
            };

            return db.doc(`/users/${signUpUser.handle}`).set(credentials);
          })
          .then(() => {
            return res.status(201).json({ token });
          });
      }
    })
    .catch(err => {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ email: 'Email is already in use' });
      } else {
        return res
          .status(500)
          .json({ general: 'Something went wrong, please try again' });
      }
    });
};

exports.login = (req, res) => {
  const user = {
    email: req.body.email,
    password: req.body.password,
  };

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  firebase
    .auth()
    .signInWithEmailAndPassword(user.email, user.password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      return res.json({ token });
    })
    .catch(err => {
      if (
        err.code === 'auth/wrong-password' ||
        err.code === 'auth/user-not-found'
      ) {
        return res
          .status(403)
          .json({ general: 'Wrong credentials, please try again' });
      } else {
        return res
          .status(500)
          .json({ general: 'Something went wrong, please try again' });
      }
    });
};
