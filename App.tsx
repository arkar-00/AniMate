import { SafeAreaView, View } from 'react-native';
import FirstAnimation from './src/components/firstAnimation/FirstAnimation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <FirstAnimation />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

