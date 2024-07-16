import react, { useContext, useState, useEffect } from "react";
import { Modal, Platform, View } from "react-native";
import {
  Container,
  ContainerContent,
  Name,
  Button,
  TextButton,
  UploadButton,
  Avatar,
  ModalContainer,
  ButtonBack,
  Input,
} from "./styles";
import Header from "../../components/Header";
import { Feather } from "@expo/vector-icons";
import { AuthContext } from "../../contexts/auth";
import * as ImagePicker from "expo-image-picker";
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import {
  getDownloadURL,
  uploadBytesResumable,
  ref,
  uploadBytes,
  getStorage,
} from "firebase/storage";

export default function Profile() {
  const { handleLogout, authUser, setAuthUser, storageUser } =
    useContext(AuthContext);

  const [name, setName] = useState(authUser.name);
  const [url, setUrl] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    let isActive = true;
    async function loadingAvatar() {
      try {
        if (isActive) {
          const storageRef = ref(storage, "users/" + authUser.uid);
          const response = await getDownloadURL(storageRef).then(
            async (image) => {
              setUrl(image);
            }
          );
        }
      } catch (error) {
        console.log(error);
        setUrl(null);
      }
    }
    loadingAvatar();

    return () => (isActive = false);
  }, []);

  async function updateProfile() {
    if (name === "") {
      return;
    }

    const docUserRef = doc(db, "users", authUser.uid);

    await updateDoc(docUserRef, {
      name: name,
    });
    const queryPostsRef = query(
      collection(db, "posts"),
      where("uid", "==", authUser.uid)
    );

    const docSnap = await getDocs(queryPostsRef);

    docSnap.forEach(async (data) => {
      const docPostsRef = doc(db, "posts", data.id);

      await updateDoc(docPostsRef, {
        autor: name,
      });
    });

    let data = {
      uid: authUser.uid,
      name: name,
      email: authUser.email,
    };

    setAuthUser(data);
    storageUser(data);
    setModal(false);
  }

  const UploadFile = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [3, 4],
      quality: 1,
    });
    const uri = result.assets[0].uri;
    setUrl(uri);

    UploadFileFirebase(uri).then(() => {
      uploadAvatarPosts();
    });
  };

  const uploadAvatarPosts = async () => {
    const storageRef = ref(storage, "users/" + authUser.uid);
    const url = await getDownloadURL(storageRef).then(async (image) => {
      const queryPostsRef = await query(
        collection(db, "posts"),
        where("uid", "==", authUser.uid)
      );
      const docSnap = await getDocs(queryPostsRef);

      docSnap.forEach(async (user) => {
        const docPostsRef = doc(db, "posts", user.id);
        await updateDoc(docPostsRef, {
          avatarUrl: image,
        });
      });
    });
  };

  const UploadFileFirebase = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "users/" + authUser.uid);

    await uploadBytesResumable(storageRef, blob);
  };

  return (
    <Container>
      <Header />
      <ContainerContent>
        {url ? (
          <UploadButton onPress={() => UploadFile()}>
            <Avatar source={{ uri: url }} />
          </UploadButton>
        ) : (
          <UploadButton onPress={() => UploadFile()}>
            <Avatar source={require("../../assets/avatar.png")} />
          </UploadButton>
        )}

        <Name>{name}</Name>

        <Button bg="#dc6601" onPress={() => setModal(true)}>
          <TextButton color="#fff">Atualizar Perfil</TextButton>
        </Button>

        <Button bg="#ddd" onPress={handleLogout}>
          <TextButton color="#353840">Sair</TextButton>
        </Button>

        <Modal visible={modal} animationType="slide" transparent={true}>
          <ModalContainer behaivor={Platform.OS == "android" ? "" : "padding"}>
            <ButtonBack onPress={() => setModal(false)}>
              <Feather name="arrow-left" size={25} color="#121212" />
              <TextButton color="#121212">Voltar</TextButton>
            </ButtonBack>

            <Input
              placeholder={authUser?.name}
              value={name}
              onChangeText={(text) => setName(text)}
            />
            <Button bg="#dc6601" onPress={updateProfile}>
              <TextButton color="#fff">Salvar</TextButton>
            </Button>
          </ModalContainer>
        </Modal>
      </ContainerContent>
    </Container>
  );
}
