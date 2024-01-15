import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Image, 
    StyleSheet,
    ActivityIndicator,
    Dimensions,
    FlatList
} from 'react-native';

import { Header } from '../components/Header';
import { AxiosResponse } from 'axios';
import { Photos } from '../api/interfaces';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { stackScreens } from '../navigation/Navigator';
import { getAlbumPhotos, getAllPhotos } from '../api/apiKit';
type propsType = NativeStackScreenProps<stackScreens, 'PhotoAlbum'>;

const { width, height } = Dimensions.get('screen');

const PhotoAlbum = (props: propsType) => {
    
    const { navigation, route } = props
    const albumId = route.params.albumId
    const title = route.params.albumTitle
    const [allPhotos, setAllPhotos] = useState<Photos[]>([])
    const [albumPhotos, setAlbumPhotos] = useState<Photos[]>([])
    const [loading, setLoading] = useState(false)
    const [toggleAll, setToggleAll] = useState(false)

    useEffect(() => {
        if (albumId) {
            setLoading(true)
            getAlbumPhotos(albumId).then((res: AxiosResponse) => {
                setLoading(false)
                if (!res) return;
                
                setAlbumPhotos(res.data)           
            })
            .catch(error => {
                setLoading(false)
            })
        }
    }, [albumId])

    useEffect(() => {
        if (toggleAll) {
            setLoading(true)
            getAllPhotos().then((res: AxiosResponse) => {
                setLoading(false)
                if (!res) return;
    
                setAllPhotos(res.data)           
            })
            .catch(error => {
                setLoading(false)
            })
        }
    }, [toggleAll]);

    const _renderPhotos = ({item}: {item: Photos}) => {
        return (
            <Image 
                source={{uri: item.thumbnailUrl}} 
                style={styles.image} 
            />
        )
    }
    
    return (
        <SafeAreaView style={styles.container}>
            { loading && <ActivityIndicator size='large' style={styles.indicator}/>}
            <Header 
                title={title || 'Photos'} 
                onBack={() => navigation.goBack()}
                onStar={() => setToggleAll(!toggleAll)}/>
            <FlatList
                data={toggleAll ? allPhotos : albumPhotos}
                renderItem={_renderPhotos}
                keyExtractor={(item, index) => index.toString()}
                numColumns={3}/>
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
        zIndex: 100000
    },
    image: {
        width: width / 3, 
        height: 150
    }
});

export default PhotoAlbum;