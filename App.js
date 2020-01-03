import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Keyboard,
  StatusBar,
} from 'react-native';

export default function App() {
  const [offset] = useState(new Animated.ValueXY({x: 0, y: 95}));
  const [opacity] = useState(new Animated.Value(0));
  const [logo] = useState(new Animated.ValueXY({x: 130, y: 155}));

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', KeyboardDidShow);
    Keyboard.addListener('keyboardDidHide', KeyboardDidHide);

    Animated.parallel([
      Animated.spring(offset.y, {
        toValue: 0,
        speed: 4,
        bounciness: 20,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
      }),
    ]).start();
  }, [KeyboardDidHide, KeyboardDidShow, offset.y, opacity]);

  const KeyboardDidShow = useCallback(() => {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 55,
        duration: 150,
      }),
      Animated.timing(logo.y, {
        toValue: 65,
        duration: 150,
      }),
    ]).start();
  }, [logo]);

  const KeyboardDidHide = useCallback(() => {
    Animated.parallel([
      Animated.timing(logo.x, {
        toValue: 130,
        duration: 150,
      }),
      Animated.timing(logo.y, {
        toValue: 155,
        duration: 150,
      }),
    ]).start();
  }, [logo]);

  return (
    <KeyboardAvoidingView style={styles.background}>
      <StatusBar backgroundColor="#191919" />
      <View style={styles.containerLogo}>
        <Animated.Image
          style={{
            width: logo.x,
            height: logo.y,
          }}
          source={require('./src/assets/logo.png')}
        />
      </View>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: opacity,
            transform: [{translateY: offset.y}],
          },
        ]}>
        <TextInput
          style={styles.input}
          placeholder="E-mail"
          autoCorrect={false}
          onChangeText={() => {}}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          autoCorrect={false}
          secureTextEntry
          onChangeText={() => {}}
        />
        <TouchableOpacity style={styles.btnSubmit}>
          <Text style={styles.txtSubmit}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btnRegister}>
          <Text style={styles.txtRegister}>Criar conta gratuita</Text>
        </TouchableOpacity>
      </Animated.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#191919',
  },
  containerLogo: {
    flex: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    paddingBottom: 50,
  },
  input: {
    backgroundColor: '#fff',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 17,
    borderRadius: 7,
    padding: 10,
  },
  btnSubmit: {
    backgroundColor: '#35aaff',
    width: '90%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 7,
  },
  txtSubmit: {
    color: '#fff',
    fontSize: 18,
  },
  btnRegister: {
    marginTop: 10,
  },
  txtRegister: {
    color: '#fff',
  },
});
