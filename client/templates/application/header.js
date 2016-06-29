Template.header.helpers({
    'photoPath': function(){
        if (Meteor.user()){
            user = Meteor.user();
            return '/'+Slug.slugify(user.username);
        }
        else{
            return '/';
        }
    }
});