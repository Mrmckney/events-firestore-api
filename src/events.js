const firebase = require('firebase-admin')
const credentials = require('../credentials.json')

function connectDb(){
    firebase.initializeApp({
        credential: firebase.credential.cert(credentials)
    })
    return firebase.firestore()
}

exports.getEvents = (req, res) => {
    const db = connectDb()
    db.collection('events').get()
        .then(allEvents => {
            allEvents.docs.map(doc => {
                console.log(doc.data())
            })
            res.send('got all events')
        })
        .catch(err => console.log(err))
}
