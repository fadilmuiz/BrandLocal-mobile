import {
  Text,
  StyleSheet,
  View,
  Image,
  ScrollView,
  FlatList,
  Button,
} from "react-native";
import { useCallback, useState } from "react";

function DetailScreen({ route }) {
  const { productDetail } = route.params;
  return (
    <ScrollView>
      <Image
        source={{ uri: productDetail.mainImg }}
        style={{
          width: 420,
          height: 600,
        }}
      />
      <View>
        {/* <Text>{JSON.stringify(productDetail)}</Text> */}
        <Text style={styles.title}>{productDetail.name}</Text>
      </View>
      <View>
        <Text style={styles.slug}> {productDetail.slug}</Text>
      </View>
      <View>
        <Text style={styles.category}> {productDetail.Category.name}</Text>
      </View>
      <View>
        <Text style={styles.price}>Rp. {productDetail.price}</Text>
      </View>
      <View>
        <Text style={styles.des}>Description : {productDetail.description}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  title: {
    marginTop: 20,
    marginLeft: 10,
    fontSize: 20,
    // textAlign: "center",
    // justifyContent: "center",
  },
  price: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 20,
    color: "red"
  },
  des: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 15
  },
  slug: {
    marginTop: 10,
    marginLeft: 8,
    fontSize: 15,
    color: "green"
  },
  category: {
    marginTop: 10,
    marginLeft: 8,
    fontSize: 15,
    color: "orange"
  }
})

export default DetailScreen;