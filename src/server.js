const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const http = require('http').Server(app);
const io = require('socket.io')(http);
const host = 'localhost';
const fs = require('fs');
const path = require('path')
const userRoute = require("./routes/userRoute");
let tempData = []

app.use(express.static(__dirname + '../client'));

app.use("/", userRoute);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/pages/home.html'));
  
});

app.get('/home.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/scripts/home.js'));
  
});

app.get('/img', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/img/logo.png'));
  
});

app.get('/classroom', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/pages/classroom.html'));
  
});

app.get('/data', (req, res) => {
  appendToCSV(tempData).then(function(result) {
    res.sendFile(path.join(__dirname, '../test.csv'));
  })
  .catch(function(err){
    res.send(err)
  });
  
});

// app.get('/classroom.js', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/scripts/classroom.js'));
  
// });

app.get('/global.css', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/styles/global.css'));
  
});

function appendToCSV(data) {
  const filePath = path.join(__dirname, '../test.csv');

  // Prepare the data for appending to CSV
  const csvData = data.map(entry => `${entry.time},${entry.value}`).join('\n');

  // Append the data to the file
  fs.appendFile(filePath, csvData, 'utf8', (err) => {
    if (err) {
      console.error('Error appending to CSV file:', err);
    } else {
      console.log('Data appended to CSV file successfully.');
    }
  });
}

// io.on('connection', (socket) => {
//   socket.on('chat message', msg => {
//     io.emit('chat message', msg);
//   });
//   socket.on('user joined', username => {
//     console.log(username + " joined the chat")
//     io.emit('chat message', username + " joined the chat");
//   });
// });

app.get('/changeSeat', (req, res)=> {
  io.emit('seatChange', "Seat");
  res.send('Hello World');
}) 

app.post('/changeSeat', (req, res)=> {
  let time = Date.now()
  tempData.push({"time":time, "value": req.body.Prescence})
  if(req.body.Prescence == 1){
  io.emit('seatChange', 1); 
  }
  else {
  io.emit('seatChange', 0);
  }
  // io.emit('seatChange', "Seat");
  res.send(tempData);
}) 

http.listen(port, host, () => {
  console.log(`Socket.IO server running at http://${host}:${port}/`);
});
