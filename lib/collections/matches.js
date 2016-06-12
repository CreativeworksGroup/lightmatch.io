//Matches = new Mongo.Collection("matches");
//
//Matches.attachSchema(new SimpleSchema({
//    "image": {
//      type: String,
//      autoform: {
//        afFieldInput: {
//          type: 'fileUpload',
//          collection: 'Images',
//          accept: 'image/*',
//          label: 'Choose file' // optional
//        }
//      }
//    },
//    "tags": {
//      type: String,
//        autoform: {
//            type: 'tags'
//        }
//    },
//    userId:{
//        type: String,
//        autoValue: function(){ 
//            var user = Meteor.user();
//            return user._id
//        },
//        autoform:{
//            type: "hidden",
//            label: false
//        }
//    },
//    username:{
//        type: String,
//        autoValue: function() { 
//            var user = Meteor.user();
//            return user.username
//        },
//        autoform:{
//            type: "hidden",
//            label: false
//        }
//    },
//    userSlug:{
//        type: String,
//        autoValue: function(){
//            var user = Meteor.user();
//            return Slug.slugify(user.username);
//        },
//        autoform:{
//            type: "hidden",
//            label: false
//        }
//    },
//    createdAt: {
//        type: Date,
//        autoValue: function(){
//            if (this.isInsert) {
//                return new Date;
//            } else if (this.isUpsert) {
//                return {$setOnInsert: new Date};
//            } else {
//                this.unset();
//            }
//        },
//        autoform: {
//            type: "hidden",
//            label: false
//        }
//    }
//}));
//
//Matches.allow({
//    insert: function(userId) { return userId != null; },
////    update: function(userId, image) { return userId === image.userId; },
////    remove: function(userId, image) { return userId === image.userId; },
////    download: function() { return true; }
//});