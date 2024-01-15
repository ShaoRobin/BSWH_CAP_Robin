import React from "react";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface VectorIconProps {
    type: string
    name: string
    size: number
    color?: string
    onPress: () => void
}

export const VectorIcon = React.memo(({ type, name, size, color, onPress } : VectorIconProps) => {
    switch (type) {
        case 'AntDesign':
            return <AntDesign name={name} size={size} color={color} onPress={onPress} />
        case 'Entypo':
            return <Entypo name={name} size={size} color={color} onPress={onPress} />
        case 'Ionicons':
            return <Ionicons name={name} size={size} color={color} onPress={onPress} />
        case 'Foundation':
            return <Foundation name={name} size={size} color={color} onPress={onPress} />
        case 'Feather':
            return <Feather name={name} size={size} color={color} onPress={onPress} />    
        case 'FontAwesome':
            return <FontAwesome name={name} size={size} color={color} onPress={onPress} />
    }
})