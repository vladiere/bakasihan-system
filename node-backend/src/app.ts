import express from 'express';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Success');
});

app.listen(port, () => {
  console.info(`Server listening on http://localhost:${port}`)
})
