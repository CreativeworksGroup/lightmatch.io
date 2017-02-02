Accounts.emailTemplates.siteName = "LightMatch.io 光合堂";

Accounts.emailTemplates.from = "LightMatch.io <share@lightmatch.io>";

Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to LightMatch.io, " + user.profile.name;
};

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Reset your password at LightMatch.io";
};

//Houston.add_collection(Meteor.users);