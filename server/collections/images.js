Fiber = Npm.require('fibers');

function ConvertDMSToDD(degrees, minutes, seconds, direction) {
    if (isNaN(degrees)){
        degrees = eval(degrees);
    }
    if (isNaN(minutes)){
        minutes = eval(minutes);
    }
    if (isNaN(seconds)){
        seconds = eval(seconds);
    }
    var dd = parseFloat(degrees) + parseFloat(minutes)/60 + parseFloat(seconds)/(60*60);
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
    let g = gm(readStream, fileObj.name());
      g.identify("%[EXIF:*]", Meteor.bindEnvironment(function(err, format){
        if (err){
          fileObj.remove();
        }
        else{
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

              lat = ConvertDMSToDD(lat[0],lat[1],lat[2], exif.GPSLatitudeRef) || 0;
              lng = ConvertDMSToDD(lng[0],lng[1],lng[2], exif.GPSLongitudeRef) || 0;
          }

          fileObj.update({
              $set: {
                  'exif' : exif,
                  'location':{'lat':lat, 'lng': lng}
              }
          });
        }
//          console.log(exif);
      }));

      g.identify({bufferStream:true}, Meteor.bindEnvironment(function(err, format){
        if (err){
          fileObj.remove();
        }
        else{
          g.autoOrient().resize('1800', '1800').stream().pipe(writeStream)
        }
      }));
      // gm(readStream, fileObj.name()).
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
