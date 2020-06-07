import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, Image, Linking } from "react-native";
import { Feather as Icon, FontAwesome } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import api from "../../services/api";

import styles from "./styles";

interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };

  items: {
    id: number;
    image: string;
    title: string;
  }[];
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const [data, setData] = useState<Data>({} as Data);
  const routeParams = route.params as Params;

  async function loadPoint() {
    await api.get(`points/${routeParams.point_id}`).then((response) => {
      setData(response.data);
    });
  }

  useEffect(() => {
    loadPoint();
  }, []);

  /** envio de email */
  // function handleEmail() {

  // }
  function handleWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos...`
    );
  }

  /** navegação para a página anterior */
  function handleNavigateBack() {
    navigation.goBack();
  }

  if (!data.point) {
    return null;
  } else {
    return (
      <>
        <View style={styles.container}>
          <TouchableOpacity onPress={handleNavigateBack}>
            <Icon name="arrow-left" size={24} color="#34cb79" />
          </TouchableOpacity>

          <Image
            style={styles.pointImage}
            source={{
              uri: data.point.image,
            }}
          />

          <Text style={styles.pointName}>{data.point.name}</Text>
          <Text style={styles.pointItems}>
            {data.items.map((item) => item.title).join(", ")}
          </Text>

          <View style={styles.address}>
            <Text style={styles.addressTitle}>Endereço</Text>
            <Text style={styles.addressContent}>
              {data.point.city}, {data.point.uf}
            </Text>
            <Text style={styles.addressContent}>{data.point.email}</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <RectButton style={styles.button} onPress={() => handleWhatsapp()}>
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
  }
};

export default Detail;
