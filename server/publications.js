Meteor.publish('images', function(limit, userSlug){
    check(limit, Number);
    
    var findQuery = {published:true};
    
//    if (this.userId){
//        if (Roles.userIsInRole(this.userId, ['admin'])){
//            findQuery = {};
//        }
//        else{
//            findQuery = {
//                $or : [
//                    {published: true}, 
//                    {userId: this.userId}
//                ]
//            };
//        }
//    }
    
    if (userSlug){
        check(userSlug, String);
//        findQuery.userSlug = userSlug;
        findQuery = {userSlug:userSlug};
//        if (Roles.userIsInRole(this.userId, ['admin'])){
//            findQuery = {userSlug:userSlug};
//        }
//        else{
//            findQuery = {published:true, userSlug:userSlug};
//        }
    }        

    
    
    
//        query = {published:true};
//        console.log(Meteor.userId);

    
    return Images.find(findQuery, {
        limit: limit,
        sort: {uploadedAt: -1}
    });
});

//Meteor.publish('matches', function(limit, username){
//    check(limit, Number);
//    
//    var findQuery = {};
//    if (username){
//        check(username, String);
//        findQuery = {username:username};
//    }
//    
//    return Matches.find(findQuery, {
//        limit: limit
//    })
//});