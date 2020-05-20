import React, { useEffect, useCallback, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View, Text, Image, Button, ScrollView, Alert } from 'react-native';
import { THEME } from '../theme';
import {FontAwesome} from 'react-native-vector-icons';
import { toggleBooked, selectPostId, removePost } from '../store/actions/postActions';

export const PostScreen = ({route,  navigation }) => {
    const dispatch = useDispatch();
    
    const {postId} = route.params;
    const post = useSelector(state => state.post.allPosts.find(post => post.id === postId));

    const booked = useSelector(state => state.post.bookedPosts.some(post => post.id === postId));

    useEffect(() => {
        navigation.setParams({booked})
        
    }, [booked]);
    const toggleHandler = useCallback(() => {
        dispatch(toggleBooked(postId))
        dispatch(selectPostId(postId))
        
        
    }, [dispatch, postId])


    useEffect(() => {
        toggleHandler()
           
    }, []);
    const removehandler = () => {
        
        
        Alert.alert(
            "Ջնձել հոդվածը",
            "Դուք համոզվա՞ծ եք որ ուզում եք ջնջել հոդվածը",
            [
              {
                text: "Չեղարկել",
                style: "cancel"
              },
              { text: "Ջնջել", style: 'destructive', onPress: () => { 
                  
                  dispatch(removePost(postId))
                  navigation.navigate('Main')
                }}
            ],
            { cancelable: false }
          );
          
    }
    if(!post) {
        return null;
    }
    
    return (
        <ScrollView >
           <FontAwesome name='remove' size={20} color='#fff'/>
           <Image source={{uri: post.img}} style={styles.image} />
            <View style={styles.textWrap}>
                <Text style={styles.title}>{post.text}</Text>
            </View>
            <Button title='Ջնջել' color={THEME.DANGER_COLOR} onPress={removehandler}/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: 200
    },
    textWrap: {
        padding: 10
    },
    title: {
        fontFamily: 'open-regular'
    }

})

