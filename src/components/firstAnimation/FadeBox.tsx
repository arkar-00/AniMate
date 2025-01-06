import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';

export default function FadeBox() {
  const opacity = useSharedValue(1);

  const toggleFade = () => {
    opacity.value = withTiming(opacity.value === 1 ? 0 : 1, { duration: 3000 });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.View
        style={[{ width: 100, height: 100, backgroundColor: '#b58df1' }, animatedStyle]}
      />
      <TouchableOpacity onPress={toggleFade} style={{ marginTop: 20 }}>
        <Text>Toggle Fade</Text>
      </TouchableOpacity>
    </View>
  );
}
