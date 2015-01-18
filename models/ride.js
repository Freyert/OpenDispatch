

module.exports = function (mongoose) {
  var errorRequired = ' is required!';
  var position = {
                time: {
                        type: Date,
                        required: '{time}' + errorRequired
                },
                latitude: {
                            type: Number,
                            required: '{latitude)' + errorRequired
                },
                longitude: {
                            type: Number,
                            required: '{longitude}' + errorRequired
                }
              };

  var schema = new mongoose.Schema(
                                {
                                  pid: {
                                    type: Number,
                                    unique: true,
                                    required: '{pid}' + errorRequired
                                  },
                                  firstName: {
                                    type: String,
                                    required: '{firstName}' + errorRequired
                                  },
                                  lastName: {
                                    type: String,
                                    required: '{lastName}' + errorRequired
                                  },
                                  start: position,
                                  end: position
                                }
  );
  return mongoose.model('Ride', schema);
}
