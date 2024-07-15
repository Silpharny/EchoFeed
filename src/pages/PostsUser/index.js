import React, { useLayoutEffect, useState, useCallback } from "react";
import { Text } from "react-native";
import { Container } from "./styles";

import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import react from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

export default function PostsUser() {
  const route = useRoute();
  const navigation = useNavigation();

  const [title, setTitle] = useState(route.params?.title);

  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title === "" ? "" : title,
    });
  }, [navigation, title]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      const postRef = collection(db, "posts");

      const postsQuery = query(
        postRef,
        where("uid", "==", route.params.userId),
        orderBy("createBy", "desc")
      );
      getDocs(postsQuery).then((data) => {
        const postList = [];
        data.docs.map((user) => {
          postList.push({
            ...user.data(),
            id: user.id,
          });
        });

        if (isActive) {
          setPost(postList);
          console.log(postList);
          setLoading(false);
        }
      });

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    <Container>
      <Text>{route.params?.title}</Text>
    </Container>
  );
}
