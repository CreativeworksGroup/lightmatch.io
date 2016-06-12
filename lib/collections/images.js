//if (Meteor.isServer){
//    var imageStore = new FS.Store.GridFS("images");
//    
//    Images = new FS.Collection("image", {
//        stores: [imageStore],
//        filter: {
//            allow: {
//                contentTypes: ['image/*']
//            }
//        }
//    })
//}

//if (Meteor.isClient){
//    FS.debug = true;
//    var imageStore = new FS.Store.GridFS("images");
//    Images = new FS.Collection("Images", {
//        stores: [imageStore],
//        filter: {
//            allow: {
//                contentTypes: ['image/*']
//            },
//            onInvalid: function(message) {
//                toastr.error(message);
//            }
//        }
//    });
////}
//
//Images.allow({
//    insert: function(userId, doc) { return userId != null; },
//    update: function(userId, image) { return userId === image.userId; },
//    remove: function(userId, image) { return userId === image.userId; },
//    download: function() { return true; }
//});

