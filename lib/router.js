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
Router.route('/terms-of-use', {
    name: 'terms-of-use'
});
Router.route('/disclaimer', {
    name: 'disclaimer'
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

//Router.route('/matches/add',{
//    name: 'addMatch',
//    template: 'addMatch'
//});

Router.onBeforeAction('loading');