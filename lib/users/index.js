const MongoClient = require('mongodb').MongoClient;

class User {
    create (req, res) {
        const { email, name, password } = req.body;
        // Connection URL
        const url = 'mongodb://localhost:27017';

// Database Name
        const dbName = 'myproject';

// Use connect method to connect to the server
        MongoClient.connect(url, function(err, client) {
            const db = client.db(dbName);
            console.log("Connected successfully to server");
            db.collection('users').insert(req.body, function (err, doc) {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({ success: false, message: err.message }))
                }
                res.statusCode = 201;
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true, message: 'Se resistro correctamente ' + name }))
                client.close();
            });
        });
    }
}

module.exports = User;