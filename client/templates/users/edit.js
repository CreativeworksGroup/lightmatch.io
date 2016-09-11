AutoForm.hooks({
    updateProfileForm: {
        after:  {
            update: function() {
                Router.go('/');
            }
        }
    }
});