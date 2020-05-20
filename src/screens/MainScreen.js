import React, { useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import  { useDispatch, useSelector } from 'react-redux'
import { PostList } from '../components/PostList';
import { loadPost } from '../store/actions/postActions';
import { THEME } from '../theme';


export const MainScreen = ({navigation}) => {
    const onPostHandler = post => {
        

        navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked})

    }

    const dispatch = useDispatch(loadPost);
    const allPosts = useSelector(state => state.post.allPosts);
    const loading = useSelector(state => state.post.loading);
    useEffect(() => {
        dispatch(loadPost());
    }, [dispatch]);

    if(loading) {
        return (<View style={styles.center}>< ActivityIndicator color={THEME.MAIN_COLOR}/></View>)
    }

    return <PostList data={allPosts} onOpen={onPostHandler} />
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    }
})

