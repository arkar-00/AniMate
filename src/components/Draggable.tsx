import React, { useCallback, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  Pressable,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from 'expo-blur';

const { width, height } = Dimensions.get('window');

export default function AssistiveTouch() {
  const insets = useSafeAreaInsets();
  const [menuVisible, setMenuVisible] = useState(false);

  const translateX = useSharedValue(insets.left);
  const translateY = useSharedValue(insets.top);

  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.8);

  const lastOffsetX = useSharedValue(0);
  const lastOffsetY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      opacity.value = withTiming(1);
    })
    .onUpdate((event) => {
      translateX.value = lastOffsetX.value + event.translationX;
      translateY.value = lastOffsetY.value + event.translationY;

      // Keep within screen bounds
      translateX.value = Math.max(10, Math.min(translateX.value, width - 60));
      translateY.value = Math.max(insets.top, Math.min(translateY.value, height - 60));
    })
    .onEnd(() => {
      // Auto-snap to left or right edge
      lastOffsetX.value = translateX.value > width / 2 ? width - 60 : 10;
      lastOffsetY.value = translateY.value;

      translateX.value = withSpring(lastOffsetX.value);
      translateY.value = withSpring(lastOffsetY.value);

      opacity.value = withTiming(0.6, { duration: 1000 });
    });

  const tapGesture = Gesture.Tap()
    .onStart(() => {
      scale.value = withTiming(0.85);
    })
    .onEnd(() => {
      scale.value = withSpring(1);
      runOnJS(setMenuVisible)(!menuVisible);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    opacity: opacity.value,
  }));

  const menuStyle = useAnimatedStyle(() => ({
    opacity: menuVisible ? withTiming(1) : withTiming(0),
    transform: [{ scale: menuVisible ? withSpring(1) : withSpring(0.5) }],
  }));

  const hideMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  return (
    <ImageBackground
      resizeMode="cover"
      source={require('../assets/images/imageBackground.jpg')}
      style={styles.container}
    >
      {!menuVisible && (
        <GestureDetector gesture={Gesture.Race(panGesture, tapGesture)}>
          <Animated.View style={[styles.assistiveTouch, animatedStyle]}>
            <Text style={styles.assistiveText}>•</Text>
          </Animated.View>
        </GestureDetector>
      )}
      {menuVisible && (
        <Animated.View style={[styles.menuContainer, menuStyle]}>
          <BlurView intensity={30} tint="light" style={styles.blurBackground}>
            <Pressable style={styles.menuOption} onPress={hideMenu}>
              <Text style={styles.menuText}>Option 1</Text>
            </Pressable>
            <Pressable style={styles.menuOption} onPress={hideMenu}>
              <Text style={styles.menuText}>Option 2</Text>
            </Pressable>
            <Pressable style={styles.menuOption} onPress={hideMenu}>
              <Text style={styles.menuText}>Option 3</Text>
            </Pressable>
          </BlurView>
        </Animated.View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  assistiveTouch: {
    width: 55,
    height: 55,
    backgroundColor: 'rgba(0, 122, 255, 0.8)',
    borderRadius: 27.5,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  assistiveText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  menuContainer: {
    position: 'absolute',
    left: width / 2 - 80,
    top: height / 2 - 100,
    width: '60%',
    paddingVertical: 10,
    paddingHorizontal: 15,
    overflow: 'hidden',
  },
  blurBackground: {
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  menuOption: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});
