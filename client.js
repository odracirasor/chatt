const readline = require('readline');
const { io } = require('socket.io-client');

const socket = io('https://terminal-start-server.onrender.com');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Digite seu nome de usuário: ', username => {
    console.log(`👋 Bem-vindo(a), ${username}! Comece a conversar:`);

    rl.setPrompt('');
    rl.prompt();

    rl.on('line', message => {
        socket.emit('chat message', { username, message });
        rl.prompt();
    });

    socket.on('chat message', ({ username: sender, message }) => {
        if (sender !== username) {
            console.log(`
${sender}: ${message}`);
            rl.prompt();
        }
    });
});
