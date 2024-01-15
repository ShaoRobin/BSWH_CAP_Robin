import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { VectorIcon } from "./VectorIcon";

interface HeaderProps {
    title: string
    onBack: () => void
    onStar: () => void
}

export const Header = ({title, onBack, onStar} : HeaderProps) => {
    return (
        <View style={styles.container}>
            <VectorIcon
                size={22}
                type={'Ionicons'}
                name={'chevron-back-outline'}
                color={'#2f9eed'}
                onPress={onBack}
            />
            <Text style={styles.title}>{title}</Text>
            <VectorIcon
                size={22}
                type={'Entypo'}
                name={'star'}
                color={'#2f9eed'}
                onPress={onStar}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#f5f5f5'
    },
    title: {
        width:'80%',
        fontSize: 15,
        color: 'black',
        textAlign:'center'
    }
})