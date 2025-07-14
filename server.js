const express = require('express');
const app = express();
const http = require('http').createServer(app);
const socketIO = require('socket.io');
const io = socketIO(http, {
    cors: {
        origin: "*"
    }
});

// Servir arquivos estáticos da pasta "public"
app.use(express.static('public'));

io.on('connection', socket => {
    console.log('🔌 Novo usuário conectado');

    socket.on('chat message', ({ username, message }) => {
        io.emit('chat message', { username, message });
    });

    socket.on('disconnect', () => {
        console.log('❌ Usuário desconectado');
    });
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => {
    console.log(`🚀 Servidor ouvindo na porta ${PORT}`);
});
