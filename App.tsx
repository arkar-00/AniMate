import { SafeAreaView, View } from 'react-native';
import FirstAnimation from './src/components/FirstAnimation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import FadeBox from './src/components/FadeBox';
import MoveBox from './src/components/MoveBox';
import DraggableBox from './src/components/Draggable';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <DraggableBox />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

