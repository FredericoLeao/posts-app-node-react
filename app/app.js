const express = require('express');

const app = express();

app.use(express.json());

// routes
app.get('/status', (request, response) => {
    const status = {
        "Status": "OK"
    };
    response.send(status);
});

// server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`listening on: ${PORT}`);
});
