const redisClient = require('../config/redis');

// Cache middleware function
const cache = (duration , category = 'default')  => {
    return async (req, res, next) => {
        try {
            const userId = req.user?.id || 'guest';
            const path = (req.originalUrl || req.url).split('?')[0]; // Remove query params
            const key = `cache:${category}:${userId}:${path}`;
            
            // Try to get cached data
            const cachedData = await redisClient.get(key);
            
            if (cachedData) {
                 // If cached data exists, send it directly
                 return res.send(JSON.parse(cachedData));
            } else {
                // If not cached, override res.send to cache the response
                const originalSend = res.send;
                res.send = function (body) {
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        // Cache the response for the specified duration (in seconds)
                        redisClient.setex(key, duration, JSON.stringify(body));
                    }
                    originalSend.call(this, body);
                };
                next();
            }
        } catch (error) {
            console.error('Cache error:', error);
            next(); // Continue to the next middleware/route handler
        }
    };
};

// Function to clear cache by pattern
const clearCache = async (category = 'default' ,  userId = 'guest') => {
    try {
        const keys = await redisClient.keys(`cache:${category}:${userId}:/*`);
        if (keys.length > 0) {
            await redisClient.del(keys);
        }
    } catch (error) {
        console.error('Error clearing cache:', error);
    }
};

module.exports = {
    redisClient,
    cache,
    clearCache
};
