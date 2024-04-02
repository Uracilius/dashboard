const redis = require('redis');
const Constants = require('../../environment');

const redisClient = redis.createClient({
  url: 'redis://localhost:'+Constants.REDIS_SERVER_PORT 
});
redisClient.on('error', (err) => console.error('Redis Client Error', err));
redisClient.connect();

module.exports = redisClient;
