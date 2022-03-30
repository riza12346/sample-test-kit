import { Dimensions, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, PlatformColor } from 'react-native';
import LottieView from 'lottie-react-native';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import { Button } from "react-native-elements";
import { useAssets } from 'expo-asset';
import { TextInput } from 'react-native-paper';
import React, { Fragment, useState } from 'react';
import ViewWithLoading from  "../components/ViewWithLoading"
import { Appbar } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from "yup";
import { white } from 'react-native-paper/lib/typescript/styles/colors';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { parse, isDate } from "date-fns";


export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const emailError = "Invalid email address.";
  const passwordError = "Password must contain at least 8 to 16 characters, a combination of upper and lowercase letters, and at least one number or symbol.";
  const cpnumError = "Invalid mobile number.";

  const registerSchema = yup.object({
    firstname: yup.string().required('First Name is required.'),
    lastname: yup.string().required('Last Name is required.'),
    birthday: yup.mixed()
            .test('valid-date', 'Please select date from calendar.', val =>
                moment(val, 'DD-MM-YYYY').isValid()
            )
            .test('valid-length', 'Please enter a valid date.', val => {
                return val ? val.replace(/[-_]/g, '').length === 8 : false
            })
            .test('is-of-age', 'You must be 18 years or older to sign up.', val => {
                return moment().diff(moment(val, 'DD-MM-YYYY'), 'year') >= 18
            }),
    address: yup.string().required('Address is required.'),
    mobilenumber: yup.string().required('Mobile Number is required.'),
      //.matches(/^9\d{9}$/, cpnumError),
    email: yup.string().required('Email address is required.')
        .matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/, emailError),
    password: yup.string().required('Password is required.')
        .matches(/^(?:(?=.*[0-9])(?=.{8,16}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])|(?=.{8,16}$)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)).*$/, passwordError),
    retypepw: yup.string().required('Please re-type password.').oneOf([yup.ref('password'), null], 'Password does not match.'),
});

const handleCheckDate = (handleChange: any, date: string) => {
  return handleChange(date);
}
  
  setTimeout (() => {
    setLoading(false);
  },3000);

  return (

<ScrollView style={styles.ScrollViewContainer}>
    <ViewWithLoading
      loading={loading}
    >
    <View style={styles.container}>
  
      <View style={{
        height: '100%',
        width: '100%',
        backgroundColor: '#0a191e',
        borderRadius: 10,
        borderColor: '#0a191e',
        overflow: 'hidden',
        padding: 0,
        borderWidth: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection: 'column'
      }}>

        <View style={styles.titleContainer}>
          <Text style={{
            fontSize: 30,
            fontFamily: 'poppins-bold',
            fontWeight: 'bold',
            color: '#fde2e4',
          }}>
          Create  an  Account
          </Text>
        </View>

    <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    birthday: '',
                    address: '',
                    mobilenumber: '',
                    email: '',
                    password: '',
                    retypepw: ''
                }}
                onSubmit={(values, actions) => {
                  console.log(values);
                  actions.resetForm();
                }}
                validationSchema={registerSchema}
            >
                {({ handleChange, handleSubmit, values, errors, touched }) => (
    <Fragment>
      <View style={{
          flex: 0,
          justifyContent: 'center',
          paddingHorizontal: 10,
          backgroundColor: '#0a191e'
        }}>

        <TextInput
        label="First Name"
        mode={"flat"}
        value={values.firstname}
        autoComplete={false}
        style={{marginBottom: 5, marginTop: 10}}
        onChangeText={handleChange('firstname')}
        error={errors.firstname ? true : false}
        />
        {errors.firstname &&
          <Text style={{
            color: 'white',
            paddingBottom: 5
          }} >
            {errors.firstname}
          </Text>
        }
        <TextInput
        label="Last Name"
        mode={"flat"}
        value={values.lastname}
        autoComplete={false}
        style={{marginBottom: 0}}
        onChangeText={handleChange('lastname')}
        error={errors.lastname ? true : false}
        />
        {errors.lastname &&
          <Text style={{
            color: 'white',
            paddingBottom: 5
          }} >
            {errors.lastname}
          </Text>
        }

        <View style={{
          flex: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#0a191e',
        }}>

        <View style={{ width: '90%', backgroundColor: '#0a191e'}}>
          <TextInput
          value={values.birthday}
          mode={"flat"}
          onChangeText={handleChange('birthday')}
          label={"Birthday"}
          error={errors.birthday ? true : false}
          autoComplete={false}
          style={{marginBottom: 10, marginTop: 10}}
          />
          {errors.birthday &&
          <Text style={{
            color: 'white',
            paddingBottom: 5
          }} >
            {errors.birthday}
          </Text>
         }
          </View>
          <TouchableOpacity
            onPress={() => setVisible(true)}
          >
          <Ionicons name='calendar' size={30} color='pink' />
            </TouchableOpacity>
              </View>
                <DateTimePickerModal
                  isVisible={visible}
                  mode="date"
                  onConfirm={(date) => {
                  var dd = String(date.getDate()).padStart(2, '0');
                  var mm = String(date.getMonth() + 1).padStart(2, '0'); 
                  var yyyy = date.getFullYear();

                  setVisible(false);
                  handleCheckDate(handleChange('birthday'), `${dd}-${mm}-${yyyy}`);
                  }}
                  onCancel={() => setVisible(false)}
                  isDarkModeEnabled={false}
                  />

        <TextInput
        label="Address"
        mode={"flat"}
        value={values.address}
        autoComplete={false}
        style={{marginBottom: 5}}
        onChangeText={handleChange('address')}
        error={errors.address ? true : false}
        />
        {errors.address &&
          <Text style={{
            color: 'white',
            paddingBottom: 5
          }} >
            {errors.address}
          </Text>
        }
        <TextInput
        label="Mobile Number (+63)"
        mode={"flat"}
        value={values.mobilenumber}
        keyboardType={"number-pad"}
        autoComplete={false}
        style={{marginBottom: 5}}
        onChangeText={handleChange('mobilenumber')}
        error={errors.mobilenumber ? true : false}
        />
        {errors.mobilenumber &&
          <Text style={{
            color: 'white',
            paddingBottom: 5
          }} >
            {errors.mobilenumber}
          </Text>
        }
        <TextInput
        label="E-mail Address"
        mode={"flat"}
        keyboardType={"email-address"}
        value={values.email}
        autoComplete={false}
        style={{marginBottom: 5}}
        right={<TextInput.Icon name="email" color={"purple"}/>}
        onChangeText={handleChange('email')}
        error={errors.email ? true : false}
        />
        {errors.email &&
          <Text style={{
            color: 'white',
            paddingBottom: 5
          }} >
            {errors.email}
          </Text>
        }
        <TextInput
        label="Password"
        mode={"flat"}
        value={values.password}
        autoComplete={false}
        style={{marginBottom: 5}}
        onChangeText={handleChange('password')}
        error={errors.password ? true : false}
        right={
        <TextInput.Icon 
        name={visible ? "eye" : "eye-off"}
        onPress={() => {
            setVisible(!visible);
        }}
          color={"purple"}
        />
        }
        secureTextEntry={!visible}
        />
        {errors.password &&
          <Text style={{
            color: 'white',
            paddingBottom: 5
          }} >
            {errors.password}
          </Text>
        }
        <TextInput
        label="Re-type Password"
        mode={"flat"}
        value={values.retypepw}
        autoComplete={false}
        style={{marginBottom: 5}}
        onChangeText={handleChange('retypepw')}
        error={errors.retypepw ? true : false}
        right={
        <TextInput.Icon 
        name={visible ? "eye" : "eye-off"}
        onPress={() => {
            setVisible(!visible);
        }}
          color={"purple"}
        />
        }
        secureTextEntry={!visible}
        />
        {errors.retypepw &&
          <Text style={{
            color: 'white',
            paddingBottom: 5
          }} >
            {errors.retypepw}
          </Text>
        }
  </View>

        <View style={styles.PrivacyPolicyContainer}>
          <Text style={{
            fontSize: 13,
            fontWeight: 'bold',
            color: 'skyblue',
            marginBottom: 5,
            paddingHorizontal: 50,
            paddingBottom: 10,
            paddingTop: 10,
            textDecorationLine: 'underline',
            fontFamily: 'poppins-bold'
          }}>
          
          </Text>
          </View>

        <View style={styles.buttonContainer}>

             <Button
                    title="REGISTER"
                    buttonStyle={{
                        backgroundColor: '#b5179e',
                        borderRadius: 30,
                        padding: 15,
                        paddingHorizontal: 40,
                        paddingBottom: 10
                    }}
                    titleStyle={{
                        color: '#ffff',
                        fontFamily: 'poppins-bold',
                    }}
                    onPress={() => {
                      handleSubmit();
                    }}
              />
        </View >
</Fragment>
)}
</Formik>
</View> 
</View>
</ViewWithLoading>
</ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer:{
    flex: 0.5, 
    borderWidth: 0, 
    alignItems: 'center', 
    backgroundColor: '#0a191e',
    marginTop: 20,
    paddingTop: 40,
    paddingBottom: 10,
    fontFamily: 'poppins-bold'
    },
  buttonContainer:{
    flex: 0, 
    width: '100%', 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor:'#0a191e',
    paddingBottom: 40,
  },
  PrivacyPolicyContainer:{
    flex: 0, 
    borderWidth: 0, 
    alignItems: 'center', 
    backgroundColor: '#0a191e'
  },
  ScrollViewContainer:{
    backgroundColor: '#0a191e',
    marginHorizontal: 0,
    flexGrow: 1
  }
})