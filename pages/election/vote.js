import React, { Component } from 'react';
import { Grid, Button, Header, Icon, Image, Menu, Sidebar, Container, Card } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import web3 from '../../Ethereum/web3';
import Election from '../../Ethereum/election';
import Cookies from 'js-cookie';
import { Router } from '../../routes';
import { Helmet } from 'react-helmet';

class VotingList extends Component {

  state = {
    numCand: '',
    election_address: Cookies.get('address'),
    election_name: '',
    election_description: '',
    candidates: [],
    cand_name: '',
    cand_desc: '',
    buffer: '',
    ipfsHash: null,
    loading: false
  };
  GridExampleGrid = () => <Grid>{columns}</Grid>
  SidebarExampleVisible = () => (

    <Sidebar.Pushable>
      <Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin' style={{ backgroundColor: 'white', borderWidth: "10px" }}>
        <Menu.Item as='a' style={{ color: 'grey' }} >
          <h2>MENU</h2><hr />
        </Menu.Item>
        <Menu.Item as='a' style={{ color: 'grey' }} >
          <Icon name='dashboard' />
          Dashboard
        </Menu.Item>
        <hr />
        <Button onClick={this.signOut} style={{ backgroundColor: 'white' }}>
          <Menu.Item as='a' style={{ color: 'grey' }}>
            <Icon name='sign out' />
            Sign Out
          </Menu.Item>
        </Button>
      </Sidebar>
    </Sidebar.Pushable>
  )

  signOut() {
    Cookies.remove('address');
    Cookies.remove('voter_aadhaar');
    alert("Logging out.");
    Router.push('/homepage');
  }

  async componentDidMount() {
    try {
      const add = Cookies.get('address');
      const election = Election(add);
      const summary = await election.methods.getElectionDetails().call();
      this.setState({
        election_name: summary[0],
        election_description: summary[1]
      });
      const c = await election.methods.getNumOfCandidates.call();

      let candidates = [];
      for (let i = 0; i < c; i++) {
        candidates.push(await election.methods.getCandidate(i).call());
      }
      let i = -1;
      const items = candidates.map(candidate => {
        i++;

        return {
          header: candidate[0],
          description: candidate[1],
          image: (
            <Image id={i} src={`https://ipfs.io/ipfs/${candidate[2]}`} style={{ maxWidth: '100%', maxHeight: '190px' }} />
          ),
          extra: (
            <div>
              {/* <Icon name='pie graph' size='big' iconPostion='left'/>  
                    {candidate[3].toString()}   */}
              <Button id={i} style={{ float: 'right' }} onClick={this.vote} primary>Vote!</Button>
            </div>
          )
        };

      });
      this.setState({ item: items });
    } catch (err) {
      console.log(err.message);
      alert("Session expired. Redirecting you to login page...");
      Router.pushRoute('/voter_login');
    }
  }
  getElectionDetails = () => {
    const {
      election_name,
      election_description
    } = this.state;

    return (
      <div style={{ marginLeft: '45%', marginBottom: '2%', marginTop: '2%' }}>
        <Header as="h2">
          <Icon name="address card" />
          <Header.Content>
            {election_name}
            <Header.Subheader>{election_description}</Header.Subheader>
          </Header.Content>
        </Header>
      </div>
    );
  }

  renderTable = () => {
    return (<Card.Group items={this.state.item} />)
  }

  vote = async event => {
    const e = parseInt(event.currentTarget.id, 10);
    const accounts = await web3.eth.getAccounts();
    const add = Cookies.get('address');
    const election = Election(add);
    const str = Cookies.get('voter_aadhaar') + Cookies.get('voter_phone') + Cookies.get('voter_dob')
    console.log(str);
    var http = new XMLHttpRequest();
    var url = '/voter/generatehash';
    var params = 'str=' + str;
    http.open('POST', url, true);
    //Send the proper header information along with the request
    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    http.onreadystatechange = async function () {
      //Call a function when the state changes.
      if (http.readyState == 4 && http.status == 200) {
        var responseObj = JSON.parse(http.responseText);
        if (responseObj.status == 'success') {
          console.log("HASH :"+responseObj.data.hash);
          await election.methods.vote(e, Cookies.get('voter_aadhaar')).send({ from: accounts[0] }); 
          alert("Voted!")
        }
      }
    };
    http.send(params);


  }

  render() {
    return (
      <div>
        <Helmet>
          <title>Vote</title>
          <link rel="shortcut icon" type="image/x-icon" href="../../static/logo3.png" />
        </Helmet>
        <Grid>
          <Grid.Row>
            <Grid.Column width={2}>
              {this.SidebarExampleVisible()}
            </Grid.Column>
            <Layout>
              {this.getElectionDetails()}
              <Grid.Column style={{ minHeight: '77vh', marginLeft: '10%' }}>
                <Container>
                  {this.renderTable()}
                </Container>
              </Grid.Column>
            </Layout>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}


export default VotingList