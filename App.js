import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View, Picker, Modal, TouchableHighlight, Alert, KeyboardAvoidingView } from 'react-native';
import { Button, Header, Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';

export default function App() {
  const [state] = useState(["AL", "AK", "AZ", "AR", "CA",
                            "CO", "CT", "DE", "FL", "GA",
                            "HI", "ID", "IL", "IN", "IA",
                            "KS", "KY", "LA", "ME", "MD",
                            "MA", "MI", "MN", "MS", "MO", 
                            "MT", "NE", "NV", "NH", "NJ", 
                            "NM", "NY", "NC", "ND", "OH", 
                            "OK", "OR", "PA", "RI", "SC",
                            "SD", "TN", "TX", "UT", "VT", 
                            "VA", "WA", "WV", "WI", "WY" 
                          ]);
  const [modalVisible, setModalVisible] = useState(false);
  // const [name, setName] = useState(""); 
  // const [email, setEmail] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");  
  // const [zipCode, setZipCode] = useState("");  
  const [currState, setCurrState] = useState("CA");
  // const [phoneNumber, setPhoneNumber] = useState("");  
  // const [reason, setReason] = useState("");  

  // handleSubmit = () => {
  //   console.log("name is", name);
  //   console.log("email is", email);
  //   console.log("address is", address);
  //   console.log("city is", city);
  //   console.log("zipCode is", zipCode);
  //   console.log("currState is", currState);
  //   console.log("phoneNumber is", phoneNumber);
  //   console.log("reason is", reason);
  // }

  emailInput = null;
  addressInput = null;
  cityInput = null;
  zipCodeInput = null;
  stateInput = null;
  phoneNumberInput = null;
  reasonInput = null;

  return (
    <React.Fragment>
      <Header
        centerComponent={{ text: 'Trillion Registry', style: { color: '#fff' } }}
        containerStyle={{
          backgroundColor: '#3D6DCC',
          justifyContent: 'space-around',
        }}
      />
      <ScrollView>
        <View>
          <Formik
            initialValues={{ name: '', email: '', address: '', city: '', zipCode: '', state: 'CA', phoneNumber: '', reason: '' }}
            validationSchema={Yup.object({
              name: Yup.string()              
                .required('Required'),
              email: Yup.string()
                .email('Invalid Email')
                .required('Required'),
              address: Yup.string()
                .required('Required'),
              city: Yup.string()
                .required('Required'),
              zipCode: Yup.string()
                .required('Required'),
              state: Yup.string()
                .required('Required'),
              phoneNumber: Yup.string()
                .required('Required'),
              reason: Yup.string()
                .required('Required'),
            })}
            onSubmit={(values, formikActions) => {
              setTimeout(() => {
                Alert.alert(JSON.stringify(values));
                formikActions.setSubmitting(false);
              }, 500);
            }}>
            {props => (
              <KeyboardAvoidingView behavior="position">
                <View style={styles.container}>
                  <Input
                    style={styles.textInput}
                    label="Name:"
                    placeholder="Your Name"
                    onChangeText={props.handleChange('name')}
                    onBlur={props.handleBlur('name')}
                    value={props.values.name}
                    onSubmitEditing={() => {
                      emailInput.focus()
                    }}
                    errorStyle={{ color: 'red' }}
                    errorMessage={props.touched.name && props.errors.name ? props.errors.name : ""}
                  />
                  <Input
                    style={styles.textInput}
                    label="Email:"
                    placeholder="Your email"
                    onChangeText={props.handleChange('email')}
                    onBlur={props.handleBlur('email')}
                    value={props.values.email}
                    ref={el => emailInput = el}
                    onSubmitEditing={() => {
                      addressInput.focus()
                    }}
                    errorStyle={{ color: 'red' }}
                    errorMessage={props.touched.email && props.errors.email ? props.errors.email : ""}
                  />
                  <Input
                    style={styles.textInput}
                    label="Address:"
                    placeholder="Your address"
                    onChangeText={props.handleChange('address')}
                    onBlur={props.handleBlur('address')}
                    value={props.values.address}
                    ref={el => addressInput = el}
                    onSubmitEditing={() => {
                      cityInput.focus()
                    }}
                    errorStyle={{ color: 'red' }}
                    errorMessage={props.touched.address && props.errors.address ? props.errors.address : ""}
                  />
                  <Input
                    style={styles.textInput}
                    label="City:"
                    placeholder="Your city"
                    onChangeText={props.handleChange('city')}
                    onBlur={props.handleBlur('city')}
                    value={props.values.city}
                    ref={el => cityInput = el}
                    onSubmitEditing={() => {
                      zipCodeInput.focus()
                    }}
                    errorStyle={{ color: 'red' }}
                    errorMessage={props.touched.city && props.errors.city ? props.errors.city : ""}
                  />
                  <Input
                    style={styles.textInput}
                    label="Zip Code:"
                    placeholder="Your zip code"
                    onChangeText={props.handleChange('zipCode')}
                    onBlur={props.handleBlur('zipCode')}
                    value={props.values.zipCode}
                    ref={el => zipCodeInput = el}
                    onSubmitEditing={() => {
                      stateInput.focus()
                    }}
                    errorStyle={{ color: 'red' }}
                    errorMessage={props.touched.zipCode && props.errors.zipCode ? props.errors.zipCode : ""}
                  />
                  
                  <View>
                    <Input 
                      style={styles.textInput}
                      label="State:"
                      value={props.values.state}
                      disabled
                    />
                    <View>
                      <Modal
                        animationType="slide"
                        transparent={false}
                        visible={modalVisible}
                        onRequestClose={() => {
                          Alert.alert('Modal has been closed.');
                        }}>
                        <View style={styles.container}>
                          <View>
                            <TouchableHighlight
                              onPress={() => {
                                setModalVisible(!modalVisible);
                              }}>
                              <Text>Hide Modal</Text>
                            </TouchableHighlight>
                            <Picker
                              selectedValue={props.values.state}
                              style={{height: 50, width: 100}}
                              onValueChange={(itemValue, itemIndex) => 
                                props.setFieldValue('state', itemValue)
                              }
                              renderHeader={backAction => (
                                <Button onPress={() => {
                                    backAction();
                                    someFunction();
                                }} />
                              )}>
                              {state.map( (v)=>{
                                return <Picker.Item label={v} value={v} key="TEST" />
                              })}
                            </Picker>
                          </View>
                        </View>
                      </Modal>
                      <TouchableHighlight
                        ref={el => stateInput = el}
                        onPress={() => {
                          setModalVisible(true);
                        }}>
                        <Text>Show Modal</Text>
                      </TouchableHighlight>
                    </View>
                  </View>

                  <Input
                    style={styles.textInput}
                    label="Phone Number:"
                    placeholder="Your phone number"
                    onChangeText={props.handleChange('phoneNumber')}
                    onBlur={props.handleBlur('phoneNumber')}
                    value={props.values.phoneNumber}
                    ref={el => phoneNumberInput = el}
                    onSubmitEditing={() => {
                      reasonInput.focus()
                    }}
                    errorStyle={{ color: 'red' }}
                    errorMessage={props.touched.phoneNumber && props.errors.phoneNumber ? props.errors.phoneNumber : ""}
                  />
                  <Input
                    multiline
                    style={styles.textInput}
                    label="Reason:"
                    placeholder="Your reason"
                    maxLength={1000}
                    numberOfLines={4}
                    onChangeText={props.handleChange('reason')}
                    onBlur={props.handleBlur('reason')}
                    value={props.values.reason}
                    ref={el => reasonInput = el}
                    errorStyle={{ color: 'red' }}
                    errorMessage={props.touched.reason && props.errors.reason ? props.errors.reason : ""}
                  />

                  <Button
                    title="Submit"
                    buttonStyle={{ backgroundColor: 'red' }}
                    onPress={props.handleSubmit}
                    loading={props.isSubmitting}
                    disabled={props.isSubmitting}
                  />
                </View>
              </KeyboardAvoidingView>
            )}
          </Formik>      
        </View>
      </ScrollView>
    </React.Fragment>
  );
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: '#CCCCCC',
    borderWidth: 2,
    borderRadius: 15,
    height: 50,
    fontSize: 25,
    paddingLeft: 20,
    paddingRight: 20
  },
});