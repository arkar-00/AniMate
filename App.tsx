import { SafeAreaView, View } from 'react-native';
import FirstAnimation from './src/components/firstAnimation/FirstAnimation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FadeBox from './src/components/firstAnimation/FadeBox';
import MoveBox from './src/components/firstAnimation/MoveBox';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <MoveBox />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

