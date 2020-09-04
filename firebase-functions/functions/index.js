const functions = require('firebase-functions');
const app = require('express')();
const auth = require('./util/auth')

const cors = require('cors');
app.use(cors());
const {body,check} = require('express-validator')


const {
  signup,
  login,
  uploadImage
} = require('./handlers/users');


// users routes
app.post('/signup', [
  body('email').exists().withMessage('Email required').isEmail().withMessage('Not a valid email').normalizeEmail(),
  body('password').exists().withMessage('Password required').isLength({min: 7}).withMessage('Should be longer than 7 char'),
  check('passwordConfirmation', 'Password confirmation field must have the same value as the password field')
  .exists()
  .custom((value, {req}) => value === req.body.password),
  body('handle').exists().withMessage('You should provide a handle')

], signup);
app.post('/login',[
  body('email').exists().withMessage('Email required').bail().isEmail().withMessage('Not a valid email').normalizeEmail(),
  body('password').exists().withMessage('Password required'),
] ,login);
app.post('/user/image' ,auth,uploadImage);
// app.post('/user', FBAuth, addUserDetails);
// app.get('/user', FBAuth, getAuthenticatedUser);
// app.get('/user/:handle', getUserDetails);
// app.post('/notifications', FBAuth, markNotificationsRead);

exports.api = functions.region('europe-west1').https.onRequest(app)

