/**
TODO: I need to spend some time figuring out how to 
leverage some inheritance here. This is redunant.
*/

exports.findById = function(swagger, Driver) {
  return {
    "spec": {
      "description": "Selects Drivers by DID",
      "path": "/driver/{driverId}",
      "notes": "Returns a Driver basd on DID",
      "summary": "Find Driver by DID",
      "method": "GET",
      "paramters": [
        swagger.pathParam(
          "driverId",
          "DID of Driver",
          "int32"
        )
      ],
      "type": "Driver",
      "errorResponses": [swagger.errors.invalid("did"),
                         swagger.errors.notFound('driver')],
      "nickname": "getDriverById"
    },
    'action': function(req, res) {
      if(!req.params.driverId) {
        throw console.log("Invalid DID");
      }
      else {
        var id = parseInt(req.params.driverId);
        var sendDriver = function (err, docs) {
          if (docs) {
            res.send(JSON.stringify(docs));
          }
          else {
            res.send(err);
          }
        };
      }
      Driver.find({pid: id}, sendDriver);
    }
  };
};
