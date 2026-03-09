import { createClient } from 'redis';

const redis = createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redis.on('error', (err) => console.log('Redis Client Error', err));

let isConnected = false;

export const connectRedis = async () => {
    if (!isConnected) {
        await redis.connect();
        isConnected = true;
        console.log('Connected to Redis server.');
    }
};

export default redis;
