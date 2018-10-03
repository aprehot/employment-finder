const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI
  }
};


exports.get = function get(env) {
  return (
  // config[env] ||
    config.default
  );
};
