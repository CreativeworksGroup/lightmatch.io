import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import Images from '../images';

Meteor.publish('images.list', () => Images.find());

Meteor.publish('images.view', (_id) => {
  check(_id, String);
  return Images.find(_id);
});

// Meteor.publish('images', function(limit, username, searchQuery){
//     check(limit, Number);
//
//     var findQuery = {published:true};
//
//     if (this.userId && Roles.userIsInRole(this.userId, ['admin'])){
//         findQuery = {};
//     }
//     if (username){
//         check(username, String);
//         var author = Meteor.users.findOne({username: username});
//         findQuery = {userId: author._id}
//     }
//
//     if (searchQuery){
//         check(searchQuery, String);
//    	findQuery = {$or: [
//                         { tags: searchQuery.toLowerCase() , published:true },
//                         { place: { $regex: ".*" + searchQuery + ".*" , "$options": "i"} , published:true }
//                     ]}
// 	}
//     return Images.find(findQuery, {
//         limit: limit,
//         sort: {uploadedAt: -1}
//     });
// });
//
// Meteor.publish('image', function(id){
//     check(id, String);
//     return Images.find({_id: id});
// });
