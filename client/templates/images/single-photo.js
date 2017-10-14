Template.singlePhoto.onRendered(function() {
    //$("a.modal-trigger").modal();
    //console.log($("a.modal-trigger"));
    $("a.modal-trigger").magnificPopup({
        type:'inline',
        midClick: true,
        zoom: {
            enabled: true, // By default it's false, so don't forget to enable it

            duration: 300, // duration of the effect, in milliseconds
            easing: 'ease-in-out', // CSS transition easing function

            // The "opener" function should return the element from which popup will be zoomed in
            // and to which popup will be scaled down
            // By defailt it looks for an image tag:
            opener: function(openerElement) {
              // openerElement is the element on which popup was initialized, in this case its <a> tag
              // you don't need to add "opener" option if this code matches your needs, it's defailt one.
              return openerElement.is('div') ? openerElement : openerElement.find('div');
            }
        }
    });
});

Template.singlePhoto.helpers({
    image: function () {
        let image = Images.findOne({_id: FlowRouter.getParam('_id')});
        if (image) {
            return image;
        }
    },
    author: function(){
        Meteor.subscribe('singleUser', this.userId);
        Meteor.subscribe('avatar');
        var author = Meteor.users.findOne({_id: this.userId});
        return author;
    },
    liked: function(){
        liked = Images.findOne({_id: this._id, likes:Meteor.userId()});
        return liked;
    },
    postDate: function(){
        return moment(this.uploadedAt).format('LL');
    },
//    hasAvatar: function(){
//        Meteor.subscribe('singleUser', this.userId);
//        var author = Meteor.users.findOne({_id: this.userId});
//        if (author.profile.avatar != undefined){
//            return true;
//        }
//        return false;
//    },
    avatar: function(){
        Meteor.subscribe('singleUser', this.userId);
        var author = Meteor.users.findOne({_id: this.userId});
        if (author.facebookId != undefined){
            return 'http://graph.facebook.com/'+author.facebookId+'/picture?type=square';
        }
        else
            return '/img/profile.svg';
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
            if (Images.findOne({_id: this._id, likes:Meteor.userId()})){
                Images.update(this._id,{
                    $pull: { likes: Meteor.userId()}
                });
            }
            else{
                Images.update(this._id,{
                    $addToSet: { likes: Meteor.userId()}
                });
            }
        }
    }
});