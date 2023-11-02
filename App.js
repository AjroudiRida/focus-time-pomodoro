import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { colors } from './src/utils/colors';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import {FocusHistory} from './src/features/FocusHistory'
const App = () => {
  const [currentObject, setCurrentObject] = useState(null);
  const [history, setHistory] = useState([])
  return (
    <SafeAreaView style={styles.container}>
      {!currentObject ? (
        <>
        <Focus currentObjectUpdate={setCurrentObject} />
        <FocusHistory history={history}/>
        </>
      ) : (
        <Timer 
         focusSubject={currentObject}
         onTimerEnd={(finishedSubjects) => {setHistory([...history, finishedSubjects])}}
         clearSubject={() => setCurrentObject(null)}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: colors.darkBlue,
  },
  text: {
    color: colors.white,
  },
});

export default App;
