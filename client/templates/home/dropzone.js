Template.dropzone.events({
    'dropped #dropzone': function(e) {
        var user = Meteor.user();
        
//        console.log(user);
//        console.log('dropped a file');
        FS.Utility.eachFile(e, function(file){
            var newFile = new FS.File(file);
            newFile.username = user.username;
            newFile.userId = user._id;
            newFile.userSlug = Slug.slugify(user.username);
            newFile.published = false;
            newFile.downloadCount = 0;
//            console.log(newFile);
            Images.insert(newFile, function(error, fileObj){
                if (error){
                    toastr.error("Upload failed... please try again.");
                    console.log(error);
                }
                else{
                    toastr.success("upload succeeded!");
                }
            });
        });
    }
});