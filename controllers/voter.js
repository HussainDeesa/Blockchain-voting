const VoterModel = require("../models/voter");

const bcrypt = require("bcrypt");

const path = require("path");
const { createHmac }= require("node:crypto");
const murmurhash = require('murmurhash')
var nodemailer = require("nodemailer");
const { log } = require("console");

const saltRounds = 10;

module.exports = {
  create: function (req, res, cb) {
    VoterModel.findOne(
      { phone: req.body.phone, election_address: req.body.election_address },
      function (err, result) {
        if (err) {
          cb(err);
        } else {
          if (!result) {
            VoterModel.create(
              {
                phone: req.body.phone,
                aadhaar:req.body.aadhaar,
                dob:req.body.dob,
                election_address: req.body.election_address,
              },
              function (err, voter) {
                if (err) cb(err);
                else {
                  console.log(voter);

                  console.log(voter.phone);

                  console.log(req.body.election_description);

                  console.log(req.body.election_name);
                  res.json({
                    status: "success",
                    message: "Voter added successfully!!!",
                    data: null,
                  });
                
                }
              }
            );
          } else {
            res.json({
              status: "error",
              message: "Voter already exists ",
              data: null,
            });
          }
        }
      }
    );
  }, 
  generateHash: async function(req,res,cb){
    const salt = await bcrypt.genSalt(10)
    data=req.body.str
    console.log(salt);

    const secret = 'abcdefg';
    const hash = createHmac('sha256', secret)
    .update(data)
    .digest('hex');
    res.json({
      status: "success",
      message: "Hash generated!!!",
      data: {
       hash:hash
      },
    });
  },
  authenticate: async function (req, res, cb) {
    console.log(req);
    console.log(req.body.aadhaar);
    console.log(req.body.dob);
    console.log(req.body.aadhaar+req.body.dob);
    const salt = await bcrypt.genSalt(10)
    data=req.body.aadhaar+req.body.dob+req.body.phone
    veriferhash=murmurhash.v2(data)
    console.log("Verifer hash "+veriferhash);
    VoterModel.findOne( 
      { aadhaar: req.body.aadhaar, dob: req.body.dob,phone:req.body.phone },
      async function (err, voterInfo) {
       const salt = await bcrypt.genSalt(10)
      if(voterInfo){
        proverdata=voterInfo.aadhaar+voterInfo.dob+voterInfo.phone
        proverhash=murmurhash.v2(proverdata)
        console.log("Prover hash "+proverhash);
      }
        if (err) cb(err);
        else {
          if (voterInfo && voterInfo.election_status==true){
            console.log("ZKP status true");
            res.json({
              status: "success",
              message: "voter found!!!",
              data: {
                id: voterInfo._id,
                election_address: voterInfo.election_address,
                dob:voterInfo.dob
              },
            }); 
          }
          else if(voterInfo && voterInfo.election_status==false){
            res.json({
              election_status:"end",
            });
          }
          //res.sendFile(path.join(__dirname+'/index.html'));
          else {
            console.log("ZKP status false");
            res.json({
              status: "error",
              message: "Invalid Crediantials!",
              data: null,
            });
          }
        }
      }
    );
  },

  changestatus: function (req, res, cb) {
   
    console.log("changing statuses");
    VoterModel.updateMany(
				{ election_address:req.body.election_address},{$set:{election_status:false}},
				function (err, voterInfo) {
				  if (!err) {
            res.json({
              status: "success"
            });
          }
				  else {
						console.log("updated successfully");
				  }
				} 
			  );
    
  },
  
  changestatustrue: function (req, res, cb) {
    console.log("changing statuses");
    VoterModel.updateMany(
				{ election_address:req.body.election_address},{$set:{election_status:true}},
				function (err, voterInfo) {
				  if (!err) {
            res.json({
              status: "success"
            });
          }
				  else {
						console.log("updated successfully");
				  }
				} 
			  );
  },

  getAll: function (req, res, cb) {
    let voterList = [];

    VoterModel.find(
      { election_address: req.body.election_address },
      function (err, voters) {
        if (err) cb(err);
        else {
          for (let voter of voters)
            voterList.push({ id: voter._id, phone: voter.phone,aadhaar:voter.aadhaar,dob:voter.dob });

          count = voterList.length;

          res.json({
            status: "success",
            message: "voters list found!!!",
            data: { voters: voterList },
            count: count,
          });
        }
      }
    );
  },

  updateById: function (req, res, cb) {
    VoterModel.findOne({ phone: req.body.phone }, function (err, result) {
      if (err) {
        cb(err);
      } else {
        console.log("phone:" + req.body.phone);
        console.log("findOne:" + result);
        if (!result) {
    
          console.log("phone not found");
          console.log("voterID:" + req.params.voterId);
          VoterModel.findByIdAndUpdate(
            req.params.voterId,
            { phone: req.body.phone, password: password },
            function (err, voter) {
              if (err) cb(err);
              console.log("update method object:" + voter);
            }
          );
          VoterModel.findById(req.params.voterId, function (err, voterInfo) {
            if (err) cb(err);
            else {
              console.log("Inside find after update" + voterInfo);
              var transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.PASSWORD,
                },
              });
              const mailOptions = {
                from: process.env.EMAIL, // sender address
                to: voterInfo.email, // list of receivers
                subject: req.body.election_name, // Subject line
                html:
                  req.body.election_description +
                  "<br>Your voting id is:" +
                  voterInfo.email +
                  "<br>" +
                  "Your password is:" +
                  voterInfo.password +
                  '<br><a href="url">Click here to visit the website</a>', // plain text body
              };
              transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                  res.json({
                    status: "error",
                    message: "Voter could not be added",
                    data: null,
                  });
                  console.log(err);
                } else {
                  console.log(info);
                  res.json({
                    status: "success",
                    message: "Voter updated successfully!!!",
                    data: null,
                  });
                }
              });
            }
          });
        } else {
          res.json({
            status: "error",
            message: "Voter already exists ",
            data: null,
          });
        }
      }
    });
  },

  deleteById: function (req, res, cb) {
    VoterModel.findByIdAndRemove(req.params.voterId, function (err, voterInfo) {
      if (err) cb(err);
      else {
        res.json({
          status: "success",
          message: "voter deleted successfully!!!",
          data: null,
        });
      }
    });
  },

  resultMail: function (req, res, cb) {
    VoterModel.find(
      { election_address: req.body.election_address },
      function (err, voters) {
        if (err) cb(err);
        else {
          const election_name = req.body.election_name;

          const winner_candidate = req.body.winner_candidate;

          for (let voter of voters) {
            var transporter = nodemailer.createTransport({
              service: "gmail",

              auth: {
                user: process.env.EMAIL,

                pass: process.env.PASSWORD,
              },
            });

            const mailOptions = {
              from: process.env.EMAIL, // sender address

              to: voter.email, // list of receivers

              subject: election_name + " results", // Subject line

              html:
                "The results of " +
                election_name +
                " are out.<br>The winner candidate is: <b>" +
                winner_candidate +
                "</b>.",
            };

            transporter.sendMail(mailOptions, function (err, info) {
              if (err) {
                res.json({
                  status: "error",
                  message: "mail error",
                  data: null,
                });

                console.log(err);
              } else console.log(info);

              res.json({
                status: "success",
                message: "mails sent successfully!!!",
                data: null,
              });
            });
          }

          var transporter = nodemailer.createTransport({
            service: "gmail",

            auth: {
              user: process.env.EMAIL,

              pass: process.env.PASSWORD,
            },
          });

          const mailOptions = {
            from: process.env.EMAIL, // sender address

            to: req.body.candidate_email, // list of receivers

            subject: req.body.election_name + " results !!!", // Subject line

            html:
              "Congratulations you won " +
              req.body.election_name +
              " election.", // plain text body
          };

          transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
              res.json({ status: "error", message: "mail error", data: null });

              console.log(err);
            } else console.log(info);

            res.json({
              status: "success",
              message: "mail sent successfully!!!",
              data: null,
            });
          });
        }
      }
    );
  },
};
