// Express
const express = require('express');
const app = express();
app.use(express.json());

const UserController = require('./controllers/user')

// routes
app.get('/status', (req, res) => {
    const status = {
        "Status": "OK"
    };
    res.send(status);
});

// - user routes
app.post(
    '/user/signup',
    UserController.validate('createUser'),
    UserController.createUser
);

// server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`listening on: ${PORT}`);
});
