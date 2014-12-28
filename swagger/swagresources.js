/**
Dependency Inject Swagger and Database Reference into the Resources.
*/
exports.findRiderById = function(swagger, Rider) {
  return {
    'spec': {
      "description": "Selects Riders by id",
      "path": "/rider/{riderId}",
      "notes": "Returns a Rider based on ID",
      "summary": "Find Rider by ID",
      "method": "GET",
      "parameters" : [
        swagger.pathParam(
          "riderId",
          "ID of Rider that needs to be fetched",
          "int32"
        )
      ],
      "type": "Rider",
      "errorResponses": [swagger.errors.invalid('id'),
                         swagger.errors.notFound('rider')
                        ],
      "nickname": "getRiderById"
      },
      'action': function(req, res) {
        if(!req.params.riderId) {
          throw console.log("Invalid ID");
        }
        else {
          var id = parseInt(req.params.riderId);
          var sendRider = function (err, docs) {
                  if (docs) {
                    res.send(JSON.stringify(docs));
                  }
                  else {
                    res.send(err);
                  }
          }

          Rider.find({pid: id}, sendRider);

        }
      }
  };
};
