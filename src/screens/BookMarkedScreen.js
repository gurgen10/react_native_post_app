import React from 'react';
import  { useSelector } from 'react-redux';

import { PostList } from '../components/PostList';

export const BookMarkedScreen = ({navigation}) => {
    const onPostHandler = post => {
        navigation.navigate('Post', {postId: post.id, date: post.date, booked: post.booked})


    }
    const data = useSelector(state => state.post.bookedPosts )

    return <PostList data={data} onOpen={onPostHandler} />
    
}

