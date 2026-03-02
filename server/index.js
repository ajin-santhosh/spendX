const express = require('express');
const app = express();

const PORT = 4000;

app.get('/', (req, res) => {
  res.send('4567890-=');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});