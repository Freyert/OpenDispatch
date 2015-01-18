/**
Contains Mongoose Models for
Riders:
  A person requesting a ride from a Vehicle.
Drivers:
  A person who may or may not be currently driving a vehicle.
Route:
  After a ride is completed the origin, destination, and date are 
  stored so that we can gather analytics that might help conserve
  fuel.
*/
module.exports = function (mongoose) {
  var errorRequired = ' is required!';
  var schema = new mongoose.Schema(
                                {
                                  pid: { 
                                        type: Number,
                                        unique: true,
                                        required: '{pid}' + errorRequired
                                  },
                                  firstName: {
                                              type: String,
                                              required: 'firstName' + errorRequired 
                                  },
                                  lastName: {
                                              type: String,
                                              required: '{lastName}' + errorRequired
                                  }
                                });
  
  return mongoose.model('Rider', schema);
}
