import React from "react";
import * as eva from "@eva-design/eva";
import { StyleSheet } from "react-native";
import { Layout, Text, RangeDatepicker } from "@ui-kitten/components";

import PhotoGrid from "../components/PhotoGrid";
import Graph from "../components/Graph";

function Home() {
  const [range, setRange] = React.useState({});

  return (
    <Layout style={styles.container}>
      {/* <Layout style={styles.dateBar} > */}

      {/* <Layout style={styles.datePicker}>
                <Text style={{
                    fontWeight: 'bold',
                    paddingTop: 10
                }}>October 13, 2021</Text>
                    <RangeDatepicker 
                        style={styles.date}
                        placeholder = "Time Domain"
                        range={range}
                        onSelect={nextRange => setRange(nextRange)}
                    />
                </Layout> */}
      {/* </Layout> */}
      <Layout style={styles.layout} level="2">
        <Text
          style={{
            fontWeight: "bold",
            paddingTop: 15,
          }}
        >
          Recently Detected Faces
        </Text>
        <PhotoGrid />
      </Layout>

      <Layout style={styles.layout} level="2">
        <Text
          style={{
            fontWeight: "bold",
            paddingTop: 15,
          }}
        >
          Activity Log
        </Text>
        <Graph />
      </Layout>
    </Layout>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  date: {
    width: 130,
    alignItems: "center",
    position: "relative",
    left: 110,
  },
  datePicker: {
    flex: 0.2,
    flexDirection: "row",
    position: "relative",
    justifyContent: "flex-start",
    alignItems: "center",
    // top: 25,
    left: 20,
  },
  gridView: {
    marginTop: 10,
    flex: 1,
  },
  layout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
