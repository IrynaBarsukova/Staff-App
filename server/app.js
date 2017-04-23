const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

const server = express();
const  { getPositions, getPosition, updatePosition, createPosition, deletePosition } = require('./controllers/positions');
const staticPath = path.resolve('../public/dist');

mongoose.connect('mongodb://localhost/staff', (error) => {
    if (error) {
        console.log('Unable to connect to MongoDB');
    } else {
        console.log('Connection with MongoDB was established successful');
        server.listen(3000, (req, res) => {
            console.log('Listening at http://localhost:3000');
        });
    }
});

// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
server.use(bodyParser.json());

server.use('/', express.static('../public/dist'));

server.get('/api/positions', getPositions);
server.get('/api/positions/:id', getPosition);
server.put('/api/positions/edit', updatePosition);
server.post('/api/positions/create', createPosition);
server.delete('/api/positions/delete', deletePosition);

server.get('*', (request, response) => {
    response.sendFile(staticPath + '/index.html');
});