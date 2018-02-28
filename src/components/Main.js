import React, { Component } from 'react';
import { Text } from 'react-native';
import {
  Container,
  Header, Body, Title,
  Tab, Tabs, TabHeading,
  Icon,
} from 'native-base';
import { connect } from 'react-redux';

import Entree from './Entree';
import Menu from './Menu';
import Balance from './Balance';
import * as actions from '../actions';

const lunchURL = 'http://app.pcalions.com/lunch.html?step=2&k=aby7u9a6ytu7emem';
const balanceURL = 'http://app.pcalions.com/lunch.html?k=aby7u9a6ytu7emem';

class Main extends Component {
  state = {
    lunches: [],
    balance: [],
  }
  componentWillMount() {
    this.props.scrapeLunches(lunchURL);
    this.props.scrapeBalance(balanceURL);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ lunches: nextProps.lunches, balance: nextProps.balance });
  }

  render() {
    return (
      <Container iosBarStyle="light-content">
        <Header
          style={{ backgroundColor: '#002f5f' }}
          iosBarStyle="light-content"
          hasTabs
        >
          <Body>
            <Title style={{ color: 'white' }}>PCA Lunch</Title>
          </Body>
        </Header>
        <Tabs>
          <Tab heading={
            <TabHeading>
              <Icon name="nutrition" style={{ fontSize: 34, color: 'orange' }} />
              <Text style={{ paddingLeft: 10 }}>Entree</Text>
            </TabHeading>
          }
          >
            <Entree data={this.state.lunches} />
          </Tab>
          <Tab heading={
            <TabHeading>
              <Icon name="restaurant" style={{ fontSize: 34, color: 'green' }} />
              <Text style={{ paddingLeft: 10 }}>Menu</Text>
            </TabHeading>
          }
          >
            <Menu data={this.state.lunches} />
          </Tab>
          <Tab heading={
            <TabHeading>
              <Icon name="cash" style={{ fontSize: 34, color: 'red' }} />
              <Text style={{ paddingLeft: 10 }}>Purchase</Text>
            </TabHeading>
          }
          >
            <Balance data={this.state.balance} />
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

function mapStateToProps({ scrapes }) {
  return { lunches: scrapes.lunchData, balance: scrapes.balanceData };
}

export default connect(mapStateToProps, actions)(Main);
