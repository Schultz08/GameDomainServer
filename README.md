# GameDomainServer

About the Game.
-------------------------------------
GameDomain is an app where you can play react/js games and compete for the high score.


Setup.
-------------------------------------
To get started you will need to clone this repo and the client side located at https://github.com/Schultz08/GameDomainClient.

Server Side Setup
-------------------------------------
Once cloned for the server side you will need to set up your .env with your DATABASE_URL, PORT, and JWT_SECRET inside the server's server folder.
right click the server folder then click open intergrated terminal inside the terminal run a npm install. If you have issues with node_moduels give a npm update a try.

The server should be good to go.

Client Side Setup
------------------------------------
Once cloned from https://github.com/Schultz08/GameDomainClient. You will needd to go to GameDomainClient > src > helpers > enviroment.js and change the localhost
information to your localhost information. Right click the GameDomainClient folder then click open intergrated terminal.
Inside the terminal run a npm install. If you have issues with node_moduels give a npm update a try.


Features
-----------------------------------
As of 01/13/2020 you will need to log in to access all features.
You can Sign up/Log in. 
Go to the Game Library to play games,
Check a Leaderboard,
A mail system with the functionality to reply to other's who message you.
Admin portal - Admin port is password protected. password can be found in the Admin component.
On the Side Nav bar you can Switch your Theme! (working on the color pallets still)

