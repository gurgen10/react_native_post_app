import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Platform, StyleSheet, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import { Ionicons } from 'react-native-vector-icons';

import { MainScreen } from "../screens/MainScreen";
import { PostScreen } from "../screens/PostScreen";
import { AboutScreen } from "../screens/AboutScreen";
import { BookMarkedScreen } from "../screens/BookMarkedScreen";
import { CreateScreen } from "../screens/CreateScreen";
import { THEME } from "../theme";
import { AppHeaderIcon } from '../components/AppHeaderIcon';
import { toggleBooked } from "../store/actions/postActions";

const Stack = createStackNavigator();
const Tab = Platform.OS === 'android' ? createMaterialBottomTabNavigator() : createBottomTabNavigator();
const Drawer = createDrawerNavigator();

export const  AppNavigation = () => {
 
  return (
    <NavigationContainer >
      <Drawer.Navigator 
        
        drawerStyle={
          {
          backgroundColor: '#c6cbef',
          width: 200,
        }}
      >
        <Drawer.Screen 
          name="Գլխավոր" 
          component={BottomBarNavigator} 
          options={
            {
            drawerIcon: () => <Ionicons name='ios-star'/>,
            drawerLabel: 'Գլխավոր',
            
          }}
        />
        <Drawer.Screen name="Իմ  Մասին" component={AboutNavigarion} />
        <Drawer.Screen name="Ստեղծել" component={CreateNavigarion} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const BottomBarNavigator = ({}) => {
  return (
    <Tab.Navigator
        shifting={true}
        tabBarOptions={{
            activeTintColor: THEME.MAIN_COLOR,
          }
        }
      >
        <Tab.Screen 
          name="Posts" 
          component={MainNavigator}
          options={
            {
              tabBarIcon: info =>  <Ionicons name='ios-albums' size={25} color={info.color}  />,
              tabBarLabel: 'Ամբողջը'
            }
          }
          />
        <Tab.Screen 
          name="BookedPosts" 
          component={BookedNavigarion} 
          options={
            {
              tabBarIcon: info => <Ionicons name='ios-star' size={25} color={info.color} />,
              tabBarLabel: 'Ընտրվածները'
            }
          }
        />
      </Tab.Navigator>
  )
}

const MainNavigator = ({}) => {
  const dispatch = useDispatch();
  const postId = useSelector(state => state.post.selectedPostId);
  toggleBookedCallback = useCallback(() => {
    dispatch(toggleBooked(postId))
  },[dispatch, postId] )

  const post = useSelector(state => state.post.allPosts.find(p => p.id === postId))
  return (
      <Stack.Navigator
        initialRouteName="Main"
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
          },
          headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR 
        }}
      >
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={({navigation}) => (
            { 
              headerTitle: "Բոլոր հոդվածները",
              headerRight: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                  <Item
                    title='Take photo'
                    iconName='ios-camera'
                    onPress={() => navigation.navigate('Ստեղծել')} 
                  />
                </HeaderButtons>
              ),
              headerLeft: () => (
                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                  <Item
                    title='Toggle button'
                    iconName='ios-menu'
                    onPress={() => navigation.navigate('Ստեղծել')} 
                  />
                </HeaderButtons>
              )
            }
          )}
        />
        <Stack.Screen name="Post" component={PostScreen} 
            options= {( { route, navigation } ) => {
              //const selectidPostId = useSelector(state => state.post.selectidPostId);
              
                const date = new Date(route.params.date).toLocaleDateString()
                return { 
                    headerTitle: 'Հոդված ' + date,
                    headerRight: () => (
                      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                        <Item
                          title='Toggle button'
                          iconName= {route.params.booked ? 'ios-star' : 'ios-star-outline'}
                          onPress={ toggleBookedCallback } 
                        />
                      </HeaderButtons>
                    )
                 }
            }}
        />
      </Stack.Navigator>
  );
};

const optionHeaer = (navigation, header) => {
  return {
    headerTitle: header,
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
        <Item
          title='Toggle button'
          iconName='ios-menu'
          onPress={() => navigation.toggleDrawer()} 
        />
      </HeaderButtons>
    )
  }
}

const BookedNavigarion = ({}) => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
          },
          headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR 
        }}
      >
        <Stack.Screen
          name="Booked"
          component={BookMarkedScreen}
          options= {({navigation}) => optionHeaer(navigation, 'Ընտրվածներ')}
        />
        <Stack.Screen name="Post" component={PostScreen} 
            options= {( {navigation, route } ) => {
                const date = new Date(route.params.date).toLocaleDateString()
                optionHeaer(navigation, 'Հոդված ' + date )
            }}
        />
      </Stack.Navigator>
  );
};

const AboutNavigarion = ({}) => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
          },
          headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR 
        }}
      >
        <Stack.Screen
          name="About"
          component={AboutScreen}
          options= {({navigation}) => optionHeaer(navigation, 'Իմ Մասին')}
            
        />
      </Stack.Navigator>
  );
};

const CreateNavigarion = ({}) => {
  return (
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Platform.OS === 'android' ? THEME.MAIN_COLOR : '#fff'
          },
          headerTintColor: Platform.OS === 'android' ? '#fff' : THEME.MAIN_COLOR 
        }}
      >
        <Stack.Screen
          name="Create"
          component={CreateScreen}
          options= {({navigation}) => optionHeaer(navigation, 'Ստեղծել')}
            
        />
      </Stack.Navigator>
  );
};

