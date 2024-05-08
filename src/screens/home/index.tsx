import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {styles} from './styles';

import questionsDB from '../../database/QuestionsDB';

let renderCount = 0;
let isDarkMode: boolean = false;

function sortingQuestions(quantity: number) {
  const allQuestions = questionsDB;
  const questionsSelected = [];

  for (let i = 1; i <= quantity; i++) {
    questionsSelected.push({
      ...allQuestions[Math.floor(Math.random() * allQuestions.length)],
    });
  }

  return questionsSelected;
}

export function Home() {
  const [textButton, setTextButton] = React.useState('Iniciar');
  const [textTitle, setTextTitle] = React.useState('Exame Psicotécnico');
  const [image, setImagePath] = React.useState(
    require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png'),
  );
  const [textQuestion, setTextQuestion] = React.useState('Texto da Questão');
  const [optionSelected, setOptionSelected] = React.useState('a');

  const handleButtonClicked = () => {
    const sortedQuestions = sortingQuestions(1);

    setImagePath(sortedQuestions[0].image);
    setTextQuestion(sortedQuestions[0].textTitle);
  };

  console.log(`Rendered: ${++renderCount}`);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textTitle}>{textTitle}</Text>
      </View>
      <View style={styles.image}>
        <Image source={image} />
      </View>
      <View style={styles.content}>
        <ScrollView>
          <Text style={styles.textContent}>{textQuestion}</Text>
          <RadioButton.Group
            onValueChange={newOptionSelected =>
              setOptionSelected(newOptionSelected)
            }
            value={optionSelected}>
            <TouchableWithoutFeedback onPress={() => setOptionSelected('a')}>
              <View style={styles.radioButton}>
                <RadioButton value="a" />
                <Text style={styles.textOption}>Opção A</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setOptionSelected('b')}>
              <View style={styles.radioButton}>
                <RadioButton value="b" />
                <Text style={styles.textOption}>Opção B</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setOptionSelected('c')}>
              <View style={styles.radioButton}>
                <RadioButton value="c" />
                <Text style={styles.textOption}>Opção C</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setOptionSelected('d')}>
              <View style={styles.radioButton}>
                <RadioButton value="d" />
                <Text style={styles.textOption}>Opção D</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setOptionSelected('e')}>
              <View style={styles.radioButton}>
                <RadioButton value="e" />
                <Text style={styles.textOption}>Opção E</Text>
              </View>
            </TouchableWithoutFeedback>
          </RadioButton.Group>
        </ScrollView>
      </View>
      <View style={styles.adBanner}>
        <Text style={{color: 'black'}}>Ad Banner</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={handleButtonClicked} style={styles.button}>
          <Text style={styles.textTitle}>{textButton}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
