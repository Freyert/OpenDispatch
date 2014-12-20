exports.models = {
	"Rider": {
		"id": "Rider",
		"required": ["id", "name"],
		"properties": {
			"id": {
				"type": "integer",
				"format": "int32",
				"description": "Category unique identifier",
				"minimum": "0.0",
				"maximum": "4294967295.0"
			},
		"name": {
			"type": "string",
			"description": "Name of the category"
			}
		}
	}
}
