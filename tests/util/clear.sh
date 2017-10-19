docker exec mongo mongo datapoint --eval "db.users.deleteMany({ email: /^test/ })"
