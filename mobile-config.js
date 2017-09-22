// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
    id: 'lightmatch',
    name: 'LightMatch.io',
    description: 'The first ever photo sharing platform based on Creative Commons Zero in China.',
    author: 'Creativeworks Group Limited - LightMatch Team',
    email: 'share@lightmatch.io',
    website: 'https://www.lightmatch.io'
});

App.icons({
    iphone_2x: 'assets/icons/ios/iphone_2x.png',
    iphone_3x: 'assets/icons/ios/iphone_3x.png',
    ipad: 'assets/icons/ios/ipad.png',
    ipad_2x: 'assets/icons/ios/ipad_2x.png',
    ipad_pro: 'assets/icons/ios/ipad_pro.png',
    ios_settings: 'assets/icons/ios/ios_settings.png',
    ios_settings_2x: 'assets/icons/ios/ios_settings_2x.png',
    ios_settings_3x: 'assets/icons/ios/ios_settings_3x.png',
    ios_spotlight: 'assets/icons/ios/ios_spotlight.png',
    ios_spotlight_2x: 'assets/icons/ios/ios_spotlight_2x.png',
    ios_spotlight_3x: 'assets/icons/ios/ios_spotlight_3x.png',
    ios_notification: 'assets/icons/ios/ios_notification.png',
    ios_notification_2x: 'assets/icons/ios/ios_notification_2x.png',
    ios_notification_3x: 'assets/icons/ios/ios_notification_3x.png',
    iphone_legacy: 'assets/icons/ios/iphone_legacy.png',
    iphone_legacy_2x: 'assets/icons/ios/iphone_legacy_2x.png',
    ipad_spotlight_legacy: 'assets/icons/ios/ipad_spotlight_legacy.png',
    ipad_spotlight_legacy_2x: 'assets/icons/ios/ipad_spotlight_legacy_2x.png',
    ipad_app_legacy: 'assets/icons/ios/ipad_app_legacy.png',
    ipad_app_legacy_2x: 'assets/icons/ios/ipad_app_legacy_2x.png',
    android_mdpi: 'assets/icons/android/android_mdpi.png',
    android_hdpi: 'assets/icons/android/android_hdpi.png',
    android_xhdpi: 'assets/icons/android/android_xhdpi.png',
    android_xxhdpi: 'assets/icons/android/android_xxhdpi.png',
    android_xxxhdpi: 'assets/icons/android/android_xxxhdpi.png',
});

App.launchScreens({
    // 'iphone_2x': 'splash/Default@2x~iphone.png',
    // 'iphone5': 'splash/Default~iphone5.png',
    // More screen sizes and platforms...
});

// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
    APP_ID: '1758346487779813',
    API_KEY: '023b00b6bffd5207311a74f03f1b7f6f'
});

App.accessRule('https://lightmatch-pro.oss-cn-hangzhou.aliyuncs.com');
App.accessRule('https://lightmatch-thumb.oss-cn-hangzhou.aliyuncs.com');

App.appendToConfig('<platform name="ios">' +
    '<config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription"><string></string></config-file>' +
    '<config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription"><string></string></config-file>' +
    '<config-file platform="ios" target="*-Info.plist" parent="ITSAppUsesNonExemptEncryption"><false/></config-file>' +
    '</platform>');
