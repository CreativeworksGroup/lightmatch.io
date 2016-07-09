Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	notFoundTemplate: 'notFound',
    trackPageView: true
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
Router.route('/profile/edit',{
    name: 'editProfile',
    template: 'editProfile'
});

//Router.route('/matches/add',{
//    name: 'addMatch',
//    template: 'addMatch'
//});

Router.onBeforeAction('loading');