FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('layout', {main: 'home'});
    }
});

FlowRouter.route('/privacy-policy', {
    name: 'privacy-policy',
    action() {
        BlazeLayout.render('layout', {main: 'privacyPolicy'});
    }
});

FlowRouter.route('/license', {
    name: 'license',
    action() {
        BlazeLayout.render('layout', {main: 'license'});
    }
});

FlowRouter.route('/terms-of-use', {
    name: 'terms-of-use',
    action() {
        BlazeLayout.render('layout', {main: 'termsOfUse'});
    }
});

FlowRouter.route('/subscribe', {
    name: 'socialMedia',
    action() {
        BlazeLayout.render('layout', {main: 'socialMedia'});
    }
});

FlowRouter.route('/agreement', {
    name: 'agreement',
    action() {
        BlazeLayout.render('layout', {main: 'agreement'});
    }
});

FlowRouter.route('/:userSlug', {
    name: 'userPage',
    action: function() {
        BlazeLayout.render('layout', {main: 'home'});
    }
});

FlowRouter.route('/profile/edit', {
    name: 'editProfile',
    action: function() {
        BlazeLayout.render('layout', {main: 'editProfile'});
    }
});

FlowRouter.route('/photo/:_id', {
    subscriptions: function (params) {
        this.register('singlePhoto', Meteor.subscribe('image', params._id));
    },
    action: function() {
        BlazeLayout.render('singleImage', {main: 'singlePhoto'});
    }
});

FlowRouter.route('/photo/:_id/submit', {
    subscriptions: function (params) {
        this.register('submitPhoto', Meteor.subscribe('image', params._id));
    },
    action: function() {
        BlazeLayout.render('layout', {main: 'submitPhoto'});
    }
});

FlowRouter.route('/photo/submit/success', {
    name: 'submitSuccess',
    action: function() {
        BlazeLayout.render('layout', {main: 'submitSuccess'});
    }
});

FlowRouter.route('/tag/:searchQuery', {
    name: 'searchResult',
    action: function() {
        BlazeLayout.render('layout', {main: 'home'});
    }
});

FlowRouter.notFound = {
    action() {
        BlazeLayout.render('layout', {main: 'notFound'});
    }
};

// Router.configure({
// 	layoutTemplate: 'layout',
// 	loadingTemplate: 'loading',
// 	notFoundTemplate: 'notFound',
//     trackPageView: true
// });

// Options
AccountsTemplates.configure({
    defaultLayout: 'layout',
    defaultContentRegion: 'main',
    showForgotPasswordLink: true,
    overrideLoginErrors: true,
    enablePasswordChange: true,

  // sendVerificationEmail: true,
  // enforceEmailVerification: true,
  //confirmPassword: true,
  //continuousValidation: false,
  //displayFormLabels: true,
  //forbidClientAccountCreation: true,
  //formValidationFeedback: true,
  //homeRoutePath: '/',
  //showAddRemoveServices: false,
  //showPlaceholders: true,

  negativeValidation: true,
  positiveValidation: true,
  negativeFeedback: false,
  positiveFeedback: true,

  // Privacy Policy and Terms of Use
  //privacyUrl: 'privacy',
  //termsUrl: 'terms-of-use',
});

var pwd = AccountsTemplates.removeField('password');
AccountsTemplates.removeField('email');
AccountsTemplates.addFields([
  {
      _id: "username",
      type: "text",
      displayName: "username",
      required: true,
      minLength: 5,
  },
  {
      _id: 'email',
      type: 'email',
      required: true,
      displayName: "email",
      re: /.+@(.+){2,}\.(.+){2,}/,
      errStr: 'Invalid email',
  },
    {
        _id: 'firstName',
        type: 'text',
        required: true,
        displayName: "First Name",
    },
    {
        _id: 'lastName',
        type: 'text',
        required: true,
        displayName: "Last Name",
    },
  pwd
]);

AccountsTemplates.configureRoute('changePwd',{
    path: '/user/change-password'
});
AccountsTemplates.configureRoute('enrollAccount',{
    path: '/user/enroll-account'
});
AccountsTemplates.configureRoute('forgotPwd',{
    path: '/user/forgot-password'
});
AccountsTemplates.configureRoute('resetPwd',{
    path: '/user/reset-password'
});
AccountsTemplates.configureRoute('signIn',{
    path: '/user/sign-in'
});
AccountsTemplates.configureRoute('signUp',{
    path: '/user/sign-up'
});
AccountsTemplates.configureRoute('verifyEmail',{
    path: '/user/verify-email'
});
AccountsTemplates.configureRoute('resendVerificationEmail',{
    path: '/user/send-again'
});

// Router.onBeforeAction('loading');