const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { sql, poolPromise } = require('./db');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

io.on('connection', async (socket) => {
  console.log('User connected:', socket.id);

  // Send chat history on connect
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT TOP 50 Content FROM Messages ORDER BY Id ASC');
    result.recordset.forEach(row => socket.emit('chat message', row.Content));
  } catch (err) {
    console.error('Error loading history:', err);
  }

  socket.on('chat message', async (msg) => {
    io.emit('chat message', msg);

    try {
      const pool = await poolPromise;
      await pool.request()
        .input('content', sql.NVarChar, msg)
        .query('INSERT INTO Messages (Content) VALUES (@content)');
    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
