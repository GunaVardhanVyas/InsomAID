# InsomAID
**InsomAID** uses soothing music, aestheitc visual images to induce sleep and help in aiding Insomnia.

> This website has been implemented using HTML + CSS + NodeJS + MongoDB

<hr>

**Connecting MongoDB server:** <br> 
*requires mongodb installation*<br>
<br>

1. start MongoDB service,(if not running) 
```bash
$ sudo service mongod start
```

2. Check MongoDB status
```bash
$ sudo sysctl mongodb-org status
```

3. To start Mongo database server *usually on port:27017* 
```bash
$ mongosh
```
InsomAID uses the database "people" and connects to the collection "users". 
<hr>

Node Server initiation: <br>
*using Nodemon for Live updating, as nodemon restarts the node server whenever a change is detected* 
```bash
$ nodemon index.js
```