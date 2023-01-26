import React, { useState } from 'react';
import TextInput from 'react-native-textinput-with-icons'


export default function TextInputIcon() {
    const [state, setState] = useState('test')
    return (
        <TextInput
          label="Name"
          leftIcon="thumbsup"
          leftIconType="oct"
          rippleColor="blue"
          rightIcon="react"
          rightIconType="material"
          value={state}
          refrance={(refrance) => {
              this.input = refrance;
          }}
          onChangeText={name => setState({ name })}
        />
    )
}