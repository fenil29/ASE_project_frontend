import React,{useContext} from "react";
import { View, Text, StyleSheet,ImageBackground } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { GlobalContext } from "../context/GlobalState";

function PhotoGrid() {
  const contextStore = useContext(GlobalContext);

  const [items, setItems] = React.useState([
    { name: "TURQUOISE", code: "#1abc9c" },
    { name: "EMERALD", code: "#2ecc71" },
    { name: "PETER RIVER", code: "#3498db" },
    { name: "AMETHYST", code: "#9b59b6" },
    { name: "WET ASPHALT", code: "#34495e" },
    { name: "GREEN SEA", code: "#16a085" },
    { name: "NEPHRITIS", code: "#27ae60" },
    { name: "BELIZE HOLE", code: "#2980b9" },
    { name: "WISTERIA", code: "#8e44ad" },
    { name: "MIDNIGHT BLUE", code: "#2c3e50" },
    { name: "SUN FLOWER", code: "#f1c40f" },
    { name: "CARROT", code: "#e67e22" },
    { name: "SILVER", code: "#bdc3c7" },
    { name: "ASBESTOS", code: "#7f8c8d" },
  ]);
  return (
    <>
      {contextStore.photos.length > 0 && (
        <FlatGrid

          itemDimension={110}
          data={contextStore.photos}
          style={{width:"100%"}}
          // staticDimension={300}
          // fixed
          spacing={5}
          renderItem={({ item }) => (
            // <View style={[styles.itemContainer, { backgroundColor: item.code }]}>
            // <Text style={styles.itemName}>{item.name}</Text>
            // <Text style={styles.itemCode}>{item.code}</Text>
            // </View>
            <ImageBackground
            style={styles.itemContainer}
              source={{ uri: item && item.uri }}
              // style={{ width: "100%" }}
            //   style={{ height: "100%", width: "100%" }}
              // style={{
              //   // flex: 1,
              //   width:100,
              //   height:100,
              // }}
            />
          )}
        />
      )}
    </>
  );
}

export default PhotoGrid;

const styles = StyleSheet.create({
  itemContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
    // width:100
  },
  itemName: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "600",
  },
  itemCode: {
    fontWeight: "600",
    fontSize: 12,
    color: "#fff",
  },
});
