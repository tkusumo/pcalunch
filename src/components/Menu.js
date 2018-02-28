import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, CardItem, Body } from 'native-base';
import { human, iOSUIKit } from 'react-native-typography';

class Menu extends Component {
    _keyExtractor = (item, index) => item.date;
    
    _renderItem = ({item}) => (
        <Card>
            <CardItem style={{ backgroundColor: 'lightgray', height: 30 }} header>
                <Text>{item.date}</Text>
            </CardItem>
            <CardItem>
                <Body>
                    <Text>{item.menu}</Text>
                </Body>
            </CardItem>
        </Card>
    )

    render() {
        return (
            <FlatList
                data={this.props.data}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
            />
        )
    }
}

export default Menu;
