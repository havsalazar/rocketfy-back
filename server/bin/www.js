import app from '../app';
import http from 'http';
import mongoose from 'mongoose';
import { Server } from 'socket.io'
import { generateAirNoise, generateTempHumidity, generateWindPressure } from './../common/randomizer'
import { config } from '../config';

import { initData } from './../common/init'
var port = normalizePort(process.env.PORT || '3040');
app.set('port', port);

var server = http.createServer(app);


// real time data simulation
const io = new Server(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
    console.log('Connection established');
    setInterval(async () => {
        const data = await generateAirNoise()
        socket.emit('environmental-ch', JSON.stringify(data))
    }, 5000)
    setInterval(async () => {
        const data = await generateTempHumidity()
        socket.emit('climate-ch', JSON.stringify(data))
    }, 5000)
    setInterval(async () => {
        const data = await generateWindPressure()
        socket.emit('weather-ch', JSON.stringify(data))
    }, 5000)
})


app.set('io', io)
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
async function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    const mongoDB = `mongodb://${config.host}:${config.port}/${config.db}?retryWrites=false&directConnection=true`;
    await mongoose.connect(mongoDB)
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    /* Init Data */
    await initData();

    console.log('Listening on ' + bind);
}
