console.log('test');
const express = require('express');
const app = express();
const fs = require('fs');
const PORT = 5555;
const { exec } = require('child_process');
const cors = require('cors');

const corsOptions = {
  origin: '*',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  console.log('endpoint hit!');
  exec('pihole disable 30s', (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    return;
  });
  console.log(req.query);
  res.status(200);
  res.send('recieved..');
});

app.listen(PORT, () => {
  console.log(`🌎 🌎 App listening on port ${PORT} 🌎 🌎`);
});
