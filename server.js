const http = require('http');
const app = require('./express/app.js');

/* set up the port variable*/
const port = process.env.PORT || '3000';
app.set("port",port);


/*create server using express app and listen on port*/
const server = http.createServer(app);
server.listen(port, () => console.log(`Server running at port ${port}`));