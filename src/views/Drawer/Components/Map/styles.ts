import styled from 'styled-components';

const MapParentBox = styled.View`
  height: 500px;
`;

const Foot = styled.View`
  height: 100px;
`;

const Button = styled.TouchableOpacity`
  margin: 20px 0;
  height: 45px;
  border-radius: 5px;
  background-color: #459;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #fff;
  font-size: 14px;
  font-weight: bold;
`;

export {MapParentBox, Foot, Button, ButtonText};
