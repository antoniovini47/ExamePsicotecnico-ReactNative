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
let questaoAtual = 0;

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
  const [textQuestion, setTextQuestion] = React.useState(
    'Clique em Iniciar para começar',
  );
  const [textOptionA, setTextOptionA] = React.useState('Alternativa A');
  const [textOptionB, setTextOptionB] = React.useState('Alternativa B');
  const [textOptionC, setTextOptionC] = React.useState('Alternativa C');
  const [textOptionD, setTextOptionD] = React.useState('Alternativa D');
  const [textOptionE, setTextOptionE] = React.useState('Alternativa E');
  const [optionSelected, setOptionSelected] = React.useState('a');

  const handleMainButtonClicked = () => {
    const sortedQuestions = sortingQuestions(1);

    setImagePath(sortedQuestions[0].image);
    setTextQuestion(sortedQuestions[0].textTitle);
    setTextOptionA(sortedQuestions[0].textOptionA);
    setTextOptionB(sortedQuestions[0].textOptionB);
    setTextOptionC(sortedQuestions[0].textOptionC);
    setTextOptionD(sortedQuestions[0].textOptionD);
    setTextOptionE(sortedQuestions[0].textOptionE);
  };

  const handleConfigsButtonClicked = () => {
    console.log('Button configs clicked ' + renderCount);
  };

  console.log(`Rendered: ${++renderCount}`);
  return (
    <View style={styles.container}>
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
                <Text style={styles.textOption}>{textOptionA}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setOptionSelected('b')}>
              <View style={styles.radioButton}>
                <RadioButton value="b" />
                <Text style={styles.textOption}>{textOptionB}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setOptionSelected('c')}>
              <View style={styles.radioButton}>
                <RadioButton value="c" />
                <Text style={styles.textOption}>{textOptionC}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setOptionSelected('d')}>
              <View style={styles.radioButton}>
                <RadioButton value="d" />
                <Text style={styles.textOption}>{textOptionD}</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => setOptionSelected('e')}>
              <View style={styles.radioButton}>
                <RadioButton value="e" />
                <Text style={styles.textOption}>{textOptionE}</Text>
              </View>
            </TouchableWithoutFeedback>
          </RadioButton.Group>
        </ScrollView>
      </View>
      <View style={styles.adBanner}>
        <Text style={styles.textAdBanner}>
          Carregando anúncios. Para remover anúncios clique no botão de
          configurações.
        </Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          onPress={handleConfigsButtonClicked}
          style={styles.mainButton}>
          <Image
            style={styles.imageButtonConfig}
            source={require('../../icons/gear.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleMainButtonClicked}
          style={styles.mainButton}>
          <Text style={styles.textTitle}>{textButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
