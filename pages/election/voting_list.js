import React, { Component } from "react";
import {
  Grid,
  Header,
  Button,
  Form,
  Input,
  Icon,
  Menu,
  Modal,
  Sidebar,
  Container,
  Card,
} from "semantic-ui-react";
import Layout from "../../components/Layout";
import Cookies from "js-cookie";
import { Link, Router } from "../../routes";
import Election from "../../Ethereum/election";
import { Helmet } from "react-helmet";
import web3 from "../../Ethereum/web3";

class VotingList extends Component {
  state = {
    election_address: Cookies.get("address"),
    election_name: "",
    election_description: "",
    emailArr: [],
    dobArr: [],
    idArr: [],
    phoneArr: [],
    item: [],
    voters:0,
    loading:false
  };

  async componentDidMount() {
    const add = Cookies.get('address');
			const election = Election(add);
      const v = await election.methods.getNumOfVotersHash().call();

    this.setState({ voters: v });
   
    // try {
    //   const add = Cookies.get("address");
    //   const election = Election(add);
    //   const summary = await election.methods.getElectionDetails().call();
    //   this.setState({
    //     election_name: summary[0],
    //     election_description: summary[1],
    //   });
    //   const c = await election.methods.getNumOfVotersHash.call();
    //   if (c == 0) alert("Register a voter first!");

    //   let voters = [];
    //   for (let i = 0; i < c; i++) {
    //     voters.push(await election.methods.getVoter(i).call());
    //   }
    //   let i = -1;
    //   console.log(voters);
    //   const items = voters.map((voter) => {
    //     i++;

    //     return {
    //       header: voter,
    //     };
    //   });
    //   this.setState({ item: items });
    // } catch (err) {
    //   console.log(err.message);
    //   alert("Redirecting you to login page...");
    //   Router.pushRoute("/company_login");
    // }

    

    // var http = new XMLHttpRequest();
    // var url = '/voter/';
    // var params = 'election_address='+this.state.election_address;
    // http.open("POST", url, true);
    // let email=[];
    // let dob=[];
    // let id=[];
    // let phone=[];
    // //Send the proper header information along with the request
    // http.setRequestHeader(
    //     "Content-type",
    //     "application/x-www-form-urlencoded"
    // );
    // http.onreadystatechange = function() {
    //     //Call a function when the state changes.
    //     if (http.readyState == 4 && http.status == 200) {
    //         var responseObj = JSON.parse(http.responseText);
    //         if(responseObj.status=="success") {
    //           for (let voter of responseObj.data.voters) {
    //             console.log(voter);
    //                 email.push(voter.aadhaar);
    //                 dob.push(voter.dob)
    //                 id.push(voter.id);
    //                 phone.push(voter.phone)
    //           }
    //         }
    //     }
    // };
    // http.send(params);
    // this.state.emailArr.push(email);
    // this.state.idArr.push(id);
    // this.state.phoneArr.push(phone);

    // try {
    //     const add = Cookies.get('address');
    //     const election = Election(add);
    //     const summary = await election.methods.getElectionDetails().call();
    //     this.setState({
    //         election_name: summary[0],
    //         election_description: summary[1]
    //     });

    // } catch(err) {
    //     console.log(err.message);
    //     alert("Redirecting you to login page...");
    //     Router.pushRoute('/company_login');
    // }
    // let ea = [];
    // ea = this.state.emailArr[0];
    // let ia = [];
    // ia = this.state.idArr[0];
    // let pa=[]
    // pa=this.state.phoneArr[0]
    // let i=-1;
    // let curr_date=new Date();
    // let curr_year=curr_date.getFullYear()
    // const items = ia.map(ia => {
    //     i++;
    //     let dob_year=dob[i].slice(0,4);
    //     let age=curr_year-dob_year
    //     let eligible
    //     let eligiblecolor
    //     if(age>=18){
    //        eligible="Eligible"
    //        eligiblecolor="green"
    //     }
    //     else{
    //       eligible="Not Eligible"
    //       eligiblecolor="red"
    //     }
    //     return {

    //       header: email[i],
    //       description: (
    //         <div>
    //           <span style={{marginTop:"10px",marginBottom:"10px",display:"inline-block"}}>
    //           Phone : {phone[i]}
    //          <br></br>
    //           Age : {age}
    //           </span>
    //           <br />

    //           <Button negative basic id={ia} value={ia} onClick={this.deleteEmail}>Delete</Button>
    //           <span style={{color:eligiblecolor,marginLeft:"75px",fontSize:"16px"}} >{eligible}</span>
    //         </div>
    //       )
    //     };
    // });
    // this.setState({item: items});
  }

  updateEmail = (event) => {
    const d = event.currentTarget.id;
    const st = "EmailVal" + event.currentTarget.id;
    const a = document.getElementById(st).value;
    const b = this.state.election_name;
    const c = this.state.election_description;
    //further proceed

    var http = new XMLHttpRequest();
    var url = "/voter/" + d;
    var params =
      "email=" + a + "&election_name=" + b + "&election_description=" + c;
    http.open("PUT", url, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function () {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        var responseObj = JSON.parse(http.responseText);
        if (responseObj.status == "success") {
          alert(responseObj.message);
        }
      }
    };
    http.send(params);
  };

  deleteEmail = (event) => {
    //further proceed

    var http = new XMLHttpRequest();
    var url = "/voter/" + event.currentTarget.value;
    http.open("DELETE", url, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function () {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        var responseObj = JSON.parse(http.responseText);
        if (responseObj.status == "success") {
          alert(responseObj.message);
        }
      }
    };
    http.send();
  };

  renderTable = () => {
    return <Card.Group items={this.state.item} />;
  };

  GridExampleGrid = () => <Grid>{columns}</Grid>;
  SidebarExampleVisible = () => (
    <Sidebar.Pushable>
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible
        width="thin"
        style={{ backgroundColor: "white", borderWidth: "10px" }}
      >
        <Menu.Item as="a" style={{ color: "grey" }}>
          <h2>MENU</h2>
          <hr />
        </Menu.Item>
        <Link route={`/election/${Cookies.get("address")}/company_dashboard`}>
          <a>
            <Menu.Item style={{ color: "grey", fontColor: "grey" }}>
              <Icon name="dashboard" />
              Dashboard
            </Menu.Item>
          </a>
        </Link>
        <Link route={`/election/${Cookies.get("address")}/candidate_list`}>
          <a>
            <Menu.Item as="a" style={{ color: "grey" }}>
              <Icon name="user outline" />
              Candidate List
            </Menu.Item>
          </a>
        </Link>
        <Link route={`/election/${Cookies.get("address")}/voting_list`}>
          <a>
            <Menu.Item as="a" style={{ color: "grey" }}>
              <Icon name="list" />
              Voter List
            </Menu.Item>
          </a>
        </Link>
        <hr />
        <Button onClick={this.signOut} style={{ backgroundColor: "white" }}>
          <Menu.Item as="a" style={{ color: "grey" }}>
            <Icon name="sign out" />
            Sign Out
          </Menu.Item>
        </Button>
      </Sidebar>
    </Sidebar.Pushable>
  );
  signOut() {
    Cookies.remove("address");
    Cookies.remove("company_email");
    Cookies.remove("company_id");
    alert("Logging out.");
    Router.pushRoute("/homepage");
  }

  register = async (event) => {
    const phone = document.getElementById("register_voter_phone").value;
    const dob = document.getElementById("register_voter_DOB").value;
    const aadhaar = document.getElementById("register_voter_Aadhaar").value;
    let curr_date = new Date();
    let curr_year = curr_date.getFullYear();
    let dob_year = dob.slice(0, 4);
    let age = curr_year - dob_year;
  
    // var http = new XMLHttpRequest();
    //   var url = "/voter/register";
    //   var params = "phone=" + phone+"&election_address=" + this.state.election_address+ "&election_name=" + this.state.election_name + "&election_description=" + this.state.election_description+"&dob="+dob+"&aadhaar="+aadhaar;
    //   http.open("POST", url, true);
    //   //Send the proper header information along with the request
    //   http.setRequestHeader(
    //       "Content-type",
    //       "application/x-www-form-urlencoded"
    //   );
    //   http.onreadystatechange = function() {
    //       //Call a function when the state changes.
    //       if (http.readyState == 4 && http.status == 200) {
    //           var responseObj = JSON.parse(http.responseText);
    //           if(responseObj.status=="success") {
    //             alert(responseObj.message);
    //           }
    //           else {
    //             alert(responseObj.message);
    //           }
    //       }
    //   };
    // http.send(params);

    var http = new XMLHttpRequest();
    var url = "/voter/authenticate";
    var params = "aadhaar=" + aadhaar + "&dob=" + dob + "&phone=" + phone;
    http.open("POST", url, true);
    //Send the proper header information along with the request
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = async function () {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        var responseObj = JSON.parse(http.responseText);

        event.preventDefault();
        const accounts = await web3.eth.getAccounts();
        if (age >= 18) {
        try {
          const add = Cookies.get("address");
          const election = Election(add);
          console.log(responseObj.data.hash.toString());
          
        find = await election.methods
        .findVoterHash(responseObj.data.hash.toString())
        .call();
        console.log(find)
        if (find == false) {
          election.methods.addVoterHash(responseObj.data.hash.toString()).send(
            {
              from: accounts[0],
            },
            (error, transactionHash) => {
              console.log(error);
              console.log(transactionHash);
            }
          )
        
        }
      } catch (err) {
        console.log(err);
        alert("Error in file processing.");
      }
        if (find == true) {
         alert("User Already exists");
        }
       
      }
      else{
        alert("Voter is below 18 years")
      }
      }
    };
    http.send(params);

  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Voting list</title>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="../../static/logo3.png"
          />
        </Helmet>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>{this.SidebarExampleVisible()}</Grid.Column>
            <Layout>
              <br />
              <br />
              <Grid.Column width={14} style={{ minHeight: "630px" }}>
                <Grid.Column style={{ float: "left", width: "60%" }}>
                  <Header as="h2" color="black">
                    Voter List
                  </Header>
                  <h2>Total Registered Voters Count : {this.state.voters}</h2>
                  <Container>
                    <table>{this.renderTable()}</table>
                  </Container>
                </Grid.Column>
                <Grid.Column style={{ float: "right", width: "30%" }}>
                  <Container style={{}}>
                    <Header as="h2" color="black">
                      Register Voter
                    </Header>
                    <Card style={{ width: "100%" }}>
                      <br />
                      <Form.Group
                        size="large"
                        style={{ marginLeft: "15%", marginRight: "15%" }}
                      >
                        <Form.Input
                          style={{ marginTop: "10px", marginBottom: "10px" }}
                          fluid
                          id="register_voter_phone"
                          label="Phone:"
                          placeholder="Enter your Phone."
                          textAlign="center"
                        />

                        <Form.Input
                          style={{ marginTop: "10px", marginBottom: "10px" }}
                          fluid
                          id="register_voter_DOB"
                          label="DOB:"
                          placeholder="Enter your DOB."
                          textAlign="center"
                          type="Date"
                        />
                        <Form.Input
                          style={{ marginTop: "10px", marginBottom: "10px" }}
                          fluid
                          id="register_voter_Aadhaar"
                          label="Aadhaar:"
                          placeholder="Enter your Aadhaae."
                          textAlign="center"
                        />

                        <br />
                        <br />
                        <Button
                          primary
                          style={{ Bottom: "10px", marginBottom: "15px" }}
                          onClick={this.register}
                        >
                          Register
                        </Button>
                      </Form.Group>
                    </Card>
                  </Container>
                </Grid.Column>
              </Grid.Column>
            </Layout>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default VotingList;
