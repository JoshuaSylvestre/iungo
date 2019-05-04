import React from 'react';
import {
  Hero, Navbar, Container, Button, Title, Tab,
  // Icon, FontAwesomeIcon,
} from 'rbx';


const handsUrl = 'https://images.pexels.com/photos/943630/pexels-photo-943630.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260';
const styles = {
  hero: {
    backgroundImage: `url(${handsUrl})`,
    opacity: 0.9,
    color: 'black',
    backgroundSize: 'cover',
    overflow: 'hidden',
  },

};
const Landing = () => (
  <Hero as="div" size="fullheight">
    {/* Hero head: will stick at the top */}

    <Hero.Head>
      <Navbar>
        <Container>
          <Navbar.Brand>
            <Navbar.Item>
              <Title>IUNGO</Title>
            </Navbar.Item>
            <Navbar.Burger />
          </Navbar.Brand>
          <Navbar.Menu>
            <Navbar.Segment align="end">
              <Navbar.Item active>Home</Navbar.Item>
              <Navbar.Item>Examples</Navbar.Item>
              <Navbar.Item>Documentation</Navbar.Item>
              <Navbar.Item as="span">
                <Button color="primary" inverted>
                  {/* <Icon>
                    <FontAwesomeIcon icon={faGithub} />
                  </Icon> */}
                  <span>Download</span>
                </Button>
              </Navbar.Item>
            </Navbar.Segment>
          </Navbar.Menu>
        </Container>
      </Navbar>

    </Hero.Head>
    {/* Hero content: will be in the middle */}
    <Hero.Body style={styles.hero} title="Connection image">
      <Container textAlign="centered">
        <Title style={{ color: 'black' }}>Iungo</Title>
        <Title style={{ color: 'black' }} as="h2" subtitle>
        Come connect.
        </Title>
      </Container>
    </Hero.Body>

    {/* Hero footer: will stick at the bottom */}
    <Hero.Foot>
      <Container>
        <Tab.Group as="nav" type="boxed" fullwidth>
          <Tab active>Overview</Tab>
          <Tab>Languages</Tab>
          <Tab>Technologies</Tab>
          <Tab>Contribute</Tab>
          <Tab>Support</Tab>
        </Tab.Group>
      </Container>
    </Hero.Foot>
  </Hero>
);

export default Landing;
