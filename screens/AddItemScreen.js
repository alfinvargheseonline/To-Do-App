import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import useStore from '../store';

export default function AddItemScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});
  
  const addTodo = useStore(state => state.addTodo);

  const validate = () => {
    const newErrors = {};
    if (!title.trim()) newErrors.title = 'Title is required';
    if (!description.trim()) newErrors.description = 'Description is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validate()) {
      addTodo({
        title: title.trim(),
        description: description.trim(),
      });
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Title"
        value={title}
        onChangeText={setTitle}
        mode="outlined"
        style={styles.input}
        error={!!errors.title}
      />
      <HelperText type="error" visible={!!errors.title}>
        {errors.title}
      </HelperText>

      <TextInput
        label="Description"
        value={description}
        onChangeText={setDescription}
        mode="outlined"
        multiline
        numberOfLines={4}
        style={styles.input}
        error={!!errors.description}
      />
      <HelperText type="error" visible={!!errors.description}>
        {errors.description}
      </HelperText>

      <Button 
        mode="contained" 
        onPress={handleSave}
        style={styles.button}
      >
        Save Todo
      </Button>

      <ImageBackground
            source={require('../assets/Image/addTodo.png')}  
            style={styles.cardBackground}
            imageStyle={styles.cardBackgroundImage}
          >
          </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
  },
  cardBackground: {
    width: '90%',
    height: 200, 
    marginTop:20,
    marginLeft:40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBackgroundImage: {
    borderRadius: 10, 
  },
});