export const ImageFilter = (req, file, cb) => {
  if (file.originalname.match(/\.(jpg | png | jpeg)$/)) {
    return cb(new Error('Invalid format'), false);
  }
  return cb(null, true);
};
