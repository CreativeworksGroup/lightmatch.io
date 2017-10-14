// This section sets up some basic app metadata,
// the entire section is optional.
App.info({
    id: 'hk.com.creativeworks.lightmatch',
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
    'iphone_2x': 'assets/splash/ios/iphone_2x.png',
    'iphone5': 'assets/splash/ios/iphone5.png',
    'iphone6': 'assets/splash/ios/iphone6.png',
    'iphone6p_portrait': 'assets/splash/ios/iphone6p_portrait.png',
    'iphone6p_landscape': 'assets/splash/ios/iphone6p_landscape.png',
    'ipad_portrait': 'assets/splash/ios/ipad_portrait.png',
    'ipad_landscape': 'assets/splash/ios/ipad_landscape.png',
    'ipad_portrait_2x': 'assets/splash/ios/ipad_portrait_2x.png',
    'ipad_landscape_2x': 'assets/splash/ios/ipad_landscape_2x.png',
    'android_mdpi_portrait': 'assets/splash/android/android_mdpi_portrait.png',
    'android_mdpi_landscape': 'assets/splash/android/android_mdpi_landscape.png',
    'android_hdpi_portrait': 'assets/splash/android/android_hdpi_portrait.png',
    'android_hdpi_landscape': 'assets/splash/android/android_hdpi_landscape.png',
    'android_xhdpi_portrait': 'assets/splash/android/android_xhdpi_portrait.png',
    'android_xhdpi_landscape': 'assets/splash/android/android_xhdpi_landscape.png',
    'android_xxhdpi_portrait': 'assets/splash/android/android_xxhdpi_portrait.png',
    'android_xxhdpi_landscape': 'assets/splash/android/android_xxhdpi_landscape.png',
    'android_xxxhdpi_portrait': 'assets/splash/android/android_xxxhdpi_portrait.png',
    'android_xxxhdpi_landscape': 'assets/splash/android/android_xxxhdpi_landscape.png',
});

// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
    APP_ID: '1758346487779813',
    API_KEY: '023b00b6bffd5207311a74f03f1b7f6f'
});

App.accessRule('https://lightmatch-pro.oss-cn-hangzhou.aliyuncs.com');
App.accessRule('https://lightmatch-thumb.oss-cn-hangzhou.aliyuncs.com');

App.appendToConfig('<platform name="ios">' +
//     '<config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription"><string></string></config-file>' +
    '<config-file platform="ios" target="*-Info.plist" parent="NSCameraUsageDescription"><string></string></config-file>' +
    '<config-file platform="ios" target="*-Info.plist" parent="ITSAppUsesNonExemptEncryption"><false/></config-file>' +
    '</platform>');
