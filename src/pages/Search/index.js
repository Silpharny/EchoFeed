import react, { useState, useEffect } from "react";
import { Container, SearchInput, AreaInput, List } from "./styles";
import { Feather } from "@expo/vector-icons";

import { db } from "../../firebaseConfig.js";
import {
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import SearchList from "../../components/SearchList/index.js";

export default function Search() {
  const [input, setInput] = useState();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (input === "" || input === undefined) {
      setUsers([]);
      return;
    }

    function subscriber() {
      const docRef = collection(db, "users");
      const queryUser = query(
        docRef,
        where("name", ">=", input),
        where("name", "<=", input + "\uf8ff")
      );

      onSnapshot(queryUser, (snapShot) => {
        const listUsers = [];
        snapShot.forEach((doc) => {
          listUsers.push({
            ...doc.data(),
            id: doc.id,
          });
          setUsers(listUsers);
        });
      });
    }

    return () => subscriber();
  }, [input]);

  return (
    <Container>
      <AreaInput>
        <Feather name="search" size={20} color="#dc6601" />
        <SearchInput
          placeholder="Procurando alguém?"
          value={input}
          onChangeText={(text) => setInput(text)}
          placeholderTextColor="#353840"
        />
      </AreaInput>
      <List
        data={users}
        renderItem={({ item }) => <SearchList data={item} />}
      />
    </Container>
  );
}
