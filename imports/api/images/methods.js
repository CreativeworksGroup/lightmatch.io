import SimpleSchema from 'simpl-schema';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import Images from './images';

// export const insertImage = new ValidatedMethod({
//   name: 'images.insert',
//   validate: new SimpleSchema(Images.schema).validator(),
//   run(image) {
//     return Images.insert({
//       file: image,
//     });
//   },
// });

// export const removeImage = new ValidatedMethod({
//   name: 'images.remove',
//   validate: new SimpleSchema({
//     _id: { type: String },
//   }).validator(),
//   run({ _id }) {
//     Images.remove(_id);
//   },
// });
