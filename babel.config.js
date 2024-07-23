module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    env: {
      production: {
        plugins: ["react-native-paper/babel"],
      },
    },
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          blacklist: null,
          whitelist: [
            "BASE_URL",
            "API_TOKEN",
            "IMAGE_BASE_URL",
            "CLOUD_CONSOLE_WEB_CLIENT_ID_DEV",
            "CLOUD_CONSOLE_ANDROID_CLIENT_ID_DEV",
            "CLOUD_CONSOLE_IOS_CLIENT_ID_DEV",
          ],
          safe: false,
          allowUndefined: true,
        },
      ],
    ],
  };
};
