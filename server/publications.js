Meteor.publish('images', function(limit, username){
    check(limit, Number);
    
    var findQuery = {published:true};
    
    if (this.userId && Roles.userIsInRole(this.userId, ['admin'])){
        findQuery = {};
    }
    if (username){
        check(username, String);
        var author = Meteor.users.findOne({username: username});
        findQuery = {userId: author._id}
    }
    
    return Images.find(findQuery, {
        limit: limit,
        sort: {uploadedAt: -1}
    });
});


// The user fields we are willing to publish.
const USER_FIELDS = {
    username: 1,
//  emails: 1,
    profile: 1
};

Meteor.publish('singleUser', function (userId) {
  // Make sure userId is a string.
  check(userId, String);

  // Publish a single user - make sure only allowed fields are sent.
  return Meteor.users.find(userId, { fields: USER_FIELDS });
});
