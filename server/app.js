const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

const m = (name, text, id) => ({name, text, id})

io.on('connection', socket => {
    socket.on('addUser', (data, cb) => {
        if (!data.name || !data.room) {
            return cb('Incorrection data')
        }
        socket.join(data.room)

        users.remove(socket.id);
        users.add({
            id: socket.id,
            name: data.name,
            room: data.room
        })

        cb({userId: socket.id})
        io.to(data.room).emit('updateUsers', users.getByRoom(data.room))
        socket.emit('newMessage', m('admin', `Hello ${data.name}`))
        socket.broadcast
            .to(data.room)
            .emit('newMessage', m('admin', `User ${data.name} loddet in`) )
    })

    socket.on('createMessage', (data, cb) => {
        if (!data.text) {
            return cb('Can not send empty')
        }
        const user = users.get(data.id)
        if (user) {
            io.to(user.room).emit('newMessage', m(user.name, data.text, data.id))
        }
        cb()
    })

    socket.on('userExit', (id, cb) => {
        const user = users.remove(id)
        if(user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
            io.to(user.room).emit('newMessage', m('admin', `${user.name} exit.`))
        }
        cb()
    })

    socket.on('disconnect', () => {
        const user = users.remove(socket.id)
        if(user) {
            io.to(user.room).emit('updateUsers', users.getByRoom(user.room))
            io.to(user.room).emit('newMessage', m('admin', `${user.name} exit.`))
        }
    })
})

module.exports = {
    app,
    server
}