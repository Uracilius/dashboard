const redisClient = require('./redisClient');

async function setCache(key, value, ttl = 3600) {
    await redisClient.setEx(key, ttl, JSON.stringify(value));
}

async function getCache(key) {
    const value = await redisClient.get(key);
    if (value) return JSON.parse(value);
    return null;
}

module.exports = { setCache, getCache };
