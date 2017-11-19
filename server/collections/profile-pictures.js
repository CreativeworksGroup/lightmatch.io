// ProfilePictures = new FS.Collection("profile-pictures", {
//     stores: [new FS.Store.GridFS("profile-pictures", {})]
// });
//
// ProfilePictures.allow({
//     insert: function(userId, doc) { return userId != null; },
//     download: function(userId) { return true; }
// });