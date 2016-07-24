Template.image.helpers({
    postDate: function(){
       //return moment(this.uploadedAt).format('MMMM Do YYYY, h:mm:ss a');

       return moment(this.uploadedAt).fromNow();
    },
    ownImage: function() {
        return ((this.userId === Meteor.userId()) || Roles.userIsInRole(Meteor.userId(), ['admin']));
    },
    
    displayClass: function(){
        var displayGrid = Session.get('displayGrid');
        if (displayGrid){
            return 's12 m6 l4';
        }
        else{
            return 's12';
        }
    },
    
    publisher: function(){
        Meteor.subscribe('singleUser', this.userId);
        var author = Meteor.users.findOne({ _id: this.userId});
        return author.profile.firstName + " "+ author.profile.lastName;
    },
    
    authorname: function(){
        Meteor.subscribe('singleUser', this.userId);
        var author = Meteor.users.findOne({ _id: this.userId});
        return author.username;
    },
    
    isAdmin: function(){
        return Roles.userIsInRole(Meteor.userId(), ['admin']);
    }
});

Template.image.events({
   'click .delete-image': function(e){
       e.preventDefault();
       
       var sure = confirm('Are you sure you want to delete this image?');
       if (sure === true){
           Images.remove({_id: this._id}, function(error, result){
                if (error){
                    toastr.error("Delete failed... "+ error);
                }
                else{
                    toastr.success("Image deleted!");
                }
            })
       }
   },
    'click .toggle-published': function(e){
        Images.update(this._id, {
            $set: { published: ! this.published },
        });                      
    },
    'click a.thumbnail': function(e){
        if (!this.downloadCount)
            this.downloadCount = 0;
        Images.update(this._id,{
            $set: { downloadCount: this.downloadCount+1 } 
        });
    }
});
