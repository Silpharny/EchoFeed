import styled from "styled-components/native";

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
  background-color: #353840;
  padding-top: 14px;
`;

export const AreaInput = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: #f1f1f1;
  margin: 10px;
  border-radius: 4px;
  padding: 5px 10px;
`;

export const SearchInput = styled.TextInput`
  width: 90%;
  height: 40px;
  font-size: 17px;
  padding-left: 8px;
  background-color: #f1f1f1;
`;

export const List = styled.FlatList`
  flex: 1;
  width: 90%;
`;
