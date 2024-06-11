#!/usr/bin/env bash

# setup elasticsearch indices
curl -i -X PUT -H "Accept:application/json" -H  "Content-Type:application/json" http://localhost:9200/employee?include_type_name=true -d @configs/es-employee-index.json