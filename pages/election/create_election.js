import React, { Component } from "react";
import {
  Button,
  Form,
  Grid,
  Header,
  Segment,
  Icon,
  Message,
} from "semantic-ui-react";
import web3 from "../../Ethereum/web3";
import Election_Factory from "../../Ethereum/election_factory";
import { Router } from "../../routes";
import Cookies from "js-cookie";
class LoginForm extends Component {
  state = {
    //retrieve the company's email via cookie
    election_name: "",
    election_description: "",
    loading: false,
    errorMess: "",
  };

  signin = async (event) => {
    event.preventDefault();
    this.setState({ loading: true, errorMess: "" });
    try {
      const email = Cookies.get("company_email");
      console.log(email);
      const accounts = await web3.eth.getAccounts();
      console.log(accounts);
      const bool = await Election_Factory.methods
        .createElection(
          email,
          this.state.election_name,
          this.state.election_description
        )
        .send({ from: '0x44D7815C175e1737e066a4bA3Cb18C2da304A936' });
        console.log(bool);
      if (bool) {
        console.log("running");
        const summary = await Election_Factory.methods
          .getDeployedElection(email)
          .call();
        // const summary = await Election_Factory.methods
        //   .getDeployedElection("xyz")
        //   .call();
        this.setState({ loading: false });
        console.log(summary[0]);
        Cookies.set("address", summary[0]);
        Router.pushRoute(`/election/${summary[0]}/company_dashboard`);
      }
    } catch (err) {
      console.log("create election error");
      this.setState({ errorMess: err.message });
      console.log(err)
    }
  };

  LoginForm = () => (
    <div className="login-form">
      <style jsx>{`
                .login-form {
                    width:100%;
                    height:100%;
                    position:absolute;
                    background: url('../../static/blockchain.jpg') no-repeat;
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
                Create an election!
              </Header>
              <Form.Input
                fluid
                iconPosition="left"
                icon="address card outline"
                placeholder="Election Name"
                style={{ padding: 5 }}
                value={this.state.election_name}
                onChange={(event) =>
                  this.setState({ election_name: event.target.value })
                }
                required={true}
              />
              <Form.Input
                as="textarea"
                required={true}
                style={{
                  maxHeight: "30px",
                  maxWidth: "96%",
                  marginBottom: "10px",
                }}
                fluid
                placeholder="Election Description"
                value={this.state.election_description}
                onChange={(event) =>
                  this.setState({ election_description: event.target.value })
                }
              />

              <Button
                color="blue"
                fluid
                size="large"
                style={{ marginBottom: 15 }}
                onClick={this.signin}
                loading={this.state.loading}
              >
                Submit
              </Button>
              <Message icon info>
                <Icon name="exclamation circle" />
                <Message.Header>Note: </Message.Header>
                <Message.Content>
                  Election creation will take several minutes.
                </Message.Content>
              </Message>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    </div>
  );

  render() {
    return (
      <div>
        <link
          rel="stylesheet"
          href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
        />
        {/* <link href="../css/paper-dashboard.css?v=2.0.0" rel="stylesheet" /> */}
        {this.LoginForm()}
      </div>
    );
  }
}

export default LoginForm;
