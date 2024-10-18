import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity, Text, ImageBackground, Image, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { Searchbar, Card, FAB, IconButton, Portal, Dialog, Button } from 'react-native-paper';
import useStore from '../store';

const HomeScreen = ({ navigation }) => {
  const [deleteItemId, setDeleteItemId] = useState(null);
  const todos = useStore(state => state.todos);
  const searchQuery = useStore(state => state.searchQuery);
  const setSearchQuery = useStore(state => state.setSearchQuery);
  const getFilteredTodos = useStore(state => state.getFilteredTodos);
  const loadTodos = useStore(state => state.loadTodos);
  const deleteTodo = useStore(state => state.deleteTodo);

  useEffect(() => {
    loadTodos();
  }, []);

  const handleDelete = (id) => {
    setDeleteItemId(id);
  };

  const confirmDelete = () => {
    if (deleteItemId) {
      deleteTodo(deleteItemId);
      setDeleteItemId(null);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('ItemDetails', { todo: item })}>
      <Card style={styles.card}>
        <Card.Title
          title={<Text style={styles.title}>{item.title}</Text>}
          right={(props) => (
            <IconButton
              {...props}
              icon="delete"
              onPress={() => handleDelete(item.id)}
            />
          )}
        />
        <Card.Content>
          <View style={styles.descriptionContainer}>
            <Text style={styles.emoji}>📝</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.headerContainer}>
            <Image
              source={require('../assets/Image/Icon-img.jpg')}
              style={styles.iconImage}
            />
            <Text style={styles.headerTitle}>Daily Do</Text>
          </View>
          
          <Searchbar
            placeholder="Search todos"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
          />
          <View style={styles.containerBody}>
            <ImageBackground
              source={require('../assets/Image/screnimg.png')}  
              style={styles.cardBackground}
              imageStyle={styles.cardBackgroundImage}
            />
          </View>

          <FlatList
            data={getFilteredTodos()}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
            scrollEnabled={false}
          />
        </ScrollView>
        <FAB
          style={styles.fab}
          icon="plus"
          onPress={() => navigation.navigate('AddItem')}
        />
        
        <Portal>
          <Dialog visible={!!deleteItemId} onDismiss={() => setDeleteItemId(null)}>
            <Dialog.Title>Delete Todo</Dialog.Title>
            <Dialog.Content>
              <Text>Are you sure you want to delete this todo?</Text>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={() => setDeleteItemId(null)}>Cancel</Button>
              <Button onPress={confirmDelete}>Delete</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#ffffff',
  },
  iconImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#334',
  },
  containerBody: {
    height: 200,
    backgroundColor: '#f5f5f5',
  },
  searchBar: {
    margin: 16,
  },
  list: {
    flex: 1,
  },
  card: {
    margin: 8,
    marginHorizontal: 16,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#334',
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 1,
  },
  emoji: {
    fontSize: 16,
    marginRight: 8,
  },
  description: {
    fontSize: 18,
    color: '#666',
    flex: 1,
  },
  cardBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBackgroundImage: {
    borderRadius: 10, 
  },
});

export default HomeScreen;