import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, 
    View, 
    Text, 
    StyleSheet, 
    ActivityIndicator, 
    ScrollView,
    TouchableOpacity,
    Alert
} from 'react-native';

import { User } from '../api/interfaces';
import { AxiosResponse } from 'axios';
import { VectorIcon } from '../components/VectorIcon';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { stackScreens } from '../navigation/Navigator';
import { getAlbums, getUsers } from '../api/apiKit';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from '../redux/action/userAction';
import { RootState } from '../redux/reducer';
type propsType = NativeStackScreenProps<stackScreens, 'Home'>;

const Home = (props: propsType) => {
    
    const { navigation } = props
    const dispatch = useDispatch()
    const { userData } = useSelector((state: RootState) => state.user)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUsers().then((res: AxiosResponse) => {
            setLoading(false)
            if (!res) return;
            
            dispatch(setUserData(res.data))
        })
        .catch(error => {
            setLoading(false)
        })
    }, []);

    const onUserClick = (user: User, index: number) => {
        getAlbums(user.id).then((res: AxiosResponse) => {
            setLoading(false)
            if (!res) return;

            let temp = [...userData]
            temp[index] = {...temp[index], albums:res.data}
            dispatch(setUserData(temp));
        })
        .catch(error => {
            setLoading(false)
        })
    }

    const onRemoveAlbumTitle = (parentIdx: number, subIdx: number) => {
        Alert.alert('Warning', 'Are you sure want to delete this album title?', [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Ok',
                onPress: () => {
                    let temp = [...userData]
                    temp[parentIdx].albums?.splice(subIdx, 1)
                    dispatch(setUserData(temp));
                }
            }
        ])
    }

    const _renderUserList = (user: User, parentIdx: number) => {
        return (
            <View key={parentIdx}>
                <TouchableOpacity style={styles.item} 
                    onPress={() => onUserClick(user, parentIdx)}>
                    <Text style={styles.text}>{user.name}</Text>
                </TouchableOpacity>
                { user.albums &&
                        user.albums.map((albumData, subIdx) => {
                        return (
                            <View key={subIdx} style={styles.albumView}>
                                <Text 
                                    style={styles.albumTitle} 
                                    onPress={()=>navigation.navigate('PhotoAlbum', {albumId: albumData.id, albumTitle:albumData.title})}>
                                    {albumData.title}
                                </Text>
                                <VectorIcon
                                    size={20}
                                    type={'Ionicons'}
                                    name={'remove-outline'}
                                    color={'#2f9eed'}
                                    onPress={()=>onRemoveAlbumTitle(parentIdx, subIdx)}
                                />
                            </View>
                        )
                    })
                }
                <View style={styles.listdivider}/>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headertitle}>Users</Text>
            </View>
            <View style={styles.divider}/>
            { loading ? 
                <ActivityIndicator size='large' style={styles.indicator}/> 
                : 
                <ScrollView 
                    style={styles.container}
                    showsVerticalScrollIndicator={false}>
                { 
                    userData && userData.map((item, index) => _renderUserList(item, index))
                }
                </ScrollView>
            }
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    indicator: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
    },
    header: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    headertitle: {
        fontSize: 15,
        color: 'black'
    },
    divider: {
        height: 1,
        width: '100%',
        backgroundColor: '#d9d9d9'
    },
    item: {
        paddingLeft: 10,
        paddingVertical: 15,
        justifyContent: 'center'
    },
    listdivider: {
        height: 1,
        width: '100%',
        backgroundColor: '#f5f5f5'
    },
    text: {
        fontSize: 13,
        color: 'black'
    },
    albumView: {
        paddingLeft: 40,
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingRight: 20,
        justifyContent: 'space-between'
    },
    albumTitle: {
        width: '80%',
        fontSize: 12,
        color: 'black'
    }
});

export default Home;