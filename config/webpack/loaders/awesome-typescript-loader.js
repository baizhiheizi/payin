/**
 * 支持在 tsx 中 import .less 文件等
 * https://www.npmjs.com/package/awesome-typescript-loader
 */

module.exports = {
  test: /\.tsx$/,
  use: ["babel-loader", "awesome-typescript-loader"]
};
