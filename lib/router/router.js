Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
//    trackPageView: true
});

Router.route('/', {
	name: 'home', 
	template: 'home'
});

Router.route('/privacy-policy',{
    name: 'privacy-policy'
});
Router.route('/license', {
    name: 'license'
});
Router.route('/terms-of-use', {
    name: 'terms-of-use'
});
Router.route('/subscribe', {
    name: 'socialMedia'
});
Router.route('/agreement',{
    name: 'agreement'
});
Router.route('/:userSlug',{
    name: 'userPage',
    template: 'home'
});
Router.route('/search/:tag',{
    name: 'search',
    template: 'home'
});
Router.route('/profile/edit',{
    name: 'editProfile',
    template: 'editProfile'
});

Router.route('/photo/:_id', {
    layoutTemplate: 'singleImage',
    name: 'singlePhoto',
    template: 'singlePhoto',
    waitOn: function(){
        return [Meteor.subscribe('image', this.params._id)];
    },
    data: function(){
        return Images.findOne({_id: this.params._id});
    }
});

Router.route('/photo/:_id/submit', {
//    layoutTemplate: 'singleImage',
    name: 'submitPhoto',
    template: 'submitPhoto',
    waitOn: function(){
        return [Meteor.subscribe('image', this.params._id)];
    },
    data: function(){
        return Images.findOne({_id: this.params._id});
    }
});

Router.route('/photo/submit/success',{
    name: 'submitSuccess',
    template: 'submitSuccess'
});

// Options
AccountsTemplates.configure({
    // defaultLayout: 'emptyLayout',
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

Router.onBeforeAction('loading');