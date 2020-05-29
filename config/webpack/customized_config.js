const path = require("path");

module.exports = {
  resolve: {
    alias: {
      '@admin': path.resolve(
        __dirname,
        '..',
        '..',
        'app/javascript/src/apps/admin',
      ),
      '@application': path.resolve(
        __dirname,
        '..',
        '..',
        'app/javascript/src/apps/application',
      ),
      '@images': path.resolve(
        __dirname,
        '..',
        '..',
        'app/javascript/src/images',
      ),
      '@shared': path.resolve(
        __dirname,
        '..',
        '..',
        'app/javascript/src/shared',
      ),
    }
  }
};
