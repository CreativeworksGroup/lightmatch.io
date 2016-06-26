var imageStore = new FS.Store.OSS('images',{
  region: Meteor.settings.public.aliyunRegion,
  bucket: Meteor.settings.public.aliyunBucket
});
var thumbStore = new FS.Store.OSS('thumbs',{
  region: Meteor.settings.public.aliyunRegion,
  bucket: Meteor.settings.public.aliyunBucketThumb    
});

Images = new FS.Collection('Images', {
  stores: [thumbStore, imageStore],
  filter: {
    allow: {
      contentTypes: ['image/*']
    }
  }
});

imageStore.on('stored', function(fileObj, storeName){
    console.log('Image stored on Aliyun.');
});

thumbStore.on('stored', function(fileObj, storeName){
    console.log('Thumbnamil stored on Aliyun.');
});

FS.File.prototype.OSSUrl = function(options) {
  var self = this;
//    console.log(self);
  options = options || {};
  options = FS.Utility.extend({
    store: null,
    uploading: null,
    storing: null,
  }, options.hash || options);

  if (options.uploading && !self.isUploaded()) {
    return options.uploading;
  }
//    console.log(self.isMounted());
//    console.log(self.copies);
  if (self.isMounted() && self.copies) {
    var storeName = options.store || self.collection.primaryStore.name;
    var store = storeName ? self.collection.storesLookup[storeName] : self.collection.primaryStore || {};
//      console.log(store);
    var bucket = store.bucket;
    var region = store.region;
    if (!bucket) {
      return null;
    }
    var baseUrl = 'https://' + bucket + '.' + region + '.aliyuncs.com/';
    var fileKey = self.collectionName + '/' + self._id + '-' + self.name();
    return baseUrl + fileKey;
  }
};