# command to run the project:
npm run dev

type it under the root path "/node_simple_server"
better dont change the root floder name, not sure it will work or not after you change it

server:
npm init
npm install bcrypt@1.0.3 body-parser concurrently cookie-parser --save
npm install express jsonwebtoken--save
client:
npm install axios react-router-dom --save
npm install http-proxy-middleware --save

# Install Instructions
use: npm install
to install all depencies in the package.json

# Change log
10/18/2018 UPDATE
install depencies
npm install jsonwebtoken --save
npm install jwt-decode --save
create authserver.js
modify login.js
create item.js
modify srever.js

10/22/2018 update
basic validation for login. able to display error message if user enter wrong password or didn't enter user name

10/24/2018 update
update basic look for aisle, and rating star
new depencies: react-stars

11/14/2018 update
MAC users, if you cannot git pull due to the existance of .DS_Store file
run the following command

rm .DS_Store
git add -A
git commit -m "Added .gitignore file"

then git pull

11/21/2018
Updated email reciept, need to get a new email in the youremail@gmail.com and password there