const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI
  },
  default: {
    SECRET: 'SUPERSECRETPASSWORD123',
    // DATABASE: 'mongodb://localhost:27017/projects'
    DATABASE: 'mongodb+srv://AniAdmin:discoverani@ani-prototype-wzu37.mongodb.net/projects'
  }
};


exports.get = function get(env) {
  return (
  // config[env] ||
    config.default
  );
};
