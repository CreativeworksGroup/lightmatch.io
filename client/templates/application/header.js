Template.header.helpers({
    'photoPath': function(){
        if (Meteor.user()){
            user = Meteor.user();
            return '/'+user.username;
        }
        else{
            return '/';
        }
    }
});