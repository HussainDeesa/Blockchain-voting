import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from "semantic-ui-react";
import Cookies from "js-cookie";
import { Router } from "../routes";
import { Helmet } from "react-helmet";
import Election from "../Ethereum/election";

class LoginForm extends Component {
  state = {
    election_address: "",
  };

  LoginForm = () => (
    <div className="login-form">
      <style jsx>{`
        .login-form {
          width: 100%;
          height: 100%;
          position: absolute;
          background: url("/static/blockchain.jpg") no-repeat;
        }
      `}</style>

      <Grid
        textAlign="center"
        style={{ height: "100%" }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 380 }}>
          <Form size="large">
            <Segment>
              <Header
                as="h2"
                color="black"
                textAlign="center"
                style={{ marginTop: 10 }}
              >
                Login
              </Header>
              <Form.Input
                fluid
                icon="phone"
                iconPosition="left"
                placeholder="Phone No"
                style={{ padding: 5 }}
                id="phone"
              />
              <Form.Input
                fluid
                icon="user"
                iconPosition="left"
                placeholder="Aadhaar"
                style={{ padding: 5 }}
                id="aadhaar"
              />
              <Form.Input
                style={{ padding: 5 }}
                fluid
                id="dob"
                icon="calendar alternate icon"
                iconPosition="left"
                placeholder="DOB"
                type="date"
              />

              <Button
                color="blue"
                fluid
                size="large"
                style={{ marginBottom: 15 }}
                onClick={this.signin}
              >
                Submit
              </Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );
  signin = (event) => {
    let curr_year = new Date().getFullYear();
    const phone = document.getElementById("phone").value;
    const aadhaar = document.getElementById("aadhaar").value;
    const dob = document.getElementById("dob").value;
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

        //ganache election
        // const add = "0x0BeD29c2053881D954f6E6E8190c9ee6Eb122cE0";


        //Test election
        const add = "0xB8AAc537D33e460c9e434c1df9F0B3d1A093d0AD";

        Cookies.set("address", add);
        const election = Election(add);

        const c = await election.methods.getNumOfVotersHash.call();
        console.log(c);
        let find;

        find = await election.methods
          .findVoterHash(responseObj.data.hash.toString())
          .call();
        if (find == true) {
			Cookies.set('voter_aadhaar',aadhaar)	
			Cookies.set('voter_phone',phone)	
			Cookies.set('voter_dob',dob)	
          Router.push(`/otp`);
        }
        if (find == false) {
          alert("Invalid Crediantials");
        //   Router.push(`/voter_login`);
        }
		console.log("User found? "+find);
      }
    };

    http.send(params);
  };

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        <Helmet>
          <title>Voter login</title>
          <link
            rel="shortcut icon"
            type="image/x-icon"
            href="../../static/logo3.png"
          />
        </Helmet>
        {this.LoginForm()}
      </div>
    );
  }
}

export default LoginForm;
