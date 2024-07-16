import { Container, Name } from "./styles";

import { useNavigation } from "@react-navigation/native";

export default function SearchList({ data }) {
  const navigation = useNavigation();

  return (
    <Container
      onPress={() => {
        navigation.navigate("postuser", {
          title: data.name,
          userId: data.uid,
        });
      }}
    >
      <Name>{data.name}</Name>
    </Container>
  );
}
