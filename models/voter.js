const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
//Define a schema
const Schema = mongoose.Schema;
const VoterSchema = new Schema ({
    email: {
        type: String,
        required: true,
    },
    dob:{
        type:String,
        required:true
    },
    aadhaar:{
        type:String,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    election_address: {
        type: String,
        required: true
    }
});
// hash user password before saving into database
VoterSchema.pre('save', function(cb) {
    this.password = bcrypt.hashSync(this.password, saltRounds);
    cb();
});

const VoterList=mongoose.model('VoterList', VoterSchema)
module.exports=VoterList
// module.exports = mongoose.model('VoterList', VoterSchema)