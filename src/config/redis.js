// src/config/redis.js
const Redis = require('ioredis');
const { envPath } = require('../config/env');
 
let  redisClient;

if(envPath === '.env.dev') {
    redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
        username: 'default',
        password: process.env.REDIS_PASSWORD
    });
}else{
    redisClient = new Redis({
        host: process.env.REDIS_HOST, // Default to localhost
        port: process.env.REDIS_PORT,
        db: process.env.REDIS_DB,
        retryStrategy: (times) => {
            // Reconnect after
            const delay = Math.min(times * 50, 2000);
            return delay;
        },
    });
}

// Event listeners
redisClient.on('connect', () => {
    console.log(`✅ Redis client connected to ${process.env.REDIS_HOST   + " " +  'DEVELOPMENT'}`);
});

redisClient.on('error', (err) => {
    console.error(`❌ Redis Client Error: ${err}`);
});

// Export the client
module.exports = redisClient;