Accounts.emailTemplates.siteName = "LightMatch.es 光合堂";

Accounts.emailTemplates.from = "LightMatch.es <share@lightmatch.es>";

Accounts.emailTemplates.enrollAccount.subject = function (user) {
    return "Welcome to LightMatch.es, " + user.profile.name;
};

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Reset your password at LightMatch.es";
};