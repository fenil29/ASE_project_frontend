import React, { useState, useEffect,useRef,useContext } from "react";
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
import { Icon, Layout, Spinner } from "@ui-kitten/components";
import axios from "axios";
import { manipulateAsync, FlipType, SaveFormat } from "expo-image-manipulator";
import * as ImageManipulator from "expo-image-manipulator";

import { GlobalContext } from "../context/GlobalState";


personData = {
  "d9cad8113495924deb71866fdf20f592": "Amir",
  "13277a9fa5f57a62e12448cc8a720693": "akshay",
  "c77c44564de4b43738e195c547e68d16": "alia",
  "dc1eeec115d614d8745e7503987fcbc9": "Amitabh",
  "6c1a31b03cf112caf4231b3a1aafd42c": "Hritik",
  "d775c1db22ae162c82c2a62c6a095b58": "Kareena",
  "c937e97caac871dc9c6a9fbb81adc028": "Kriti",
  "9053b9da50c608a5022d5f5f4c8763d6": "Salman",
  "1ad24f20921d0c409ae922cb5746b14c": "Shahrukh",
  "72056b0df88ab5cdc0866b9c56f26966": "Saif Ali khan",
  "6022d052cce8924ff2d1363c1eeafdff": "Jigar",
};

vaccineData=[
  {
    "dateOfBirth" : "1972-01-22",
    "fullName" : "Amir",
    "faceId" : "d9cad8113495924deb71866fdf20f592",
    "status" : "FULLY_VACCINATED",
    "vaccineDoses": [
      {
        "vaccineName": "AstraZeneca",
        "date": "2021-04-20",
        "lotNumber": "731648"
      },
      {
        "vaccineName": "AstraZeneca",
        "date": "2021-07-30",
        "lotNumber": "788134"
      }
    ]
  },
  {
    "dateOfBirth" : "1970-05-12",
    "fullName" : "Akshay",
    "faceId" : "13277a9fa5f57a62e12448cc8a720693",
    "status" : "NOT_VACCINATED",
    "vaccineDoses": []
  },
  {
    "dateOfBirth" : "1999-06-11",
    "fullName" : "Alia",
    "faceId" : "c77c44564de4b43738e195c547e68d16",
    "status" : "FULLY_VACCINATED",
    "vaccineDoses": [
      {
        "vaccineName": "Pfizer",
        "date": "2021-06-28",
        "lotNumber": "500648"
      },
      {
        "vaccineName": "Pfizer",
        "date": "2021-09-01",
        "lotNumber": "551184"
      }
    ]
  },
  {
    "dateOfBirth" : "1960-02-12",
    "fullName" : "Amitabh",
    "faceId" : "dc1eeec115d614d8745e7503987fcbc9",
    "status" : "PARTIALLY_VACCINATED",
    "vaccineDoses": [
      {
        "vaccineName": "AstraZeneca",
        "date": "2021-03-04",
        "lotNumber": "600648"
      }
    ]
  },
  {
    "dateOfBirth" : "1975-05-23",
    "fullName" : "Hritik",
    "faceId" : "6c1a31b03cf112caf4231b3a1aafd42c",
    "status" : "NOT_VACCINATED",
    "vaccineDoses": []
  },
  {
    "dateOfBirth" : "1982-05-22",
    "fullName" : "Kareena",
    "faceId" : "d775c1db22ae162c82c2a62c6a095b58",
    "status" : "FULLY_VACCINATED",
    "vaccineDoses": [
      {
        "vaccineName": "AstraZeneca",
        "date": "2021-05-15",
        "lotNumber": "600648"
      },
      {
        "vaccineName": "AstraZeneca",
        "date": "2021-08-26",
        "lotNumber": "655184"
      }
    ]
  },
  {
    "dateOfBirth" : "1995-03-12",
    "fullName" : "Kriti",
    "faceId" : "c937e97caac871dc9c6a9fbb81adc028",
    "status" : "NOT_VACCINATED",
    "vaccineDoses": []
  },
  {
    "dateOfBirth" : "1969-07-05",
    "fullName" : "Salman",
    "faceId" : "9053b9da50c608a5022d5f5f4c8763d6",
    "status" : "PARTIALLY_VACCINATED",
    "vaccineDoses": [
      {
        "vaccineName": "Pfizer",
        "date": "2021-04-10",
        "lotNumber": "520648"
      }
    ]
  },
  {
    "dateOfBirth" : "1967-08-09",
    "fullName" : "Shahrukh",
    "faceId" : "1ad24f20921d0c409ae922cb5746b14c",
    "status" : "FULLY_VACCINATED",
    "vaccineDoses": [
      {
        "vaccineName": "Moderna",
        "date": "2021-03-28",
        "lotNumber": "320648"
      },
      {
        "vaccineName": "Moderna",
        "date": "2021-05-01",
        "lotNumber": "341184"
      }
    ]
  },
  {
    "dateOfBirth" : "1973-01-10",
    "fullName" : "Saif Ali khan",
    "faceId" : "72056b0df88ab5cdc0866b9c56f26966",
    "status" : "FULLY_VACCINATED",
    "vaccineDoses": [
      {
        "vaccineName": "Moderna",
        "date": "2021-04-28",
        "lotNumber": "330648"
      },
      {
        "vaccineName": "Moderna",
        "date": "2021-06-05",
        "lotNumber": "358184"
      }
    ]
  },
  {
    "dateOfBirth" : "1998-01-11",
    "fullName" : "Jigar",
    "faceId" : "6022d052cce8924ff2d1363c1eeafdff",
    "status" : "PARTIALLY_VACCINATED",
    "vaccineDoses": [
      {
        "vaccineName": "AstraZeneca",
        "date": "2021-05-02",
        "lotNumber": "630648"
      }
    ]
  }   
]


export default function FaceCamera() {
  const contextStore = useContext(GlobalContext);

  const cameraRef = useRef();
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [faceBox, setFaceBox] = useState(null);
  const [vaccineInfo, setVaccineInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const [isVaccinated, setIsVaccinated] = useState(false);

  //   let camera;
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  //   const __takePicture = async () => {
  async function __takePicture() {
    setLoading(true);
    // console.log(cameralocal)

    if (!cameraRef) return;
    const options = { quality: 0.7, base64: true,skipProcessing: true };
    let photo = await cameraRef.current.takePictureAsync(options);
    // return;
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

    formData.append("faceset_token", "d3c8ad66b8f9d934da0df6f408c7f8b1");
    axios({
      method: "post",
      url: "https://api-us.faceplusplus.com/facepp/v3/search",
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((res2) => {
        // console.log(res);
        setLoading(false);
        console.log(res2.data);

        if (res2.data.faces && res2.data.faces.length > 0) {
          setFaceBox(res2.data.faces[0].face_rectangle);
          // console.log(res.data.faces[0].face_rectangle);
          // vaccineInfo
          if (
            res2.data.results.length > 0 &&
            res2.data.results[0].confidence > res2.data.thresholds["1e-5"]
          ) {
            setVaccineInfo({
              isVaccinated: true,
              face_token: res2.data.results[0].face_token,
            });
            setIsVaccinated(false)
        contextStore.appendPhoto([photo,false]);

            console.log(vaccineData.find(x=>x.faceId==res2.data.results[0].face_token));
            if(vaccineData.find(x=>x.faceId==res2.data.results[0].face_token)){
              if(vaccineData.find(x=>x.faceId==res2.data.results[0].face_token).status=="FULLY_VACCINATED")
              {setIsVaccinated(true);
        contextStore.appendPhoto([photo,true]);
              
              }
            }
            
          }
        }

        setCapturedImage(photo);
      })
      .catch((err2) => {
        // alert("Cannot upload", JSON.stringify(err));
        console.log(err2);
        if (err2.response) {
          console.log(err2.response.data); // => the response payload
        }
      });

  }

  return (
    <View style={{ height: "100%" }}>
      <View style={{ height: "30%", width: "30%", display: "none" }}>
        <Camera
          type={type}
          ref={cameraRef}
        />
        
      </View>
      <TouchableOpacity
        style={{ position: "absolute", top: 20, left: 20, zIndex: 10 }}
        onPress={() => {
          // setCamera((camera) => {
          //   __takePicture(camera);
          //   return camera;
          // });
          __takePicture();
        }}
      >
        <View
          style={{
            borderColor: "white",
            borderStyle: "solid",
            borderWidth: 1,
            padding: 10,
            borderRadius: 5,
          }}
        >
          {loading ? (
            <Spinner size="small" />
          ) : (
            <Icon style={styles.icon} fill="white" name="camera-outline" />
          )}
        </View>
      </TouchableOpacity>
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
                borderColor: isVaccinated?"green":"red",
                borderStyle: "solid",
                borderWidth: 4,
                // padding: 10,
                margin: 10,
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
            >
              {vaccineInfo.face_token && (
                <Text
                  style={{
                    color: "red",
                    fontSize:20
                  }}
                >
                  {personData[vaccineInfo.face_token]}
                </Text>
              )}
            </View>
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
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    margin: 20,
  },
  button: {
    flex: 0.1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
});
