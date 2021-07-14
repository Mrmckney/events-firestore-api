const express = require('express')
const cors = require('cors')
const { getEvents, createEvent, oneEvent, deleteEvent, updateEvent, searchEvent } = require('./src/events')

const app = express()
app.use(express.json())
app.use(cors())

app.post('/events', createEvent) 

app.get('/events/search', searchEvent)
app.get('/events/:id', oneEvent)
app.get('/events', getEvents)

app.patch('/events/:name', updateEvent)

app.delete('/events/:docId', deleteEvent)


app.listen(5000, () => {
    console.log('We are connected on port 5000')
})

// todo: HW 
// 1. create POST request - to add new events
// 2. create GET - ONE event request 
// 3. create DELETE request - to delete one event
// 4. create PATCH request - to update one event 

// extra credit: 
// Make a SEARCH request - to find one event 

// MAKE IT DYNAMIC IN POSTMAN 