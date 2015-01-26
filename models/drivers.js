/**
Contains Mongoose model for Drivers
A person who may or may not be currently driving.
This will be tracked by a check-in/check-out time.

TODO: Refactor Driver and Rider to inherit from a person object.
Person object has id, firstName, and lastName.
**/
module.exports = function (mongoose) {
  var errorRequired = ' is required!';
  var schema = new mongoose.Schema(
    {
      rid: {
        type: Number,
        unique: true,
        required: '{rid}' + errorRequired
      },
      firstName: {
        type: String,
        required: '{firstName}' + errorRequired
      },
      lastName: {
        type: String,
        required: '{lastName}' + errorRequired
      },
      checkIn: {
        type: Date,
        required: '{checkIn}' + errorRequired
      },
      checkOut: {
        type: Date,
        required: '{checkOut}' + errorRequired //Null if they are driving.
      },
      weeklyHours: {
        type: Number,
        required: '{monthlyHours}' + errorRequired
      }
    });

  return mongoose.model('Driver', schema);
}
