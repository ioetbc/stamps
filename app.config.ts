import "dotenv/config";

module.exports = {
  expo: {
    scheme: "stamps",
    web: {
      bundler: "metro",
    },
    name: "stamps",
    slug: "stamps",
    platforms: ["ios", "android", "web"],
    android: {
      package: "com.ioetbc.stamps",
    },
    ios: {
      bundleIdentifier: "com.ioetbc.stamps",
    },
    plugins: [
      [
        "expo-barcode-scanner",
        {
          cameraPermission: `Allow [App name] to use your camera?`,
        },
      ],
    ],
    extra: {
      IOS_CLIENT_ID: process.env.IOS_CLIENT_ID,
      ANDROID_CLIENT_ID: process.env.ANDROID_CLIENT_ID,
      WEB_CLIENT_ID: process.env.WEB_CLIENT_ID,
      EXPO_CLIENT_ID: process.env.EXPO_CLIENT_ID,
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID,
    },
  },
};
