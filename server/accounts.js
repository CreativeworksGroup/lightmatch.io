// Set up login services
Meteor.startup(function() {
  // Add Facebook configuration entry

  ServiceConfiguration.configurations.update(
    { service: "facebook" },
    { $set: {
        appId: "1758802494400879",
        secret: "ce650fc915fc64edc37cc5c9c61cc03f"
      }
    },
    { upsert: true }
  );


  // Add GitHub configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "github" },
    { $set: {
        clientId: "XXXXXXXXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */

  // Add Google configuration entry
//  ServiceConfiguration.configurations.update(
//    { service: "google" },
//    { $set: {
//        clientId: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//        client_email: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//        secret: "XXXXXXXXXXXXXXXXXXXXXXXX"
//      }
//    },
//    { upsert: true }
//  );

  // Add Linkedin configuration entry
  /*
  ServiceConfiguration.configurations.update(
    { service: "linkedin" },
    { $set: {
        clientId: "XXXXXXXXXXXXXX",
        secret: "XXXXXXXXXXXXXXXX"
      }
    },
    { upsert: true }
  );
  */
});