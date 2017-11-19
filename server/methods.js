// // editProfileMethod
// Meteor.methods({
// 	'editProfileMethod' : function(doc) {
//
// 		check(doc, Schema.createUserFormSchema);
// 		// `doc` will contains the field who are in the `Schema.createUserFormSchema`
// 		var newUser = Accounts.createUser(/* standard args */);
// 		Meteor.users.update(newUser /* , set the extra information, like status */);
// 	}
// });