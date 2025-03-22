import 'dotenv/config';
import { connectDB } from './src/config/connect.js';
import fastify from 'fastify';
import { MONGO_URI, PORT } from './src/config/config.js';


const start = async () => {
    await connectDB(MONGO_URI);

    const app = fastify({ logger: true });

    app.listen({ port: PORT, host: '0.0.0.0' }, (err, addr) => {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        console.log(`App is Running on http://localhost:${PORT}`);
    })
}


start();