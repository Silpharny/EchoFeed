import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;

  align-items: center;
  background-color: #353840;
`;

export const ContainerContent = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Name = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 28px;
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
`;

export const Button = styled.Pressable`
  width: 80%;
  height: 50px;
  margin-top: 16px;
  border-radius: 4px;
  background-color: ${(props) => props.bg};
  align-items: center;
  justify-content: center;
`;

export const TextButton = styled.Text`
  color: ${(props) => props.color};
  font-weight: bold;
  font-size: 18px;
`;

export const UploadButton = styled.Pressable`
  background-color: #fff;
  width: 165px;
  height: 165px;
  border-radius: 90px;
  align-items: center;
  justify-content: center;
  z-index: 8;
`;

export const Avatar = styled.Image`
  width: 160px;
  height: 160px;
  border-radius: 80px;
  opacity: 0.9;
`;

export const ModalContainer = styled.KeyboardAvoidingView`
  width: 100%;
  height: 70%;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 50px;
  border-top-left-radius: 50px;
`;

export const ButtonBack = styled.Pressable`
  position: absolute;
  top: 15px;
  left: 25px;
  flex-direction: row;
  align-items: center;
`;
export const Input = styled.TextInput`
  background-color: #ddd;
  width: 80%;
  border-radius: 4px;
  padding: 10px;
  font-size: 18px;
  color: #121212;
  text-align: center;
`;

export const ContainerPhoto = styled.View`
  background-color: #fff;
  width: 200px;
  height: 200px;
  border-radius: 100px;
  align-items: center;
  justify-content: center;
`;

export const ProfileImage = styled.Image`
  width: 120px;
  height: 120px;
`;
