import * as React from "react";
import { View, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Image } from "react-native";
import { Text } from "react-native-paper";
import { GET_PRODUCT, GET_PRODUCT_DETAIL } from "../schemas/productQuery";
import { useQuery, useLazyQuery } from "@apollo/client";
import DetailScreen from "./DetailScreen";
// import { useNavigation } from "@react-navigation/native";

const Cards = ({ navigation }) => {
  const handlePress = (id) => {
    dispatch({ variables: { productId: Number(id) } });
  };

  const [dispatch] = useLazyQuery(GET_PRODUCT_DETAIL, {
    onCompleted: (productDetail) => {
      navigation.navigate("DetailScreen", {
        productDetail: productDetail.productDetail,
      });
    },
  });


  const cardGap = 16;

  const { data, loading, error } = useQuery(GET_PRODUCT);

  const cardWidth = (Dimensions.get("window").width - cardGap * 3) / 2;

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const [isLoading, setLoading] = React.useState(true);

  if (isLoading) {
    return (
      <View style={styles.loading}>
        <Text style={{ color: "black", fontSize: 24, fontWeight: "bold" }}>
          Loading ...
        </Text>
      </View>
    );
  }

  // if (loading) {
  //   return (
  //     <View styles={styles.loading}>
  //       <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
  //         Loading ...
  //       </Text>
  //     </View>
  //   );
  // }

  if (error) {
    return (
      <View styles={styles.loading}>
        <Text style={{ color: "black", fontSize: 24, fontWeight: "bold" }}>
          {error.message}
        </Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text>{JSON.stringify(data)}</Text> */}
      {data?.product?.map((el, i) => {
        return (
          <View
            key={el.id}
            style={[
              styles.cardContainer,
              {
                marginTop: cardGap,
                marginLeft: i % 2 !== 0 ? cardGap : 0,
                width: cardWidth,
              },
            ]}
          >
            <TouchableOpacity onPress={() => handlePress(el.id)} style={styles.card}>
              <Image
                source={{ uri: el.mainImg }}
                style={{
                  width: 183,
                  height: 295,
                  marginTop: 0,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
            <View style={{ marginTop: 10, marginLeft: 2 }}>
              <Text>{el.name}</Text>
            </View>
            <View style={{ marginLeft: 2 }}>
              <Text style={{ color: "orange" }}>Rp. {el.price}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  cardContainer: {
    height: 380,
    backgroundColor: "white",
    borderRadius: 10,
    shadowOpacity: 0.2,
    // justifyContent: "center",
    // alignItems: "center",
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Cards