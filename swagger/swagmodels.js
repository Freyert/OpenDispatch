exports.models = {
	"Rider": {
		"id": "Rider",
		"required": ["id", "name"],
		"properties": {
			"pid": {
				"type": "integer",
				"format": "int32",
				"description": "Category unique identifier",
				"minimum": "0.0",
				"maximum": "4294967295.0"
			},
      "firstName": {
              "type": "string",
              "description": "Rider's first name"
      },
      "lastName": {
              "type": "string",
              "description": "Rider's last name"
      },
      "latitude": {
              "type": "integer",
              "format": "int32",
              "description": "A rider's current latitude",
              "minimum": "-2147483647.0",
              "maximum": "2147483647.0"
      }, 
      "longitude": {
              "type": "integer",
              "format": "int32",
              "description": "A rider's current latitude",
              "minimum": "-2147483647.0",
              "maximum": "2147483647.0"
      },
      "requestStart": {
        "type": "string",
        "format": "date-time" 
      }
    }
	}
}
