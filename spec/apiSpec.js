var mongoose = require('mongoose');
var riderModel = require('../models/rider.js');
var rideModel = require('../models/ride.js');
describe('Models', function() {
          var Rider;
          var Ride;

          afterAll(function (done) {
            dbDrop();
            done();
          });

          beforeAll(function(done) {
            mongoose.connect('mongodb://localhost/test');
            mongoose.connection.on('open', function (err, result) {
              if (err) throw err;
              else {
                Rider = riderModel(mongoose);
                Ride = rideModel(mongoose);
              }
              done();
            });
          });



        function dbCleanse(model, done) {
             model.remove({}, function(err, result) {
              if(err) throw err;
              done();
            });         
        }

        function dbDrop() {
          mongoose.connection.db.dropDatabase();
        }

        function emptyTest(model, done) {
          model.find({}, function(err, results) {
            if (err) throw err;
            else expect(results.length).toBe(0);
            done();
          });
        }

        function singletonTest(instance, model, done) {
            var modelInstance = new model(instance);
            modelInstance.save(function (err) {
              if (err) throw err;
              else {
                model.find({}, function(err, result) {
                  if (err) throw err;
                  else {
                    expect(result.length).toBe(1);
                    done();
                  }
                });
              }
            });
        }

        function duplicatesTest(instance, model, id, done) {
            var modelInstanceA = new model(instance);
            var modelInstanceB = new model(instance);
            modelInstanceA.save(function(err) {
              if(err) throw err;
              else {
                      modelInstanceB.save(function(err) {
                        if(err) {
                         expect(err).toBeDefined(); 
                         throw err;
                        }
                        else {
                          model.find({ id: instance[id] }, function(err, response) {
                            console.log(response);
                          });
                        }
                      });
              }
              done();
            });
        }
        describe('Riders: models', function () {
          var rider1 = {
                          pid: 720075201,
                          firstName: "Fulton",
                          lastName: "Byrne",
                          latitude: 1,
                          longitude: 1,
                          requestStart: Date.now()
                        };
          var rider2 = {
                          pid: 720075202,
                          firstName: "Dr.",
                          lastName: "Strange",
                          latitude: 1,
                          longitude: 1,
                          requestStart: Date.now()
                        };


          afterEach(function(done) {
            dbCleanse(Rider, done);
          });

         it('should have mongoose and rider model', function() {
            expect(mongoose).not.toBe(undefined);
            expect(riderModel).not.toBe(undefined);
          });

          it('should have an empty collection "riders"', function(done) {
            emptyTest(Rider, done);
          });

          it('should have one rider after saving', function(done) {
            singletonTest(rider1, Rider, done);
          });

          /**
            This is handled with mongoose pre middleware on the schema.
            mongoosejs.com/docs/middleware.html
          */
          it('should not allow duplicate PIDs', function(done) {
            duplicatesTest(rider1, Rider, "pid",  done);
          });
        });

        describe('Ride: models', function () {
          var ride1 = {
              pid: 720075201,
              firstName: 'Fulton',
              lastName: 'Byrne',
              start: {
                time: Date.now(),
                latitude: 5,
                longitude: 5
              },
              end: {
                time:Date.now(),
                latitude: 6,
                longitude: 6
              }
          }

          afterEach(function (done) {
            dbCleanse(Ride, done);
          });

          it('should have mongoose and ride model', function() {
            expect(mongoose).not.toBe(undefined);
            expect(rideModel).not.toBe(undefined);
          });

          it('should have an empty collection "rides"', function(done) {
            emptyTest(Ride, done);
          });

          it('should have one ride after saving', function(done) {
            singletonTest(ride1, Ride, done);
          });

        });
});
