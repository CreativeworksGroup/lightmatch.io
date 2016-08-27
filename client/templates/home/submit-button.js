Template.submitButton.events({
   'change #photo': function(e){
       var user = Meteor.user();
       
       if (user){
         FS.Utility.eachFile(e, function(file){
            var newFile = new FS.File(file);
            newFile.userId = user._id;
            newFile.published = false;
            newFile.downloadCount = 0;
             newFile.likes = [];
            var imgObj = Images.insert(newFile, function(error, fileObj){
                if (error){
                    toastr.error("上载失败⋯⋯ 请重新上载。<br/>Upload failed... please try again.");
                    console.log(error);
                }
                else{
                    
                    $.magnificPopup.open({
                      items: {
                        src: '#uploading-dialog'
                      },
                        closeOnBgClick: false,
                        showCloseBtn: false,
                        enableEscapeKey: false
                    });
                }
            });
            
            newFile.once("uploaded", function(){
                toastr.success("上载成功，正在制作缩图，你很快可在「我的相片」看到。<br/>Upload success! Generating thumbnail... You check this it out from \"My Photo\" soon.");
                $.magnificPopup.close();
                NProgress.start();
                Router.go('/photo/'+imgObj._id+'/submit/');
                NProgress.done();
            })
        });          
       }
       else{
           Router.go('/user/sign-in');
       }
   } 
});

Template.submitButtonNoLogin.events({
    'click #submit-button-nologin': function(e){
        Router.go('/user/sign-in');
    }
});