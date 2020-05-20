import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import  { useDispatch, useSelector } from 'react-redux'

import { TextInput } from "react-native-paper";
import { THEME } from "../theme";
import { addPost } from "../store/actions/postActions";
import { PhotePicker } from "../components/PhotePicker";

export const CreateScreen = ({navigation}) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch()
  const imgRef =  useRef();

  const saveHandler = () => {
      const post = {
          date: new Date().toJSON(),
          text,
          img: imgRef.current,
          booked: false
      }
      dispatch(addPost(post));
      navigation.navigate('Main')
  };

  const photoPickHangler = uri => {
    imgRef.current = uri

  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView>
        <View style={styles.wrapper}>
          <Text style={styles.title}>Ստեղծել նոր հոդված</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Գրել տեքստ"
            value={text}
            onChangeText={setText}
            multiline
          />
          <PhotePicker onPick={photoPickHangler}/>
          <Button
            title="Ստեղծել հոդված"
            color={THEME.MAIN_COLOR}
            onPress={saveHandler}
            disabled={!text}
          />
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    padding: 10,
  },
  title: {
    textAlign: "center",
    fontSize: 10,
    fontFamily: "open-regular",
    marginVertical: 10,
  },
  textArea: {},
});
