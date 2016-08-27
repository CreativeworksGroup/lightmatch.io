Fiber = Npm.require('fibers');

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = parseInt(degrees) + parseInt(minutes)/60 + parseInt(seconds)/(60*60);
    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
}

var imageStore = new FS.Store.OSS("images", {
  region: Meteor.settings.public.aliyunRegion,
  internal: Meteor.settings.public.aliyunInternal,
  bucket: Meteor.settings.public.aliyunBucket,
  accessKeyId: Meteor.settings.public.aliyunAccessId, 
  secretAccessKey: Meteor.settings.public.aliyunAccessKeySecret,
//  transformWrite: function(fileObj, readStream, writeStream) {
////      gm(readStream, fileObj.name()).identify("%[EXIF:*]", function(err, format){
////          //Images.update({_id: this._id, })
//////          console.log(fileObj);
////          Fiber(function(){Images.update(fileObj._id, {'exif': format});}).run();
////      });
//  }
});

var thumbStore = new FS.Store.OSS("thumbs", {
  region: Meteor.settings.public.aliyunRegion,
  internal: Meteor.settings.public.aliyunInternal,
  bucket: Meteor.settings.public.aliyunBucketThumb,
  accessKeyId: Meteor.settings.public.aliyunAccessId, 
  secretAccessKey: Meteor.settings.public.aliyunAccessKeySecret,
  beforeWrite: function(fileObj) {
    fileObj.size(200, {store: 'thumbStore', save: false});
  },
  transformWrite: function(fileObj, readStream, writeStream) {          
      gm(readStream, fileObj.name()).identify("%[EXIF:*]", function(err, format){

          var tmpExif = format.split("\n");
          var exif = {};
          for (i=0; i<tmpExif.length; i++){
              var data = tmpExif[i].split("=");
              exif[data[0]] = data[1];
          }
          
          var lat = '';
          var lng = '';
          
          if (typeof exif.GPSLatitude != "undefined"){
              lat = exif.GPSLatitude.split(",");
              lng = exif.GPSLongitude.split(",");

              lat = ConvertDMSToDD(lat[0].substr(0,lat[0].length-2),lat[1].substr(0,lat[1].length-2),lat[2].substr(0,lat[2].length-4), exif.GPSLatitudeRef);
              lng = ConvertDMSToDD(lng[0].substr(0,lng[0].length-2),lng[1].substr(0,lng[1].length-2),lng[2].substr(0,lng[2].length-4), exif.GPSLongitudeRef);
          }
          
          Fiber(function(){fileObj.update({
              $set: {
                  'exif' : exif, 
                  'location':{'lat':lat, 'lng': lng}
              }
          })}).run();
      });

      gm(readStream, fileObj.name()).autoOrient().resize('1800', '1800').stream().pipe(writeStream)
  }
});

//Schemas = {};

Images = new FS.Collection("Images", {
    stores: [thumbStore, imageStore],
    filter: {
        allow: {
            contentTypes: ['image/*']
        },
        onInvalid: function(message) {
            toastr.error(message);
        }
    }
});

Images.allow({
    insert: function(userId, doc) { return userId != null; },
//    update: function(userId, image) { return userId === image.userId; },
    update: function(userId, image, fields, modifier) { 
        return ((userId === image.userId) || _.contains(fields, 'downloadCount') || _.contains(fields, 'likes') || Roles.userIsInRole(userId, ['admin']));
    },
    remove: function(userId, image) { return ((userId === image.userId) || Roles.userIsInRole(userId, ['admin'])); },
    download: function() { return true; }
});