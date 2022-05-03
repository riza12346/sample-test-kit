import React from 'react'
import {View, Text, StyleSheet} from 'react-native'

const Header = ({title} : { title: string }) => {
    return (
        <View style={styles.header}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        height: 60, 
        backgroundColor: '#000000', 
    },
    text:{
        color: '#000000',
        padding: 15,
        textAlign:'center',
        fontSize: 24, 
    }
});


export default Header
