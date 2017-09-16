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

// Pass preferences for a particular PhoneGap/Cordova plugin
App.configurePlugin('com.phonegap.plugins.facebookconnect', {
    APP_ID: '1758346487779813',
    API_KEY: '023b00b6bffd5207311a74f03f1b7f6f'
});

App.accessRule('https://lightmatch-pro.oss-cn-hangzhou.aliyuncs.com');
App.accessRule('https://lightmatch-thumb.oss-cn-hangzhou.aliyuncs.com');

App.appendToConfig('<platform name="ios"><config-file platform="ios" target="*-Info.plist" parent="NSPhotoLibraryUsageDescription"></config-file></platform>');
