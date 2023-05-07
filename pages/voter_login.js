import React, { Component } from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import Cookies from 'js-cookie';
import { Router } from '../routes';
import { Helmet } from 'react-helmet';

class LoginForm extends Component {
	
	state = {
		election_address: '',
	};

	LoginForm = () => (
		<div className="login-form">
			<style jsx>{`
                .login-form {
                    width:100%;
                    height:100%;
                    position:absolute;
                    background: url('/static/blockchain.jpg') no-repeat;
                } 
              `}</style>

			<Grid textAlign="center" style={{ height: '100%' }} verticalAlign="middle">
				<Grid.Column style={{ maxWidth: 380 }}>
					<Form size="large">
						<Segment>
							<Header as="h2" color="black" textAlign="center" style={{ marginTop: 10 }}>
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

							<Button color="blue" fluid size="large" style={{ marginBottom: 15 }} onClick={this.signin}>
								Submit
							</Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	);
	signin = event => {
		let curr_year=new Date().getFullYear();
		const phone= document.getElementById('phone').value
		const aadhaar = document.getElementById('aadhaar').value;
		const dob = document.getElementById('dob').value;
		var http = new XMLHttpRequest();
		var url = 'voter/authenticate';
		var params = 'aadhaar=' + aadhaar + '&dob=' + dob+'&phone='+phone;
		http.open('POST', url, true);
		//Send the proper header information along with the request
		http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		http.onreadystatechange = function () {
			//Call a function when the state changes.
			if (http.readyState == 4 && http.status == 200) {
				var responseObj = JSON.parse(http.responseText);
				if (responseObj.status == 'success') {
					let dob_year=responseObj.data.dob.slice(0,4);
					let age=curr_year-dob_year
					if(age<18){
						alert("User Not eligible for Voting")
					}
					else{
						Cookies.set('voter_aadhaar', encodeURI(aadhaar));
						Cookies.set('address', encodeURI(responseObj.data.election_address));
						Cookies.set('voter_phone', encodeURI(phone));
						Cookies.set('voter_dob', encodeURI(dob));
						
						Router.push(`/otp`);
					}
				}  
				else if(responseObj.election_status == "end"){
					alert("Election has ended!!")
				}
				else {
					alert(responseObj.message);
				}
			}
		};
		http.send(params);
	};

	render() {
		return (
			<div>
				<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
				<Helmet>
					<title>Voter login</title>
					<link rel="shortcut icon" type="image/x-icon" href="../../static/logo3.png" />
				</Helmet>
				{this.LoginForm()}
			</div>
		);
	}
}

export default LoginForm;
