import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../components/RoundedButton';
import { spacing, fontSizes } from '../utils/sizes';
export const Focus = ({ currentObjectUpdate }) => {
  const [obj, setObj] = useState(null);
  console.log(obj);
  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setObj}
          label="What do you like to focus on right now?"
        />
        <RoundedButton
          title="+"
          size={45}
          onPress={() => {
            currentObjectUpdate(obj);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
    fontSize: 12,
  },
  textInputContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    padding: spacing.lg,
  },
});
