const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth')

const cors = require('cors');
app.use(cors());
const {body,check} = require('express-validator')


const {
  signup,
  signin,
  uploadImage,
  getAuthenticatedUser
} = require('./handlers/users');

const {
  addComment
} = require('./handlers/games');


// users routes
app.post('/signup', [
  body('email').exists().withMessage('Email required').isEmail().withMessage('Not a valid email').normalizeEmail(),
  body('password').exists().withMessage('Password required').isLength({min: 7}).withMessage('Should be longer than 7 char'),
  check('passwordConfirmation', 'Password confirmation field must have the same value as the password field')
  .exists()
  .custom((value, {req}) => value === req.body.password),
  body('handle').exists().withMessage('You should provide a handle')

], signup);
app.post('/signin',[
  body('email').exists().withMessage('Email required').bail().isEmail().withMessage('Not a valid email').normalizeEmail(),
  body('password').exists().withMessage('Password required'),
] ,signin);
app.post('/user/image' ,auth,uploadImage);
app.get('/user', auth, getAuthenticatedUser);

//games routes
app.post('/games/:slug', auth, addComment)

exports.api = functions.region('europe-west1').https.onRequest(app)

