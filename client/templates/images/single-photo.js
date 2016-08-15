Template.singlePhoto.helpers({
    'author': function(){
        Meteor.subscribe('singleUser', this.userId);
        var author = Meteor.users.findOne({ _id: this.userId});
        return author;
    },
    'liked': function(){
        liked = Images.findOne({likes:Meteor.userId()});
        return liked;
    }
});

Template.singlePhoto.events({
    'click a.download': function(e){
        if (!this.downloadCount)
            this.downloadCount = 0;
        Images.update(this._id,{
            $set: { downloadCount: this.downloadCount+1 } 
        });
    },
    'click a.like': function(e){
        e.preventDefault();
        if (!this.likes){
            Images.update(this._id,{
                $set: { likes: [Meteor.userId()]}
            });
        }
        else {
            if (Images.findOne({likes:Meteor.userId()})){
                console.log('has like');
                Images.update(this._id,{
                    $pull: { likes: Meteor.userId()}
                });
            }
            else{
                console.log('no like');
                Images.update(this._id,{
                    $addToSet: { likes: Meteor.userId()}
                });
            }
        }
    }
});