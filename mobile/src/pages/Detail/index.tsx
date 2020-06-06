import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import styles from "./styles";

const Detail = () => {
  const navigation = useNavigation();

  /** navegação para a página anterior */
  function handleNavigateBack() {
    navigation.goBack();
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Icon name="arrow-left" size={24} color="#34cb79" />
        </TouchableOpacity>

        <Image
          style={styles.pointImage}
          source={{
            uri:
              "https://cms.qz.com/wp-content/uploads/2020/04/RTX77LBJ-e1587021603942.jpg?quality=75&strip=all&w=1600&h=900&crop=1",
          }}
        />

        <Text style={styles.pointName}>Mercadão da Esquina</Text>
        <Text style={styles.pointItems}>
          Lâmpadas, Baterias, Pilhas e Óleo de cozinha
        </Text>

        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>Alvinópolis, MG</Text>
        </View>
      </View>

      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={() => {}}>
          <FontAwesome name="whatsapp" size={24} color="#fff" />
          <Text style={styles.buttonText}>WhatsApp</Text>
        </RectButton>

        <RectButton style={styles.button} onPress={() => {}}>
          <Icon name="mail" size={24} color="#fff" />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </>
  );
};

export default Detail;
