import express from 'express';
import path from 'path';

const app = express();
const port = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   res.send('Hello from Express!');
// });

// if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
// }

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
