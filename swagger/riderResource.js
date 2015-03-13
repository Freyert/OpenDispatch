/**
Dependency Inject Swagger and Database Reference into the Resources.
*/
var sendDocs = require('./resource').prototype.sendDocs;


exports.findById = function(swagger, Rider) {
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
          var sendRider = sendDocs.bind(res);

          Rider.findOne({pid: id}, sendRider);

        }
      }
  };
};

exports.post = function (swagger, Rider) {
  return {
    "spec": {
      "description": "Posts a new Rider",
      "path": "/rider",
      "notes": "Adds a new Rider to the Database",
      "summary": "Post a new Rider to the Database",
      "method": "POST",
      "parameters": [swagger.paramTypes.body("body", "Rider object to be added", "Rider")],
      "type": "Rider",
      "errorResponses": [swagger.errors.invalid('id')],
      "nickname": "postRider"
    },
    "action": function(req, res) {
      var rider = new Rider(req.body);
      rider.save(function (err) {
        if(err) {
          res.send(err);
        }
        else res.status(200).end();
      })
    }
  }
};
