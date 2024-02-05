import { router } from "expo-router"
import { FC, useCallback, useEffect, useState } from "react"
import { Linking, StyleSheet, Text, View } from "react-native"
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera'
import { Button } from "tamagui"

interface Props {
  status: CameraPermissionStatus;
  requestCameraPermission: () => void
}


const PermissionsCamera:FC<Props> = ({status, requestCameraPermission}) => {
  

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Para poder continuar necesita proporcionar permisos para capturar fotos</Text>
      <View style={styles.permissionsContainer}>
        {status !== 'granted' && (
          <>
            <Button
              alignSelf="center"
              size="$4"
              themeInverse={true}
              onPress={requestCameraPermission}
            >
              Otorgar permiso
            </Button>
          </>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  banner: {
    position: 'absolute',
    opacity: 0.4,
    bottom: 0,
    left: 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10
  },
  permissionsContainer: {
    marginTop: 15 * 2,
  },
  permissionText: {
    fontSize: 17,
  },
  hyperlink: {
    color: '#007aff',
    fontWeight: 'bold',
  },
  bold: {
    fontWeight: 'bold',
  },
})

export default PermissionsCamera