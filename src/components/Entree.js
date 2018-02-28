import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { human, iOSUIKit } from 'react-native-typography';

class Entree extends Component {
    renderEntree = () => {
        const { data } = this.props;

        if (data.length > 0) {
            return (
                <View style={{ padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[iOSUIKit.bodyEmphasized]}>{data[0].date}</Text>
                    <Text style={iOSUIKit.body}>{data[0].menu}</Text>
                </View>
            )
        }
    }

    render() {
        return (
            <View>
                {this.renderEntree()}
            </View>
        )
    }
}

export default Entree;