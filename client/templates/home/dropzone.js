// Template.dropzone.events({
//     'dropped #dropzone': function(e) {
//         var user = Meteor.user();
//
// //        console.log(user);
// //        console.log('dropped a file');
//         FS.Utility.eachFile(e, function(file){
//             var newFile = new FS.File(file);
// //            newFile.username = user.username;
//             newFile.userId = user._id;
// //            newFile.userSlug = Slug.slugify(user.username);
//             newFile.published = false;
//             newFile.downloadCount = 0;
// //            console.log(newFile);
//             Images.insert(newFile, function(error, fileObj){
//                 if (error){
//                     toastr.error("上载失败⋯⋯ 请重新上载。<br/>Upload failed... please try again.");
//                     console.log(error);
//                 }
//                 else{
// //                    toastr.info("Uploading, please wait...");
// //                    Images.on('stored',function(fileObj, storeName){
// //                        toastr.success("Upload success!");
// //                    })
//
//                     $.magnificPopup.open({
//                       items: {
//                         src: '#uploading-dialog'
//                       },
//                         closeOnBgClick: false,
//                         showCloseBtn: false,
//                         enableEscapeKey: false
// //                      type: 'inline'
//                     });
//                 }
//             });
//
//             newFile.once("uploaded", function(){
//                 toastr.success("上载成功，正在制作缩图，你很快可在「我的相片」看到。<br/>Upload success! Generating thumbnail... You check this it out from \"My Photo\" soon.");
//                 $.magnificPopup.close();
//             })
//         });
//     }
// });