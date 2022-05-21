# typescript-mongo-example
<h1>About the project</h1>
Simple CRUD opertaions that allow a user to book a slot in a parking lot to demonstrate use of MongoDB, TypeScript and ExpressJS

<ol>
How to run the project:
<li>You can set up a new profile the file ./src/config/config.json. I have added sample "local" profile which get's picked by default</li>
<li>In order for the code to pick up your custom profile add an environment variable "ACTIVE_PROFILE"</li>
<li>Execute command "npm run compile" - this will compile the .ts files and generate the .js files</li>
<li>Execute command "node ./lib/server.js" or Import the code in vscode, open server.ts and press F5</li>
<li>Import the collection tess-hp.postman_collection.json in Postman and test</li>
</ol>