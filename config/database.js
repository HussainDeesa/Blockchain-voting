// Set up mongoose connection
const mongoose = require('mongoose');
const { MongoClient } = require("mongodb");
const mongoDB = 'mongodb://localhost:27017/Votes';
const username = encodeURIComponent("Hussain");
const password = encodeURIComponent("Hussain@7860");

const mongoURi=`mongodb+srv://${username}:${password}@cluster0.zsk9v9d.mongodb.net/?retryWrites=true&w=majority`

// `mongodb+srv://Hussain:<password>@cluster0.zsk9v9d.mongodb.net/?retryWrites=true&w=majority`


// mongoose.connect(mongoURi,{ useNewUrlParser: true });
// mongoose.Promise = global.Promise;

const connectToMongo =  () => {
     mongoose.connect(mongoURi, { useUnifiedTopology:true,useNewUrlParser:true
    }).then(() => {
        console.log('connected to mongo successfully');
    }).catch((e) => {
        console.log(e, 'not connected');
    });
} 




// module.exports = mongoose;
module.exports=connectToMongo