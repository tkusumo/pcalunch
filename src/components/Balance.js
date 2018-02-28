import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Card, CardItem, Body } from 'native-base';

let itemContainer = null;

class Balance extends Component {
    _keyExtractor = (item, index) => index;

    _renderItem = ({item}) => {
        return this.renderBalance({item})
    };

    renderPreviousBalance = (desc) => {
        return (
            <Card>
                <CardItem style={{ backgroundColor: 'gray', height: 30, justifyContent: 'space-between' }} header>
                    <Text>Previous Balance</Text>
                    <Text>{desc}</Text>
                </CardItem>
            </Card>
        )
    }

    renderCurrentBalance = (desc) => {
        return (
            <Card>
                <CardItem style={{ backgroundColor: 'gray', height: 30, justifyContent: 'space-between' }} header>
                    <Text>Current Balance</Text>
                    <Text>{desc}</Text>
                </CardItem>
            </Card>
        )
    }

    renderBalanceHeader = (date) => {
        return (
            <CardItem style={{ backgroundColor: 'lightgray', height: 30 }} header>
                <Text>{date}</Text>
            </CardItem>
        )
    }

    renderCardItem = (desc, debit, credit, balance) => {
        let textColor = 'black';
        let amount = '';
        if (credit) {
            textColor = 'red';
            amount = '-' + credit;
        } else {
            amount = debit;
        }
        return (
            <CardItem style={{ justifyContent: 'space-between' }}>
                <Text>{desc}</Text>
                <Text style={{ color: textColor }}>{amount} <Text style={{ fontStyle: 'italic', color: 'black' }}>( {balance} )</Text></Text>
            </CardItem>
        )
    }

    renderPurchaseItems({item}, {tempItem}) {
        if (item.desc === 'Online Payment') {
            return (
                <Card>
                    {this.renderBalanceHeader(item.date)}
                    {this.renderCardItem(tempItem.desc, tempItem.debit, null, tempItem.balance)}
                    {this.renderCardItem(item.desc, null, item.credit, item.balance)}
                </Card>
            )
        } else {
            return (
                <Card>
                    {this.renderBalanceHeader(item.date)}
                    {this.renderCardItem(item.desc, item.debit, null, item.balance)}
                    {this.renderCardItem(tempItem.desc, null, tempItem.credit, tempItem.balance)}
                </Card>
            )
        }
    }

    renderPurchaseItem({tempItem}) {
        if (tempItem.desc === 'Online Payment') {
            return (
                <Card>
                    {this.renderBalanceHeader(tempItem.date)}
                    {this.renderCardItem(tempItem.desc, null, tempItem.credit, tempItem.balance)}
                </Card>
            )
        } else {
            return (
                <Card>
                    {this.renderBalanceHeader(tempItem.date)}
                    {this.renderCardItem(tempItem.desc, tempItem.debit, null, tempItem.balance)}
                </Card>
            )
        }
    } 

    renderBalance = ({item}) => {
        if (item.date === 'Previous Balance') {
            return this.renderPreviousBalance(item.desc);
        } else if (item.date === 'Current Balance') {
            return this.renderCurrentBalance(item.desc);
        } else {
            if (!itemContainer) {
                itemContainer = item;
            } else {
                if (item.date === itemContainer.date) {
                    const tempItem = itemContainer;
                    itemContainer = null;
                    return (
                        this.renderPurchaseItems({item}, {tempItem})
                    )
                } else {
                    const tempItem = itemContainer;
                    itemContainer = item;
                    return (
                        this.renderPurchaseItem({tempItem})
                    )
                }
            }
        }
    }

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

export default Balance;