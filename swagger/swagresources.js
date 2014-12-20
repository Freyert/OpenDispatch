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
          throw swagger.errors.invalid('id');
        }
        else {
          var id = parseInt(req.params.petId);
          console.log(id);
        //  var rider;
      //    Rider.find({ id: id}, function (result) { rider = result; });    
        }
      }
  };
};
