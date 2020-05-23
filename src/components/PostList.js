import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import { Post } from './Post'

export const PostList = ({data = [], onOpen}) => {
    console.log('data',data);

    if(!data.length) {
        return (<View style={styles.wrapper}><Text style={styles.noItems}>Հոդվածներ դեռ չկան</Text></View>)
    }
    return (
        <View style={styles.wrapper}>
            <FlatList 
                data={data} 
                keyExtractor={data => data.id.toString()} 
                renderItem={({item}) => <Post post={item} onOpen={onOpen}/>} />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    noItems: {
        fontFamily: 'open-regular',
        fontSize: 18,
        textAlign: 'center',
        marginVertical: 10
    }

})