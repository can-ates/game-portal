const { db,admin } = require('../util/admin');


exports.addComment = (req, res) => {
    const comment = {
        handle: req.user.handle,
        image: req.user.imageUrl,
        title: req.body.title,
        body: req.body.body,
        createdAt: new Date().toISOString()
    }
    db.collection('games').doc(req.params.slug).set({
        comments: admin.firestore.FieldValue.arrayUnion(comment) 
    }, {merge: true}).then(() => {
        return res.status(201).json({success: "Comment added successfully"})
    })
   
}

exports.getComments = (req, res) => {
    db
    .collection('games')
    .doc(`${req.params.slug}`)
    .get()
    .then(doc => {
        if(!doc.exists) {
            return res.json({general : 'Nobody commented yet'})
        }
        return res.json(doc.data().comments)
    })
    .catch(() => {
        res.status(500).json({general: 'Something went wrong'})
    })
}