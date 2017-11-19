// Template.image.helpers({
//     postDate: function(){
//        //return moment(this.uploadedAt).format('MMMM Do YYYY, h:mm:ss a');
//
//        return moment(this.uploadedAt).fromNow();
//     },
//     ownImage: function() {
//         return ((this.userId === Meteor.userId()) || Roles.userIsInRole(Meteor.userId(), ['admin']));
//     },
//
//     displayClass: function() {
//         if (Session.equals('displayGrid', 'true')) {
//             return 's12 m6 l4';
//         }
//         else {
//             return 's12';
//         }
//     },
//
//     publisher: function(){
//         Meteor.subscribe('singleUser', this.userId);
//         var author = Meteor.users.findOne({ _id: this.userId});
//         if (author){
//             return author.profile.firstName + " "+ author.profile.lastName;
//         }
//     },
//
//     authorname: function(){
//         Meteor.subscribe('singleUser', this.userId);
//         var author = Meteor.users.findOne({ _id: this.userId});
//         if (author){
//             return author.username;
//         }
//     },
//
//     isAdmin: function(){
//         return Roles.userIsInRole(Meteor.userId(), ['admin']);
//     }
// });
//
// Template.image.events({
//    'click .delete-image': function(e){
//        e.preventDefault();
//
//        var sure = confirm('Are you sure you want to delete this image?');
//        if (sure === true){
//            Images.remove({_id: this._id}, function(error, result){
//                 if (error){
//                     toastr.error("Delete failed... "+ error);
//                 }
//                 else{
//                     toastr.success("Image deleted!");
//                 }
//             })
//        }
//    },
//     'click .toggle-published': function(e){
//         Images.update(this._id, {
//             $set: { published: ! this.published },
//         });
//     },
//     'click .card-image': function (e) {
//         NProgress.start();
//         FlowRouter.go('/photo/' + $(e.target).data("imageid"));
//         if (this.views === undefined || typeof this.views !== 'number' || this.views <= 0) {
//             Images.update(this._id, {
//                 $set: {views: 1}
//             });
//         }
//         else {
//             Images.update(this._id, {
//                 $set: {views: this.views + 1}
//             });
//         }
//         NProgress.done();
//     }
// //    ,
// //    'click a.thumbnail': function(e){
// //        if (!this.downloadCount)
// //            this.downloadCount = 0;
// //        Images.update(this._id,{
// //            $set: { downloadCount: this.downloadCount+1 }
// //        });
// //    }
// });
