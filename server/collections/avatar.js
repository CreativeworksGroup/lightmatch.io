avatar = new FS.Collection("images",{
	stores: [
  		new FS.Store.GridFS("avatar", {})
  	]
});

avatar.allow({
	insert: function(userId, doc) { return userId != null; },
    download: function(userId) { return true; }
});