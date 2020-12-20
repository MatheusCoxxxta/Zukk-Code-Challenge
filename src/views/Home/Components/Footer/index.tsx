import {useNavigation} from '@react-navigation/native';
import React from 'react';

import {Foot, Button, ButtonText} from './styles';

const Footer = () => {
  const navigation = useNavigation();
  return (
    <>
      <Foot>
        <Button
          onPress={() => {
            navigation.navigate('Drawer');
          }}>
          <ButtonText>Editar Pontos</ButtonText>
        </Button>
      </Foot>
    </>
  );
};

export default Footer;
