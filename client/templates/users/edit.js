
// Template.editProfile.helpers({
//     user: function() {
//         return Meteor.user();
//     }
// });

AutoForm.hooks({
    updateProfileForm: {
   //  	before : {
			// update: function(error) {
			// 	if (error) {
			// 		console.log("Update Error:", error);
			// 		AutoForm.debug();
			// 	} else {
			// 		console.log("Updated!");
			// 		console.log('AutoForm.debug()');
			// 	}
			// }
   //  	},
		// onSubmit: function (insertDoc, updateDoc, currentDoc) {
		// 	if (customHandler(insertDoc)) {
		// 		this.done();
		// 	} else {
		// 		this.done(new Error("Submission failed"));
		// 	}
		// 	// this.done(new Error("Submission failed  2"));
		// 	return false;
		// },
        after:  {
            update: function(error, result) {
            	console.log("Error" , error);
            	console.log("result", result);
                FlowRouter.go('/profile/edit');
            }
        }
    }
});