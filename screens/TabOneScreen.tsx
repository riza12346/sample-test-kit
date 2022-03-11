import { useState } from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button } from "react-native-elements";
import LottieView from 'lottie-react-native'

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) { 
  const[email, setEmail]=useState<string>("");
  const[password, setPassword]=useState<string>("");
  return (
    <View style={{
      flex: 0,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <View style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#E7EEF1',
        borderRadius: 10,
        overflow: 'hidden',
        padding: 10,
      }}>

<View style={{
  flex:2,
  backgroundColor:'white' }}> 
  <LottieView
  source={require('../../../New folder/sample-test-kit/assets/lottie/53395-login.json')}
autoPlay={true}
loop={true}
/>

      </View>

        <View style={{
          flex: 0,
          justifyContent: 'center',
          paddingHorizontal: 20,
          backgroundColor: 'white'
        }}>

        <TextInput
        
        label="Email"
        value={email}
        autoComplete={false}
        style={{marginBottom: 10}}
        onChangeText={(text: string) => {
          setEmail(text);
        }}
        />
       <TextInput
        label="Password"
        secureTextEntry={true}
        value={password}
        autoComplete={false}
        style={{marginBottom: 10}}
        onChangeText={(text: string) => {
          setEmail(text);
        }}
        />

      </View> 
      <View style={{
        flex: 0, 
        width: '100%', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor:'white'
      }}>
        
      <Button
      title={'LOGIN'}
      buttonStyle={{
      backgroundColor: '#7209b7',
      borderRadius: 10,
      padding: 20,
      paddingHorizontal: 40,
      marginBottom: 10,
      }}
  
/>
<Button
      title={'Sign up'}
      buttonStyle={{
      backgroundColor: '#7209b7',
      borderRadius: 10,
      padding: 20,
      paddingHorizontal: 40,
      marginBottom: 10,
      }}
      />
    </View>
    </View>
    </View>
   
  );
}