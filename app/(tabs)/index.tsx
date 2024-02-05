import { YStack, H2, Button, Theme, Separator } from 'tamagui';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <Theme name="light">
      <YStack flex={1} alignItems="center" justifyContent="center">
        <Text style={styles.text}>Comienza tu inventario tomado la foto de tus prendas favoritas</Text>
        <Separator marginVertical={10} />
        <Link push href={'/camera'} asChild >
          <Button
            alignSelf="center"
            size="$4"
            themeInverse={true}
          >
            Nueva fotos
          </Button>
        </Link>


      </YStack>
    </Theme>
  );
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontSize: 18
  }
})