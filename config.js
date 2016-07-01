Accounts.config({
  forbidClientAccountCreation : Meteor.settings.public.forbidClientAccountCreation
});

AdminConfig = { 
    adminEmails: ['kwun@creativeworks.com.hk'],
    skin: 'yellow-light',
    nonAdminRedirectRoute: 'entrySignIn',
}