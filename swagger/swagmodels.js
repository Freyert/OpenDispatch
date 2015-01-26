exports.models = {
	"Rider": {
		"id": "Rider",
		"required": ["id", "firstName", "lastName"],
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
      }
    }
	},
  "Position": {
    "time": {
      "type": "string",
      "format": "date-time",
      "description": "The time a certain position is recorded"
    },
    "longitude": {
      "type": "number",
      "format": "float",
      "description": "The longitude of the recorded position"
    },
    "latitude": {
      "type": "number",
      "format": "float",
      "description": "The latitude of the recorded position"
    }
  },
  "Ride": {
    "id": "Ride",
    "required": ["pid", "firstName", "lastName", "start"],
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
      "start": {
        "type": "Position"
      },
      "end": {
        "type": "Position"
      }
    }
  },
  "Driver": {
    "id": "Rider",
    "required": ["did", "firstName", "lastName",
                 "checkIn", "checkOut", "weeklyHours"],
    "properties": {
      "did": {
        "type": "integer",
        "format": "int32",
        "description": "Driver unique identifier",
        "minimum": "0.0",
        "maximum": "4294967295.0"
      },
      "firstName": {
        "type": "string",
        "description": "Driver's first name."
      },
      "lastName": {
        "type": "string",
        "description": "Driver's last name."
      },
      "checkIn": {
        "type": "string",
        "format": "date-time",
        "description": "The time a driver signed in for work",
      },
      "checkOut": {
        "type": "string",
        "format": "date-time",
        "description": "The time a driver signed out from work last."
                      + "NULL if currently driving."
      },
      "weeklyHours": {
        "type": "integer",
        "format": "int32",
        "description": "Number of hours a driver has driven during a week."
        "min": "0.0",
        "max": "60"
      }
    }
  }
}
