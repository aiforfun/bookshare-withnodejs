# Loc8r project is using for studying MEAN
- Install NodeJS + Npm
- Install express: $npm install -g express-generator
# AUTOMATICALLY RESTARTING THE APPLICATION WITH NODEMON
- npm install -g nodemon

# Render project structure
$express

# Install and Run
$npm install
$npm start

# Auto restarting
- $nodemon
- Run on productin mode: $NODE_ENV=production nodemon
- NODE_ENV=production MONGOLAB_URI=mongodb://<username>:<password>@<hostname>:<port>/<database> nodemon start

Access: http://localhost:3000

# Test Pre-deploy to Heroku
$nf start

Access: http://localhost:5000

# Deploy to Heroku
- Heroku will detect new changes from https://github.com/aiforfun/bookshare-withnodejs, master branch and do deploy automatically.
Public URL:
https://bookshare-loc8r.herokuapp.com/

# To get your current the coordinates
- https://whatsmylatlng.com/
