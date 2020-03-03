const { environment } = require("@rails/webpacker");
const lessLoader = require("./loaders/less-loader");
const tsLoader = require("./loaders/typescript");
const graphql = require("./loaders/graphql");
const customizedConfig = require("./customized_config");
const WebpackAssetsManifest = require("webpack-assets-manifest");

environment.loaders.insert("less", lessLoader, { after: "css" });
environment.loaders.prepend("ts", tsLoader);
environment.loaders.append("graphql", graphql);
environment.config.merge(customizedConfig);

environment.splitChunks();
environment.plugins.insert(
  "Manifest",
  new WebpackAssetsManifest({
    entrypoints: true,
    writeToDisk: true,
    publicPath: true
  })
);

module.exports = environment;
