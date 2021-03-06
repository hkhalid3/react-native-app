import React, { useState } from 'react';
import {
  StyleSheet, Text, View, Picker, Modal, TouchableHighlight, Alert, Platform
} from 'react-native';
import { Button, Header, Input } from 'react-native-elements';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { TextInputMask } from 'react-native-masked-text'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

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
  const [phoneNumberState, setPhoneNumberState] = useState("");
  const [phoneNumberFormatState, setPhoneNumberFormatState] = useState("");

  emailInput = null;
  addressInput = null;
  cityInput = null;
  zipCodeInput = null;
  stateInput = null;
  phoneNumberInput = null;
  reasonInput = null;

  tester = () => {
    console.log("phone is ", phoneNumberState);
  }

  return (
    <React.Fragment>
      <Header
        centerComponent={{ text: 'Trillion Registry', style: { color: '#fff' } }}
        containerStyle={{
          backgroundColor: '#3D6DCC',
          justifyContent: 'space-around',
        }}
      />
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={(Platform.OS === 'ios')}
      >
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
              />
              {props.touched.name && props.errors.name ? (
                <Text style={styles.error}>{props.errors.name}</Text>
              ) : null}
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
              />
              {props.touched.email && props.errors.email ? (
                <Text style={styles.error}>{props.errors.email}</Text>
              ) : null}
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
              />
              {props.touched.address && props.errors.address ? (
                <Text style={styles.error}>{props.errors.address}</Text>
              ) : null}
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
              />
              {props.touched.city && props.errors.city ? (
                <Text style={styles.error}>{props.errors.city}</Text>
              ) : null}
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
              />
              {props.touched.zipCode && props.errors.zipCode ? (
                <Text style={styles.error}>{props.errors.zipCode}</Text>
              ) : null}

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
                          style={{ height: 50, width: 100 }}
                          onValueChange={itemValue =>
                            props.setFieldValue('state', itemValue)
                          }
                          renderHeader={backAction => (
                            <Button onPress={() => {
                              backAction();
                              someFunction();
                            }} />
                          )}>
                          {state.map((v) => {
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

              <TextInputMask
                placeholder='Enter Phone Number'
                value={phoneNumberState}
                onChangeText={(phoneNumberFormat) => {
                  let phoneNumber = phoneNumberFormat.toString().replace(/\D+/g, '');
                  setPhoneNumberFormatState(phoneNumberFormat);
                  setPhoneNumberState(phoneNumber);
                  // this.setState({ phoneNumberFormat: phoneNumberFormat, phoneNumber: phoneNumber })
                }}
                type={'cel-phone'}
                // maxLength={this.state.phoneNumberFormat.toString().startsWith("1") ? 18 : 16}
                maxLength={phoneNumberState.toString().startsWith("1") ? 16 : 14}
                options={
                  phoneNumberState.toString().startsWith("1") ?
                    { dddMask: '1 (999) 999-9999' } :
                    { dddMask: '(999) 999-9999' }
                }
              // options={
              //   this.state.phoneNumber.startsWith("1") ?
              //     {
              //       dddMask: '9 (999) 999 - '
              //     } : {
              //       dddMask: '(999) 999 - '
              //     }
              // }
              />

              {/* <Input
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
                  /> */}
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
              />
              {props.touched.reason && props.errors.reason ? (
                <Text style={styles.error}>{props.errors.reason}</Text>
              ) : null}

              <View style={{
                flex: 10,
                // width: 500,
                alignItems: 'flex-start',
                justifyContent: 'space-around',
                flexDirection: 'row'
              }}>
                <View style={{
                  flex: 4,
                  // width: 244,
                }}
                >
                  <Button
                    title="test"
                    onPress={tester}
                  />
                </View>
                <View style={{
                  flex: 4,
                  // width: 244,
                }}>
                  <Button
                    title="test"
                    onPress={tester}
                  />
                </View>
              </View>
              {/* 
                  <Button
                    title="test"
                    onPress={tester}
                  />

                  <Button
                    title="Submit"
                    buttonStyle={{ backgroundColor: 'red' }}
                    onPress={props.handleSubmit}
                    loading={props.isSubmitting}
                    disabled={props.isSubmitting}
                  />
                   */}
            </View>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </React.Fragment >
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
  error: {
    margin: 8,
    fontSize: 14,
    color: 'red',
    fontWeight: 'bold',
  },
});