Accounts.onCreateUser(function(options, user){
    if(user.services.facebook){
//        user.profile.firstname
        console.log(user.services.facebook);
        console.log(options.profile);
        user.emails = [{
            address: user.services.facebook.email,
            verified: true,
        }];
        user.profile = {};
        user.profile.firstName = user.services.facebook.first_name;
        user.profile.lastName = user.services.facebook.last_name;
    }
//    if (options.profile)
//        user.profile = options.profile;
    check(user, Schema.User);
    return user;
});