import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import {Item, Label, Input, Icon} from "native-base";

interface FormInputProps {
    label: string,
    placeholder: string,
    isValid?: boolean,
    handleInputChange: (text: string) => void,
    otherProps?: object
}

const _buildFeedbackIcon = (isValid?: boolean) : JSX.Element | undefined => {
    //if user has not write anything dont check check for validity
    if (isValid === undefined) return;
     return (!isValid ? <Icon key={"closecircle"} type="AntDesign" name='closecircle' /> 
            : 
           <Icon key="checkcircle" type="AntDesign" name='checkcircle' />)
}

const FormInput = (props: FormInputProps) => {
    let validationFeedback = props.isValid !== undefined? {error: !props.isValid, success: props.isValid} : {}
  return (
      <>
          <Item style={{marginHorizontal: 20}} inlineLabel {...validationFeedback}>
            <Label >{props.label}</Label>
            <Input {...props.otherProps} placeholder={props.placeholder} onChange={(e) => props.handleInputChange(e.nativeEvent.text)}  />
           {_buildFeedbackIcon(props.isValid) }
          </Item>
        </>
  );
};

export default FormInput;

const styles = StyleSheet.create({
  container: {}
});
