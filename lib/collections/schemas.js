Schema = {};

//UserProfile = new Mongo.Collection("userprofile");
Schema.UserProfile = new SimpleSchema({
    firstName: {
        type: String,
        optional: false
    },
    lastName: {
        type: String,
        optional: false
    },
    avatar:{
        type: String,
        autoform: {
            afFieldInput: {
                type: 'fileUpload',
                collection: 'avatar',
                label: 'Choose file',
            }
        },
        optional: true
    },
    birthday: {
        type: Date,
        optional: true
    },
    gender: {
        type: String,
        allowedValues: ['Male', 'Female'],
        optional: true
    },
    organization : {
        type: String,
        optional: true
    },
    website: {
        type: String,
        regEx: SimpleSchema.RegEx.Url,
        optional: true
    },
    bio: {
        type: String,
        optional: true
    }
});
//UserProfile.attachSchema(Schema.UserProfile);

Schema.User = new SimpleSchema({
    username: {
        type: String,
//        unique: true,
        regEx: /^[a-z0-9A-Z_.-]{3,15}$/,
        optional: true
    },
    emails: {
        type: Array,
        // For accounts-password, either emails or username is required, but not both. It is OK to make this
        // optional here because the accounts-password package does its own validation.
        // Third-party login packages may not require either. Adjust this schema as necessary for your usage.
        optional: false
    },
    "emails.$": {
        type: Object
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
        denyUpdate: true
    },
    profile: {
        type: Schema.UserProfile,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Add `roles` to your schema if you use the meteor-roles package.
    // Option 1: Object type
    // If you specify that type as Object, you must also specify the
    // `Roles.GLOBAL_GROUP` group whenever you add a user to a role.
    // Example:
    // Roles.addUsersToRoles(userId, ["admin"], Roles.GLOBAL_GROUP);
    // You can't mix and match adding with and without a group since
    // you will fail validation in some cases.
    roles: {
        type: Object,
        optional: true,
        blackbox: true
    },
    // Option 2: [String] type
    // If you are sure you will never need to use role groups, then
    // you can specify [String] as the type
//    roles: {
//        type: [String],
//        optional: true
//    }    
});

Meteor.users.attachSchema(Schema.User);