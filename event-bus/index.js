const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];

app.post('/events', (req, res) => {
    const event = req.body;

    events.push(event);

    axios.post('http://posts-clusterip-srv:4000/events', event).catch(err => console.error(err));
    axios.post('http://comments-srv:4001/events', event).catch(err => console.error(err));
    axios.post('http://query-srv:4002/events', event).catch(err => console.error(err));
    axios.post('http://moderation-srv:4003/events', event).catch(err => console.error(err));

    res.send({status: 'OK'})
});

app.get('/events', (req, res) => {
    res.send(events);
})

const port = process.env.PORT || 4005
app.listen(port, () => console.log('Listening on port ' + port));