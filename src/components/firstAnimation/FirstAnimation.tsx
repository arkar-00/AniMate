import { Button, StyleSheet, View } from 'react-native';
import React from 'react';
import Animated, {
  useSharedValue,
  useDerivedValue,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import { Svg, Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const FirstAnimation = () => {
  const r = useSharedValue(20);

  const handlePress = () => {
    r.value = withTiming(r.value + 10, { duration: 500 });
  };

  const animatedRadius = useDerivedValue(() => {
    return r.value;
  });

  const animatedProps = useAnimatedProps(() => ({
    r: animatedRadius.value.toString(), // Convert to string for SVG compatibility
  }));

  return (
    <View style={styles.container}>
      <Svg style={styles.svg} viewBox="0 0 200 200">
        <AnimatedCircle cx="50%" cy="50%" fill="#b58df1" animatedProps={animatedProps} />
      </Svg>
      <Button onPress={handlePress} title="Click me" />
    </View>
  );
};

export default FirstAnimation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    height: 250,
    width: 250,
  },
});
