const { db,admin } = require('../util/admin');


exports.addComment = (req, res) => {
    const comment = {
        handle: req.user.handle,
        image: req.user.imageUrl,
        body: req.body.body,
        createdAt: new Date().toISOString()
    }
    db.collection('games').doc(req.params.slug).set({
        comments: admin.firestore.FieldValue.arrayUnion(comment) 
    }, {merge: true})
   
}

exports.getComments = (req, res) => {
    db
    .collection('games')
    .doc(`${req.params.slug}`)
    .get()
    .then(doc => {
        if(!doc.exists) {
            return res.status(404).json({general : 'Nobody commented yet'})
        }
        return res.json(doc.data().comments)
    })
}