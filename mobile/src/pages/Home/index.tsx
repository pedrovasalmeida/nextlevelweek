import React from "react";
import { View, ImageBackground, Image, Text } from "react-native";

import styles from "./styles";

const Home = () => {
  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>
          Seu market place de coleta de resíduos.
        </Text>
        <Text style={styles.description}>
          Ajudamos pessoas à encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Home;
