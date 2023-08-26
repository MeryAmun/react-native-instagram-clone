import { Camera, CameraType } from "expo-camera";
import { useState, useEffect } from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";

export default function Create() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const galleryStatus = await ImagePicker.requestCameraPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === "granted");
    })();
  }, []);

  if (!permission || hasGalleryPermission === false) {
    // Camera permissions are still loading
    return <View style={styles.container} />;
  }

  if (!permission.granted || hasGalleryPermission === false) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
   
    }
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      setImage(data.uri);
    }
  };
  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.camera}
          type={type}
          ref={(ref) => setCamera(ref)}
          ratio={"1:1"}
        />
      </View>
      <MaterialCommunityIcons
        name="image"
        color="white"
        size={30}
        style={styles.buttonPick}
        onPress={pickImage}
      />
      <MaterialCommunityIcons
        name="camera-flip-outline"
        color="white"
        size={30}
        style={styles.button}
        onPress={toggleCameraType}
      />
      <View style={styles.buttonBox}>
      <MaterialCommunityIcons
        name="camera-outline"
        color="red"
        size={30}
        style={styles.buttonTake}
        onPress={takePicture}
      />
       <Button title='save' onPress={() =>{
        if(image){
          navigation.navigate("Save",{image})
        }
       }}/>
      </View>
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: "100%",
            height: "45%",
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    justifyContent: "center",
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "row",
  },
  camera: {
    flex: 1,
    aspectRatio: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "flex-start",
    position: "absolute",
  },
  buttonPick: {
    flex: 1,
    alignSelf: "flex-start",
    alignItems: "center",

    position: "absolute",
  },
  buttonBox:{
    width:"50%",
    flexDirection:"row",
    alignSelf: "center",
    justifyContent:"center",
    position: "absolute",
  },
  buttonTake: {
    flex: 1,
    alignSelf: "center",
    alignItems: "center",
    
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

// const styles = StyleSheet.create({
//     root: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//       },
// })
