import * as FileSystem from 'expo-file-system';
import { LOAD_POST, TOGGLE_BOOKED, SELECTED_POST_ID, REMOVE_POST, ADD_POST } from '../types';
import { DB } from '../../db';

export const loadPost = () => {
    
    return async dispatch => {
        const posts = await DB.getPosts()
        
        dispatch( {
            type: LOAD_POST,
            payload: posts
        })

    }
    
}

export const toggleBooked = id => {
    return {
        type: TOGGLE_BOOKED,
        payload: id
    }
}

export const selectPostId = id => {
    return {
        type: SELECTED_POST_ID,
        payload: id
    }
}

export const removePost = id => {
    return {
        type: REMOVE_POST,
        payload: id
    }
}

export const addPost = post => async dispatch => {
    const fileName = post.img.split('/').pop();
    const newPath = FileSystem.documentDirectory + fileName;

    try {
        await FileSystem.moveAsync({
            to: newPath,
            from: post.img,
            
        })
        
    } catch (error) {
        console.log(error);
        
    }
    
    const payload = {...post, img: newPath }

    const id = await DB.createPosts(payload);
    console.log('addPostId: ',id);
    
    

    payload.id = id
    dispatch( {
        type: ADD_POST,
        payload 
    })
}