import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'proptypes';
import {
  Container,
  SubmitButton,
  Input,
  Form,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  ProfileButtonRemove,
} from './styles';
import api from '../../services';

export default function Main({ navigation }) {
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const localStorage = async () => {
      const user = await AsyncStorage.getItem('users');

      if (user && user !== users) {
        setUsers(JSON.parse(user));
      }
    };
    localStorage();
  }, []);

  const handleAddUser = async () => {
    setLoading(true);
    const response = await api.get(`/users/${state}`);
    const { name, login, bio, avatar_url: avatarUrl } = response.data;
    setUsers([...users, { name, login, bio, avatarUrl }]);
    await AsyncStorage.setItem(
      'users',
      JSON.stringify([...users, { name, login, bio, avatarUrl }])
    );
    setState('');
    setLoading(false);
    Keyboard.dismiss();
  };

  const handleNavigation = user => {
    navigation.navigate('User', { user });
  };

  const removeUser = async id => {
    const remove = users.filter(user => user.login !== id);
    setUsers(remove);
    await AsyncStorage.setItem('users', JSON.stringify(remove));
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar usuário"
          value={state}
          onChangeText={text => setState(text)}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton loading={loading} onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>

      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Avatar source={{ uri: item.avatarUrl }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio}</Bio>
            <ProfileButton onPress={() => handleNavigation(item)}>
              <ProfileButtonText>Ver perfil</ProfileButtonText>
            </ProfileButton>
            <ProfileButtonRemove onPress={() => removeUser(item.login)}>
              <ProfileButtonText>Remover usuário</ProfileButtonText>
            </ProfileButtonRemove>
          </User>
        )}
      />
    </Container>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.function,
  }).isRequired,
};

Main.navigationOptions = {
  title: 'Usuários',
};
