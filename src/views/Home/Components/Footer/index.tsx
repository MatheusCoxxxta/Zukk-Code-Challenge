import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {Foot, Button, ButtonText} from './styles';

const Footer = () => {
  const navigation = useNavigation();
  return (
    <>
      <Foot>
        <Button>
          <ButtonText
            onPress={() => {
              navigation.navigate('Drawer');
            }}>
            Editar Layer
          </ButtonText>
        </Button>
      </Foot>
    </>
  );
};

export default Footer;
