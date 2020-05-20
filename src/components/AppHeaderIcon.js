import React from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Platform } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { THEME } from "../theme";

export const AppHeaderIcon = (props) => (
  <HeaderButton
    {...props}
    iconSize={24}
    IconComponent={ Icon }
    color={Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR}
  />
);

