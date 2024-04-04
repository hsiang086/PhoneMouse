import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const Mouse = ({ route, navigation }) => {
  const { hostIp, port } = route.params;
//   const [isLeftPressed, setIsLeftPressed] = useState(false);
//   const [isRightPressed, setIsRightPressed] = useState(false);
  const isLeftPressedRef = useRef(false);
  const isRightPressedRef = useRef(false);

  Accelerometer.setUpdateInterval(10);

  useEffect(() => {
    const subscription = Accelerometer.addListener((data) => {
      fetch(`http://${hostIp}:${port}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data,
          isLeftPressed: isLeftPressedRef.current,
          isRightPressed: isRightPressedRef.current
        }),
      });
    });

    const unsubscribe = navigation.addListener('blur', () => {
      subscription.remove();
    });

    return unsubscribe;
  }, [hostIp, port, navigation]);

  const handleLeftPressIn = () => {
    // setIsLeftPressed(true);
    isLeftPressedRef.current = true;
  };

  const handleLeftPressOut = () => {
    // setIsLeftPressed(false);
    isLeftPressedRef.current = false;
  };

  const handleRightPressIn = () => {
    // setIsRightPressed(true);
    isRightPressedRef.current = true;
  };

  const handleRightPressOut = () => {
    // setIsRightPressed(false);
    isRightPressedRef.current = false;
  };

  return (
    <View style={styles.container}>
      <View style={styles.mouseContainer}>
        <TouchableOpacity
          style={[
            styles.mouseButton,
            // isLeftPressed ? styles.mouseButtonPressed : null,
          ]}
          onPressIn={handleLeftPressIn}
          onPressOut={handleLeftPressOut}
        >
          {/* <Text style={styles.mouseButtonText}>Left</Text> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.mouseButton,
            // isRightPressed ? styles.mouseButtonPressed : null,
          ]}
          onPressIn={handleRightPressIn}
          onPressOut={handleRightPressOut}
        >
          {/* <Text style={styles.mouseButtonText}>Right</Text> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Mouse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  mouseContainer: {
    flexDirection: 'row',
    height: '30%',
  },
  mouseButton: {
    backgroundColor: '#ccc',
    width: '50%',
    height: '100%',
  },
  mouseButtonPressed: {
    backgroundColor: '#aaa',
  },
  mouseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
