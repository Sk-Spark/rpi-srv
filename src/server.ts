import express from 'express';
import path from 'path';
import {MdnsScanner} from './api/MDNSScanner';

const mScanner = new MdnsScanner();

const app = express();
const port = process.env.PORT || 5000;


// API code for sever
app.get('/api', (req, res) => {
  res.send('Hello from Express Server!');
});

app.get('/api/mdns',(req, res)=>{
  res.send(MdnsScanner.mdns);
})


// Serving React UI code

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

setInterval(()=>{
  mScanner.updateService();
}, 5000);