const { firestore } = require('firebase-admin')
const firebase = require('firebase-admin')
const credentials = require('../credentials.json')

function connectDb(){
    if(!firebase.apps.length){
        firebase.initializeApp({
            credential: firebase.credential.cert(credentials)
        })
    }
    return firebase.firestore()
}

exports.getEvents = (req, res) => {
    const db = connectDb()
    db.collection('events').get()
        .then(allEvents => {
            const events = allEvents.docs.map(doc => {
                let event = doc.data()
                event.id = doc.id
                return event
            })
            res.send(events)
        })
        .catch(err => console.log(err))
}

exports.createEvent = (req, res) => {
    const db = connectDb()
    db.collection('events')
        .add(req.body)
        .then(docRef => res.send(docRef.id))
        .catch(err => res.status(500).send('Event was not Created'))
}

exports.oneEvent = (req, res) => {
    const db = connectDb()
    db.collection('events').doc(req.params.id).get()
        .then(doc => {
            const one = doc.data()
            one.id = doc.id
            res.send(one)
    })
        .catch(err => res.status(500).send('Could not get event'))
}

exports.deleteEvent = (req, res) => {
    const db = connectDb()
    const { docId } = req.params
    db.collection('events').doc(docId).delete()
        .then( () => res.status(203).send('Successfully deleted event'))
        .catch(err => res.status(500).send('Could not delete event'))
}

exports.updateEvent = (req, res) => {
    const db = connectDb()
    const { name } = req.params
    db.collection('events').doc(name).update({
        ...req.body,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then( () => res.status(202).send('Event updated'))
    .catch(err => res.status(500).send('Could not update event'))
}

// exports.searchEvent = (req, res) => {   
//     const { name } = req.query
//     const db = connectDb()
    
//     db.collection('events').where('name', '==', name).get()
//         .then(searchEvents => {
//             const matches = searchEvents.docs.map(doc => {
//                 let match = doc.data()
//                 match.id = doc.id
//                 return match
//             })
//             res.send(matches)
//         })
//         .catch(err => res.status(500).send('Can not get event'))
        
// }