import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';

const FirstAnimation = () => {
  const width = useSharedValue<number>(100);

  const handlePress = () => {
    width.value = withSpring(width.value + 50);
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{ ...styles.box, width }} />
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
};

export default FirstAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  box: {
    height: 100,
    backgroundColor: '#b58df1',
    borderRadius: 20,
    marginVertical: 64,
  },
});
