Template.singlePhoto.helpers({
    'author': function(){
        Meteor.subscribe('singleUser', this.userId);
        var author = Meteor.users.findOne({ _id: this.userId});
        return author;
    }
});

Template.singlePhoto.events({
    'click a.download': function(e){
        if (!this.downloadCount)
            this.downloadCount = 0;
        Images.update(this._id,{
            $set: { downloadCount: this.downloadCount+1 } 
        });
    }    
});