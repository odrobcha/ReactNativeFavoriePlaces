import React, {useState} from 'react';
import { View, Alert, Image, Text } from 'react-native';
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from 'expo-image-picker';
import { Colors } from '../../constants/colors';
import OutlinedButton from '../ui/OutlinedButton';

const ImagePicker = ({onTakeImage}) => {
    const [pickedImage, setPickedImage] = useState()
    const [cameraPermissionInfo, requestPermission] = useCameraPermissions(); //for iOS
    const verifyPermission = async ()=>{
        if(cameraPermissionInfo.status === PermissionStatus.UNDETERMINED){
           const permissionRes =  await requestPermission();
           return permissionRes.granted
        }
        if(cameraPermissionInfo.status ===PermissionStatus.DENIED){
            Alert.alert("Ypu need to grant camera permission");
            return false
        }

        return true
    };

    const takeImage = async () => {
        const hasPermission = await verifyPermission();
        if(!hasPermission){
            return
        }
        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });
        setPickedImage(image.assets[0].uri);
        onTakeImage(image.assets[0].uri)
    };
    let imagePreview = <Text>No image</Text>;
    if(pickedImage){
        imagePreview =  <Image
          style={style.image}
          source={{uri: pickedImage}}/>
    }

    return (
      <View>
          <View style={style.imagePreview}>
              {imagePreview}

          </View>
          <OutlinedButton
            onPress={takeImage}
            icon = "camera"
          >
              Take image
          </OutlinedButton>
      </View>

    );
};
export default ImagePicker;

const style = {
    imagePreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image:{
        width: '100%',
        height: '100%',
    }
};
