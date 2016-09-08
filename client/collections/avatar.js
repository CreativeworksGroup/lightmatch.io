avatar = new FS.Collection("images",{
	stores: [
  		new FS.Store.GridFS("avatar", {})
  	]
});