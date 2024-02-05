import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Icon from '@expo/vector-icons/FontAwesome';
import { Linking, StyleSheet, View } from "react-native"
import { Camera, useCameraDevice, CameraPermissionStatus, Point, TakePhotoOptions } from "react-native-vision-camera"
import PermissionsCamera from "~/components/PermissionsCamera"
import { useIsFocused } from "@react-navigation/native"
import { useIsForeground } from "~/hooks/useIsForeground"
import { Button } from "tamagui"

const CameraScreen = () => {
  const camera = useRef<Camera>(null)
  const cameraPermission = Camera.getCameraPermissionStatus()
  const [cameraPermissionStatus, setCameraPermissionStatus] = useState<CameraPermissionStatus>('not-determined')

  const device = useCameraDevice('back')
  const supportsFlash = device?.hasFlash ?? false
  const isFocused = useIsFocused()
  const isForeground = useIsForeground()
  const isActive = isFocused && isForeground

  const [flash, setFlash] = useState<'off' | 'on'>('off');

  const requestCameraPermission = useCallback(async () => {
    const permission = await Camera.requestCameraPermission()
    if (permission === 'denied') await Linking.openSettings()
    setCameraPermissionStatus(permission)
  }, [])

  const activeFlash = useCallback(() => {
    setFlash((f) => (f === 'off' ? 'on' : 'off'));
  }, []);

  const takePhotoOptions = useMemo<TakePhotoOptions>(
    () => ({
      photoCodec: 'jpeg',
      qualityPrioritization: 'balanced',
      flash: supportsFlash ? flash : 'off',
      quality: 100,
      skipMetadata: true,
    }),
    [flash]
  );


  const takePhoto = useCallback(async () => {
    try {
      if (camera.current == null) return console.log('Camera ref is null!');
      console.log('Taking photo...');
      const photo = await camera.current.takePhoto(takePhotoOptions);
      setFlash('off')
      console.log(photo, 'foto capturada')
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }, [camera, takePhotoOptions]);

  if (device == null) return null

  return (
    <View style={{ flex: 1 }}>
      {cameraPermission === 'granted' ? (
        <>
          <Camera
            ref={camera}
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={isActive}
            photo={true}
            torch={supportsFlash ? flash : "off"}
          />
          <Button
            circular={true}
            size="$6"
            iconAfter={<Icon
              name="camera"
              size={30}
              color="white"
            />}
            style={{
              position: 'absolute',
              bottom: 50,
              alignSelf: 'center',
              backgroundColor: 'rgba(1, 0, 0, 0.5)',
            }}
            onPress={takePhoto}
          />
          {supportsFlash ? (
            <Button
              circular={true}
              size="$6"
              iconAfter={<Icon
                name="flash"
                size={30}
                color={flash === 'on' ? 'black' : 'white'}
              />}
              style={{
                position: 'absolute',
                bottom: 50,
                //alignSelf: 'flex-end',
                right: 35,
                backgroundColor: flash === 'on' ? 'white' : 'rgba(1, 0, 0, 0.5)'
              }}
              onPress={activeFlash}
            />
          ) : null}
        </>
      ) : (
        <PermissionsCamera status={cameraPermissionStatus} requestCameraPermission={requestCameraPermission} />
      )}
    </View>
  )
}

export default CameraScreen