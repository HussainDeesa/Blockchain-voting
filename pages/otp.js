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
								Verify OTP
							</Header>
							<Form.Input
								fluid
								icon="user"
								iconPosition="left"
								placeholder="OTP"
								style={{ padding: 5 }}
								id="otp"
							/>
							

							<Button color="blue" fluid size="large" style={{ marginBottom: 15 }} onClick={this.signin}>
								Verify OTP
							</Button>
						</Segment>
					</Form>
				</Grid.Column>
			</Grid>
		</div>
	);
	signin = event => {
		
		const otp = document.getElementById('otp').value;
        if(otp==123456){
				
			Router.push(`/election/${Cookies.get('address')}/vote`);
        }
        else{
            alert("Invalid OTP")
        }
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
