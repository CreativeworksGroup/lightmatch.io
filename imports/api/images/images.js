import SimpleSchema from 'simpl-schema';
import { Factory } from 'meteor/dburles:factory';
import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { FilesCollection } from 'meteor/ostrio:files';
import oss from 'ali-oss';
import fs from 'fs';
import co from 'co';

const store = oss({
  accessKeyId: Meteor.settings.public.aliyunAccessId,
  accessKeySecret: Meteor.settings.public.aliyunAccessKeySecret,
  bucket: Meteor.settings.public.aliyunBucket,
  region: Meteor.settings.public.aliyunRegion,
  internal: Meteor.settings.public.aliyunInternal,
});

const Images = new FilesCollection({
  debug: false,
  // storagePath: 'assets/app/uploads/uploadedFiles',
  collectionName: 'Images',
  allowClientCode: false,
  onBeforeUpload(file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 10485760 && /png|jpg|jpeg/i.test(file.extension)) {
      return true;
    }
    return 'Please upload image, with size equal or less than 10MB';
  },
  onAfterUpload(fileRef) {
    _.each(fileRef.versions, (vRef, version) => {
      co(function* () {
        const object = yield store.put(fileRef.name, fs.createReadStream(fileRef.path));
        // console.log(object);
      }).catch(err => console.error(err.stack));
    });
  },
  interceptDownload(http, fileRef, version) {
    co(function* () {
      const result = yield store.getStream(fileRef.name);
      result.stream.pipe(http.response);
      // console.log(result);
    }).catch(err => console.error(err.stack));

    return true;
  },
});

if (Meteor.isClient) {
  Meteor.subscribe('files.images.all');
}

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function() {
    return Images.find().cursor;
  });
}

Images.collection.attachSchema(new SimpleSchema(Images.schema));

// Images.allow({
//   insert: () => false,
//   update: () => false,
//   remove: () => false,
// });

// Images.deny({
//   insert: () => true,
//   update: () => true,
//   remove: () => true,
// });

// Factory.define('image', Images, {
//   text: () => 'Factory',
// });

// Fiber = Npm.require('fibers');
//
// function ConvertDMSToDD(degrees, minutes, seconds, direction) {
//     if (isNaN(degrees)){
//         degrees = eval(degrees);
//     }
//     if (isNaN(minutes)){
//         minutes = eval(minutes);
//     }
//     if (isNaN(seconds)){
//         seconds = eval(seconds);
//     }
//     var dd = parseFloat(degrees) + parseFloat(minutes)/60 + parseFloat(seconds)/(60*60);
//     if (direction == "S" || direction == "W") {
//         dd = dd * -1;
//     } // Don't do anything for N or E
//     return dd;
// }
//
// var imageStore = new FS.Store.OSS("images", {
//   region: Meteor.settings.public.aliyunRegion,
//   internal: Meteor.settings.public.aliyunInternal,
//   bucket: Meteor.settings.public.aliyunBucket,
//   accessKeyId: Meteor.settings.public.aliyunAccessId,
//   secretAccessKey: Meteor.settings.public.aliyunAccessKeySecret,
// //  transformWrite: function(fileObj, readStream, writeStream) {
// ////      gm(readStream, fileObj.name()).identify("%[EXIF:*]", function(err, format){
// ////          //Images.update({_id: this._id, })
// //////          console.log(fileObj);
// ////          Fiber(function(){Images.update(fileObj._id, {'exif': format});}).run();
// ////      });
// //  }
// });
//
// var thumbStore = new FS.Store.OSS("thumbs", {
//   region: Meteor.settings.public.aliyunRegion,
//   internal: Meteor.settings.public.aliyunInternal,
//   bucket: Meteor.settings.public.aliyunBucketThumb,
//   accessKeyId: Meteor.settings.public.aliyunAccessId,
//   secretAccessKey: Meteor.settings.public.aliyunAccessKeySecret,
//   beforeWrite: function(fileObj) {
//     fileObj.size(200, {store: 'thumbStore', save: false});
//   },
//   transformWrite: function(fileObj, readStream, writeStream) {
//       gm(readStream, fileObj.name()).identify("%[EXIF:*]", function(err, format){
//
//           var tmpExif = format.split("\n");
//           var exif = {};
//           for (i=0; i<tmpExif.length; i++){
//               var data = tmpExif[i].split("=");
//               exif[data[0]] = data[1];
//           }
//
//           var lat = '';
//           var lng = '';
//
//           if (typeof exif.GPSLatitude != "undefined"){
//               lat = exif.GPSLatitude.split(",");
//               lng = exif.GPSLongitude.split(",");
//
//               lat = ConvertDMSToDD(lat[0],lat[1],lat[2], exif.GPSLatitudeRef) || 0;
//               lng = ConvertDMSToDD(lng[0],lng[1],lng[2], exif.GPSLongitudeRef) || 0;
//           }
//
//           Fiber(function(){fileObj.update({
//               $set: {
//                   'exif' : exif,
//                   'location':{'lat':lat, 'lng': lng}
//               }
//           })}).run();
//
// //          console.log(exif);
//       });
//
//       gm(readStream, fileObj.name()).autoOrient().resize('1800', '1800').stream().pipe(writeStream)
//   }
// });
//
// //Schemas = {};
//
// Images = new FS.Collection("Images", {
//     stores: [thumbStore, imageStore],
//     filter: {
//         allow: {
//             contentTypes: ['image/*']
//         },
//         onInvalid: function(message) {
//             toastr.error(message);
//         }
//     }
// });
//
// Images.allow({
//     insert: function(userId, doc) { return userId != null; },
// //    update: function(userId, image) { return userId === image.userId; },
//     update: function(userId, image, fields, modifier) {
//         return ((userId === image.userId) || _.contains(fields, 'downloadCount') || _.contains(fields, 'likes') || Roles.userIsInRole(userId, ['admin']));
//     },
//     remove: function(userId, image) { return ((userId === image.userId) || Roles.userIsInRole(userId, ['admin'])); },
//     download: function() { return true; }
// });
export default Images;
