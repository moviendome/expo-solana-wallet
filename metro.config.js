module.exports = {
  resolver: {
    sourceExts: ["jsx", "js", "ts", "tsx", "cjs"],
    extraNodeModules: {
      stream: require.resolve("readable-stream"),
    },
  },
};
