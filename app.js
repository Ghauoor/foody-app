import 'dotenv/config';
import { connectDB } from './src/config/connect.js';
import fastify from 'fastify';
import { MONGO_URI, PORT } from './src/config/config.js';
import fastifySocketIO from 'fastify-socket.io';
import { registerRoutes } from './src/routes/index.js';

const start = async () => {
    await connectDB(MONGO_URI);
    const app = fastify({ logger: true });

    app.register(fastifySocketIO, {
        cors: {
            origin: '*',
        },
        pingInterval: 10000,
        pingTimeout: 5000,
        transports: ['websocket']
    });

    await app.register(registerRoutes);

    app.listen({ port: PORT, host: '0.0.0.0' }, (err, addr) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`App is Running on http://localhost:${PORT}`);
    })

    app.ready().then(() => {
        app.io.on('connection', (socket) => {
            console.log('Client connected');
            socket.join(orderId);

            console.log('Client joined room', orderId);

            socket.on('disconnect', () => {
                console.log('Client disconnected');
            });
        });
    }
    )
}

start();