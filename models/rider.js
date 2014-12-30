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
  var schema = new mongoose.Schema(
                                {
                                  pid: { type: Number, unique: true},
                                  firstName: String,
                                  lastName: String,
                                  latitude: Number,
                                  longitude: Number,
                                  requestStart: Date
                                });
  
  return mongoose.model('Rider', schema);
}
