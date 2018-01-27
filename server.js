const express = require('express');
// const dateinputpolyfill = require('date-input-polyfill');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));

app.listen(PORT, () => console.log('Mytinerary running on', PORT));
