# Start MongoDB
- $sudo service mongod start

# Verify that MongoDB has started successfully
- /var/log/mongodb/mongod.log
- [initandlisten] waiting for connections on port <port>
- where <port> is the port configured in /etc/mongod.conf, 27017 by default.

# Stop MongoDB.
- $Stop MongoDB.¶

# Restart MongoDB.
- $sudo service mongod restart

# Mongo Shell common commands
- Open Mongo Shell: $mongo
- LISTING ALL LOCAL DATABASES: >show dbs
- USING A SPECIFIC DATABASE: >use local
- LISTING THE COLLECTIONS IN A DATABASE: >show collections
- SEEING THE CONTENTS OF A COLLECTION: >db.collectionName.find(queryObject)
- db.locations.find().pretty()

# Live DB https://mlab.com/
- To connect using the mongo shell: $mongo ds129776.mlab.com:29776/loc8r -u <dbuser> -p <dbpassword>
- To connect using a driver via the standard MongoDB URI: mongodb://<dbuser>:<dbpassword>@ds129776.mlab.com:29776/loc8r

# UMPING THE DATA FROM THE DEVELOPMENT DATABASE
- $ mongodump -h localhost:27017 -d Loc8r -o ~/tmp/mongodump

- $ mongorestore -h ds129776.mlab.com:29776 -d loc8r -u <dbuser> -p <dbpassword> ~/tmp/mongodump/Loc8r

# TESTING THE LIVE DATABASE
