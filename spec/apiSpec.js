var mongoose = require('mongoose');
var riderModel = require('../models/rider.js');

describe('Models', function() {

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
          var db;
          var Rider;
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


          beforeAll(function(done) {
            mongoose.connect('mongodb://localhost/test');
            mongoose.connection.on('open', function (err, result) {
              if (err) throw err;
              else {
                Rider = riderModel(mongoose);
              }
              done();
            });
          });

          afterEach(function(done) {
            Rider.remove({}, function(err, result) {
              if(err) throw err;
              else done();
            });
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
});
