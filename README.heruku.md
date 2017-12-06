# Set Heroku Environment
$heroku config:set MONGOLAB_URI=your_db_uri --app bookshare-loc8r

# View log
$heroku logs --app bookshare-loc8r

# ADDING MONGOLAB TO THE HEROKU APPLICATION
$ heroku addons:add mongolab --app bookshare-loc8r

$ heroku addons:open mongolab --app bookshare-loc8r

# The command to get the database URI is
$ heroku config:get MONGOLAB_URI --app bookshare-loc8r

# Ensuring Heroku is using production mode
$ heroku config:set NODE_ENV=production --app bookshare-loc8r
