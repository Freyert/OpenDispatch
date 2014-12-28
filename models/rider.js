module.exports = function (mongoose) {
  var schema = new mongoose.Schema(
                                {
                                  pid: Number,
                                  firstName: String,
                                  lastName: String,
                                  latitude: Number,
                                  longitude: Number,
                                  requestStart: Date
                                });
  return mongoose.model('Rider', schema);
}
