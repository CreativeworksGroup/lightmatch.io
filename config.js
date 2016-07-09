AdminConfig = { 
    adminEmails: ['kwun@creativeworks.com.hk'],
    skin: 'yellow-light',
    nonAdminRedirectRoute: 'entrySignIn',
}
Accounts.config({
    forbidClientAccountCreation : Meteor.settings.public.forbidClientAccountCreation
});