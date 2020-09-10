const { db,admin } = require('../util/admin');


exports.addComment = (req, res) => {
    const comment = {
        handle: req.user.handle,
        image: req.user.imageUrl,
        body: req.body.body,
        createdAt: new Date().toISOString()
    }
    db.collection('games').doc('gta').set({
        comments: admin.firestore.FieldValue.arrayUnion(comment) 
    }, {merge: true})
   
}