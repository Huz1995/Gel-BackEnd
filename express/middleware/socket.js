module.exports = (app, io,db) => {
    io.on("connection", function (socket) {
        console.log(db);
        console.log("connected");
    })
}