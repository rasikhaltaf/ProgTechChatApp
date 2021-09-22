// Node Server which will handle socket IO connections

const io = require('socket.io')(8000)

const users = {};

io.on('connection', socket =>{
    //if New user joins, let other users connected to the server know!
    socket.on('new-user-joined', name =>{
        // console.log("New User",name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
        
    });
    //if someone send the message, broadcast it to others
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });
    //If someone leave the chat, let others know

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];

    });
    


})