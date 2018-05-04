const MongoClient = require('mongodb').MongoClient;
const _URL = 'mongodb://localhost:27017';
const _DBNAME = 'myproject';
const ObjectId = require('mongodb').ObjectId;

class User {
    create (req, res) {
        const { email, name, password } = req.body;
        // Use connect method to connect to the server
        MongoClient.connect(_URL, function(err, client) {
            const db = client.db(_DBNAME);
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
    read (req, res) {
        // Use connect method to connect to the server
        MongoClient.connect(_URL, function(err, client) {
            const db = client.db(_DBNAME);
            db.collection('users').find({}).toArray( (err, documents) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: err.message }));
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true, message: 'Operation success', data: documents }));
                client.close();
            });
        })
    }
    readOne (req, res) {
        const id = req.params.id;
        // Use connect method to connect to the server

        MongoClient.connect(_URL, function(err, client) {
            const db = client.db(_DBNAME);
            db.collection('users').findOne({ _id: new ObjectId(id) }, (err, document) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: err.message }));
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true, message: 'Operation success', data: document }));
                client.close();
            });
        })

    }
    update (req, res) {
        const id = req.params.id;
        // Use connect method to connect to the server

        MongoClient.connect(_URL, function(err, client) {
            const db = client.db(_DBNAME);
            db.collection('users').updateOne({ _id: new ObjectId(id) }, { $set: req.body }, (err, document) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ success: false, message: err.message }));
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true, message: 'Operation success' }));
                client.close();
            });
        })
    }
}

module.exports = User;