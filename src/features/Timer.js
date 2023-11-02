import React, { useState } from 'react';
import { View, StyleSheet, Text, Vibration } from 'react-native';
import { ProgressBar, MD3Colors } from 'react-native-paper';
import { Countdown } from '../components/CountDown';
import { RoundedButton } from '../components/RoundedButton';
import {Timing} from './Timing'
import { spacing } from '../utils/sizes';
import { colors } from '../utils/colors';
import {useKeepAwake} from 'expo-keep-awake';

const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];
export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake()
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1)
  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false)
    setProgress(1)
    reset()
    onTimerEnd(focusSubject)
  }
  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>
      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progress}
          color={colors.progressBar}
          style={{ height: spacing.sm }}
        />
      </View>
      <View style={styles.timmingWraper}>
        <Timing onChangeTime = {setMinutes}/>
      </View>
      <View style={styles.buttonWraper}>
        {isStarted && (
          <RoundedButton title="Pause" onPress={() => setIsStarted(false)} />
        )}
        {!isStarted && (
          <RoundedButton title="Start" onPress={() => setIsStarted(true)} />
        )}
      </View>
      <View style={styles.clearTimingWrapper}>
        <RoundedButton size={50} title='-' onPress={() => clearSubject(focusSubject)}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  countdown: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonWraper: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  timmingWraper: {
    paddingTop: spacing.lg,
    flex: 0.1,
    flexDirection: 'row'
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.white,
  },
  task: {
    color: colors.white,
    textAlign: 'center',
  },
  clearTimingWrapper: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
