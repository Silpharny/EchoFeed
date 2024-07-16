import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useContext,
} from "react";
import { Text, View, ActivityIndicator } from "react-native";
import { Container, ListPosts } from "./styles";

import {
  useRoute,
  useNavigation,
  useFocusEffect,
} from "@react-navigation/native";
import react from "react";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebaseConfig";

import Card from "../../components/Card";

import { AuthContext } from "../../contexts/auth";

export default function PostsUser() {
  const route = useRoute();
  const navigation = useNavigation();
  const { authUser } = useContext(AuthContext);

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
      {loading ? (
        <View
          style={{ flex: 1, alignItem: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size="large" color="#dc6601" />
        </View>
      ) : (
        <ListPosts
          data={post}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <Card data={item} userId={authUser.uid} />}
        />
      )}
    </Container>
  );
}
