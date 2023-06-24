const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvents = (type, data) => {
    if(type === 'PostCreated'){
        const {id, title} = data;

        posts[id] = {id, title, comments: []};
    }
    
    if(type === 'CommentCreated'){
        const {id, content, postId, status} = data;

        const post = posts[postId];
        post.comments.push({id, content, status});
    }

    if(type === 'CommentUpdated'){
        const {id, content, status, postId} = data;

        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id)
        comment.status = status;
        comment.content = content;
    }
}

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const {type, data} = req.body;

    handleEvents(type, data);

    res.send({message: "OK"})
})

const port = process.env.PORT || 4002;
app.listen(port, async () => {
    console.log('listening on port', port)
    const checkServer = async () => {
    try {
        const res = await axios.get("http://event-bus-srv:4005/events");
        if (res.data.length > 0) {
        res.data.forEach((event) => {
            console.log("Processing event:", event.type);
            handleEvents(event.type, event.data);
        });
        } else {
        console.log("No events found.");
        }
    } catch (err) {
        console.error("Could not connect to server:", err.message);
        setTimeout(checkServer, 5000); // wait 5 seconds and try again
    }
    };

    checkServer();
});
