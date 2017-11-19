// avatar = new FS.Collection("images",{
// 	stores: [
//   		new FS.Store.GridFS("avatar", {})
//   	]
// });
//
// avatar.allow({
// 	insert: function(userId, avatarOwner) { return userId != null; },
//     download: function(userId) { return true; },
//     update: function(userId, avatarOwner) { return true; }
// });