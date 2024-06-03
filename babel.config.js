module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: ["BASE_URL", "API_TOKEN", "IMAGE_BASE_URL"],
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
