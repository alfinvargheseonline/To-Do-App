import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, ImageBackground } from 'react-native';
import { Card, Title, Portal, Dialog, Button } from 'react-native-paper';
import useStore from '../store';

const ItemDetailsScreen = ({ route, navigation }) => {
  const { todo } = route.params;
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const deleteTodo = useStore(state => state.deleteTodo);

  const handleDelete = () => {
    deleteTodo(todo.id);
    setShowDeleteDialog(false);
    navigation.goBack();
  };

  // Add the delete button to the navigation header
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button 
          icon="delete" 
          onPress={() => setShowDeleteDialog(true)}
          labelStyle={{ color: '#000' }}
        >
          Delete
        </Button>
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
       <View style={styles.containerBody}>
          <ImageBackground
            source={require('../assets/Image/Todolist.png')}  
            style={styles.cardBackground}
            imageStyle={styles.cardBackgroundImage}
          >
          </ImageBackground>
        </View>
      
      <Card style={styles.card}>
        <Card.Content>
          <Title style={styles.title}>{todo.title}</Title>
          <View style={styles.descriptionContainer}>
            <Text style={styles.emoji}>📝</Text>
            <Text style={styles.description}>{todo.description}</Text>
          </View>
        </Card.Content>
      </Card>

      <Portal>
        <Dialog visible={showDeleteDialog} onDismiss={() => setShowDeleteDialog(false)}>
          <Dialog.Title>Delete Todo</Dialog.Title>
          <Dialog.Content>
            <Text>Are you sure you want to delete this todo?</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setShowDeleteDialog(false)}>Cancel</Button>
            <Button onPress={handleDelete}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 16,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
  },
  emoji: {
    fontSize: 16,
    marginRight: 8,
  },
  description: {
    fontSize: 18,
    color: '#666',
    flex: 1,
    lineHeight: 20,
  },
  cardBackground: {
    width: '90%',
    height: 200, 
    marginLeft:40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBackgroundImage: {
    borderRadius: 10, 
  },
});

export default ItemDetailsScreen;