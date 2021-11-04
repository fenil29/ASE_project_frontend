import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ImageBackground,
  Image,
} from "react-native";
import { Camera } from "expo-camera";
import { Icon } from "@ui-kitten/components";
import axios from "axios";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import * as ImageManipulator from "expo-image-manipulator";

export default function FaceCamera() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.front);
  const [capturedImage, setCapturedImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [faceBox, setFaceBox] = useState(null);

  //   let camera;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
    const interval = setInterval(() => {
      setCamera((camera) => {
        __takePicture(camera);
        return camera;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  //   const __takePicture = async () => {
  async function __takePicture(cameralocal) {
    // console.log(cameralocal)

    if (!cameralocal) return;
    const options = { quality: 0.1, base64: true };
    let photo = await cameralocal.takePictureAsync(options);

    photo = await ImageManipulator.manipulateAsync(
      photo.uri,
      [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio
      { compress: 0.7, format: "jpeg", base64: true }
    );
    // console.log(photo.base64);
    let formData = new FormData();
    formData.append("image_base64", photo.base64);
    formData.append("api_key", "M3gDEiQdtRKNbEuRDIm3oB46IgLufN36");
    formData.append("api_secret", "0o2e8yd-ucHHUD41W69PgAjjtc_Rhigt");

    console.log(photo.width);
    console.log(photo.height);
    setCapturedImage(photo);
    // let base64Img = `data:image/jpg;base64,${source}`;
    // let data = {
    //     image_base64: base64Img,
    //     api_key: 'M3gDEiQdtRKNbEuRDIm3oB46IgLufN36',
    //     api_secret: '0o2e8yd-ucHHUD41W69PgAjjtc_Rhigt'
    //   };

    // axios.post(`https://api-us.faceplusplus.com/facepp/v3/detect`, { formData })
    axios({
      method: "post",
      url: "https://api-us.faceplusplus.com/facepp/v3/detect",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res) => {
        // console.log(res);
        console.log(res.data);
        if (res.data.face_num == 1) {
          setFaceBox(res.data.faces[0].face_rectangle);
          console.log(res.data.faces[0].face_rectangle);
        }
      })
      .catch((err) => {
        // alert("Cannot upload", JSON.stringify(err));
        console.log(err);
        if (err.response) {
          console.log(err.response.data); // => the response payload
        }
      });
    // fetch("https://api-us.faceplusplus.com/facepp/v3/detect", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: formData,
    // })
    //   .then(async (response) => {
    //     let data = await response.json();
    //     if (data) {
    //       //   alert(JSON.stringify(data));
    //       //   console.log(data);
    //       //   data example
    //       //   Object {
    //       //     "face_num": 1,
    //       //     "faces": Array [
    //       //       Object {
    //       //         "face_rectangle": Object {
    //       //           "height": 445,
    //       //           "left": 84,
    //       //           "top": 672,
    //       //           "width": 445,
    //       //         },
    //       //         "face_token": "807891ad0ea241917ff8074bdd3c68e7",
    //       //       },
    //       //     ],
    //       //     "image_id": "cEWlW5zpXV24LFxVIgamLA==",
    //       //     "request_id": "1635826848,22107841-38c8-45b9-9f23-ca5e617d94c0",
    //       //     "time_used": 61,
    //       //   }
    //       if (data.face_num == 1) {
    //         setFaceBox(data.faces[0].face_rectangle);
    //         console.log(data.faces[0].face_rectangle);
    //       }
    //     }
    //   })
    //   .catch((err) => {
    //     // alert("Cannot upload", JSON.stringify(err));
    //     console.log(err);
    //   });
  }

  return (
    <View style={{ height: "100%" }}>
      <View style={{ height: "30%", width: "30%", display: "none" }}>
        <Camera
          type={type}
          // style={{ height: "10%",width:"50%" }}
          ref={(r) => {
            // camera = r;
            setCamera(r);
          }}
        >
          <View style={{ height: "100%" }}>
            <TouchableOpacity
              style={{ position: "absolute", bottom: 20, right: 20 }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}
            >
              <View
                style={{
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Icon style={styles.icon} fill="white" name="flip-2-outline" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: "absolute", bottom: 20, right: 100 }}
              onPress={() => {
                __takePicture();
              }}
            >
              <View
                style={{
                  borderColor: "white",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  padding: 10,
                  borderRadius: 5,
                }}
              >
                <Icon style={styles.icon} fill="white" name="flip-2-outline" />
              </View>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
      {capturedImage && (
        <>
          {/* <ImageBackground
            source={{ uri: capturedImage && capturedImage.uri }}
            style={{
            //   flex: 1,
            }}
          /> */}
          <ImageBackground
            source={{ uri: capturedImage && capturedImage.uri }}
            // style={{ width: "100%" }}
            style={{ height: "100%", width: "100%" }}
            // style={{
            //   // flex: 1,
            //   width:100,
            //   height:100,
            // }}
          />
          {faceBox && faceBox.left && (
            <View
              style={{
                borderColor: "red",
                borderStyle: "solid",
                borderWidth: "10px",
                // padding: 10,
                margin: "10px",
                borderRadius: 5,
                position: "absolute",
                // top: 10, left: 10,
                //  left: `10%`,
                // right:`10%`,
                // top: `10%`,
                // bottom: `10%`,
                left: `${Number(faceBox.left) / (capturedImage.width/100)}%`,
                right:`${ 100-(Number(faceBox.left) / (capturedImage.width/100) + Number(faceBox.width) / (capturedImage.width/100))}%`,
                top: `${Number(faceBox.top) / (capturedImage.height/100)}%`,
                bottom: `${100-(Number(faceBox.top) / (capturedImage.height/100) + Number(faceBox.height) /  (capturedImage.height/100))}%`,
              }}
            ></View>
          )}
        </>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  icon: {
    width: 27,
    height: 27,
  },
});
