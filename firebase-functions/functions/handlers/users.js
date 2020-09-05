const { admin, db } = require('../util/admin');

const config = require('../util/config');
const { validationResult } = require('express-validator');
const { v4: uuid } = require('uuid');

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
            userId = userData.user.uid;
            return userData.user.getIdToken();
          })
          .then(idToken => {
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

exports.uploadImage = (req, res) => {
  const Busboy = require('busboy');
  const path = require('path');
  const os = require('os');
  const fs = require('fs');

  let imageToBeUploaded = {};
  let imageFileName;
  // String for image token
  let generatedToken = uuid();

  const busboy = new Busboy({ headers: req.headers });

  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }
    file.on('data', data => {
      if (data.length > 125000) {
        return res
          .status(400)
          .json({ error: 'Image can not be larger than 1MB' });
      }
    });

    
    const imageExtension = filename.split('.')[
      filename.split('.').length - 1
    ];
    // 32756238461724837.png
    imageFileName = `${Math.round(
      Math.random() * 1000000000000
    ).toString()}.${imageExtension}`;

    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    //filedan alinan veriyi okuyup filepathe yaziyoruz/// Temp klasoru
    file.pipe(fs.createWriteStream(filepath));
    
  });
  busboy.on("finish", () => {
    
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            //Generate token to be appended to imageUrl
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        // Append token to url
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
        return db.doc(`/users/${req.user.handle}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: "something went wrong" });
      });
  });
  

  busboy.end(req.rawBody);
};
