import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { Formik } from 'formik'

import * as Yup from 'yup'

const passwordSchema = Yup.object().shape({
   passwordLength: Yup.number()
   .min(4,'Should have min length 4')
   .max(16,'Should have max length 16')
   .required('This field is required')
})
export default function App() {
  const [password, setPassword] = useState('')
  const[isPassGenerated, setIsPassGenerated] = useState(false)

  const[lowerCase, setLowerCase] = useState(true)
  const[upperCase, setUpperCase] = useState(true)
  const[numbers, setNumbers] = useState(false)
  const[symbols, setSymbols] = useState(false)

  const generatePasswordString = (passwordlength :number ) => {
    let characterList = '';

    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const digitChars = '0123456789';
    const specialChars = '!@#$%^&*()+_';

    if(upperCase){
      characterList += uppercaseChars
    }
    if(lowerCase){
      characterList += lowerCaseChars
    }
    if(numbers){
      characterList += digitChars
    }
    if(symbols){
      characterList += specialChars
    }

    const passwordResult = createPassword(characterList,passwordlength)
    setPassword(passwordResult)
    setIsPassGenerated(true)
    }
  const createPassword = (characters : string, passwordLength: number) =>{
    let result = ''
    for (let index = 0; index < passwordLength; index++) {
      const characterIndex = Math.round(Math.random() * characters.length)
      result += characters.charAt(characterIndex)
    }
    return result
  }
  const restPasswordState =() =>{
    setPassword('')
    setIsPassGenerated(false)
    setLowerCase(false)
    setUpperCase(false)
    setNumbers(false)
    setSymbols(false)
  }

  return (
    <ScrollView keyboardShouldPersistTaps ='handled'>
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
           initialValues={{passwordLength : ' '}}
           validationSchema ={passwordSchema}
           onSubmit ={ values => {
            generatePasswordString(+values.passwordLength)
           }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
         handleSubmit,
         handleReset,
       }) => (
         <>
         <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            {touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                {errors.passwordLength}
              </Text>
            )}
            </View>
            <TextInput
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            keyboardType = 'numeric'
            />
         </View>
         <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include lower case</Text>
          <BouncyCheckbox
           disableBuiltInState
           isChecked={lowerCase}
           onPress ={()=> setLowerCase(!lowerCase)}
           fillColor='green'
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include upper case</Text>
          <BouncyCheckbox
           disableBuiltInState
           isChecked={upperCase}
           onPress ={()=> setUpperCase(!upperCase)}
           fillColor='green'
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include digits</Text>
          <BouncyCheckbox
           disableBuiltInState
           isChecked={numbers}
           onPress ={()=> setNumbers(!numbers)}
           fillColor='green'
          />
         </View>
         <View style={styles.inputWrapper}>
         <Text style={styles.heading}>Include symbols</Text>
          <BouncyCheckbox
           disableBuiltInState
           isChecked={symbols}
           onPress ={()=> setSymbols(!symbols)}
           fillColor='green'
          />
         </View>

         <View style={styles.formActions}>
          <TouchableOpacity
          style={styles.primaryBtn}
          disabled ={!isValid}
          onPress={handleSubmit}
          >
            <Text style={styles.primaryBtnTxt}>Generate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
           style={styles.secondaryBtn}
          onPress={()=>{
            handleReset();
            restPasswordState()
          }}
          >
            <Text style={styles.secondaryBtnTxt}>Reset</Text>
          </TouchableOpacity>
         </View>
         </>
       )}
          </Formik>
        </View>
          {isPassGenerated? (
            <View  style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}>Result:</Text>
              <Text style={styles.description} >Long press to copy</Text>
              <Text style={styles.generatedPassword} selectable>{password}</Text>
            </View>
          ): null}
      </SafeAreaView>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  appContainer:{
    flex:1
  },
  formContainer:{
    margin:10
  },
  title:{
    fontSize:30,
    fontWeight:'500',
    marginBottom:15
  },
  inputWrapper: {
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  heading: {
    fontSize: 15,
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#808080',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin:30,
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#2E4F4F',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#0E8388',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'black'
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
})