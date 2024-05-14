import React, {useEffect} from 'react';
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
import Slider from '@react-native-community/slider';
import {styles} from './styles';
import questionsDB from '../../database/QuestionsDB';
import {Question} from '../../class/Question';

const imageDefaultPath: string =
  '../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png';

const minimunQuantityQuestions = 3;

let currentQuestion = 0,
  sortedQuestions: Question[] = [],
  score = 0;

function sortingQuestions(quantity: number) {
  const allQuestions = questionsDB;
  const questionsSelected = [];
  /*let sortedNumber = 0;
  const idQuestionsSelected: number[] = [];

  /*function sortAndCheckDuplicatedID(idArray: number[]): number {
    let sortedNumber = Math.floor(Math.random() * allQuestions.length);
    if (idArray.includes(sortedNumber)) {
      console.log('ID duplicado, sorteando novamente');
      return sortAndCheckDuplicatedID(idArray);
    }
    console.log(`ID sorteado e adicionado ao array: ${sortedNumber}`);
    idArray.push(sortedNumber);
    return sortedNumber;
  }*/

  for (let i = 1; i <= quantity; i++) {
    questionsSelected.push({
      ...allQuestions[Math.floor(Math.random() * allQuestions.length)],
    });
  }

  return questionsSelected;
}

export function Home() {
  const [appState, setAppState] = React.useState('start');
  const [quantityQuestionsSelected, setQuantityQuestionsSelected] =
    React.useState(minimunQuantityQuestions);
  const [textButton, setTextButton] = React.useState('Iniciar');
  const [textTitle, setTextTitle] = React.useState('Exame Psicotécnico');
  const [image, setImagePath] = React.useState(
    require('../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png'),
  );
  const [textQuestion, setTextQuestion] = React.useState(
    'Selecione a quantidade de questões e clique em iniciar para começar o exame.',
  );
  const [textOptionA, setTextOptionA] = React.useState('Alternativa A');
  const [textOptionB, setTextOptionB] = React.useState('Alternativa B');
  const [textOptionC, setTextOptionC] = React.useState('Alternativa C');
  const [textOptionD, setTextOptionD] = React.useState('Alternativa D');
  const [textOptionE, setTextOptionE] = React.useState('Alternativa E');
  const [optionSelected, setOptionSelected] = React.useState('');

  useEffect(() => {
    console.log('-----------Log Tela atual-----------');
    console.log(`Estado atual: ${appState.toString()}`);
    console.log(`Questão atual: ${currentQuestion}`);
  }, [appState, currentQuestion]);

  function mountNextQuestion() {
    currentQuestion++;
    setTextTitle(`Questão ${currentQuestion}/${quantityQuestionsSelected}`);
    setOptionSelected('b');
    setImagePath(sortedQuestions[currentQuestion].image);
    setTextQuestion(sortedQuestions[currentQuestion].textQuestion);
    setTextOptionA(sortedQuestions[currentQuestion].textOptionA);
    setTextOptionB(sortedQuestions[currentQuestion].textOptionB);
    setTextOptionC(sortedQuestions[currentQuestion].textOptionC);
    setTextOptionD(sortedQuestions[currentQuestion].textOptionD);
    setTextOptionE(sortedQuestions[currentQuestion].textOptionE);
  }

  const handleMainButtonClicked = () => {
    if (appState === 'start') {
      async function loadQuestions() {
        sortedQuestions = sortingQuestions(quantityQuestionsSelected + 1);
        mountNextQuestion();
      }
      loadQuestions();
      setAppState('question');
      setTextButton('Próxima');
      return;
    }

    if (appState === 'question') {
      console.log(`Opção selecionada: ${optionSelected}`);
      if (optionSelected === undefined || optionSelected === '') {
        console.log('Selecione uma opção');
        return;
      }
      if (optionSelected === sortedQuestions[currentQuestion].correctOption) {
        score++;
        console.log(`Resposta correta, pontuação: ${score}`);
      } else {
        console.log(`Resposta incorreta, pontuação: ${score}`);
      }
      if (currentQuestion === quantityQuestionsSelected) {
        setImagePath(require(imageDefaultPath));
        setAppState('result');
        setTextButton('Repetir');
        setTextTitle('Resultado');
        setTextQuestion(
          `Sua pontuação foi: ${score}/${quantityQuestionsSelected}`,
        );
        return;
      } else {
        mountNextQuestion();
      }
      return;
    }

    if (appState === 'result') {
      setAppState('start');
      setTextButton('Iniciar');
      setTextTitle('Exame Psicotécnico');
      setTextQuestion(
        'Selecione a quantidade de questões e clique em iniciar para começar o exame.',
      );
      currentQuestion = 0;
      score = 0;
      return;
    }
  };

  const handleConfigsButtonClicked = () => {
    console.log('Button configs clicked');
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.textTitle}>{textTitle}</Text>
      </View>
      <View style={styles.image}>
        <Image source={image} />
      </View>
      <View style={styles.content}>
        <ScrollView>
          <Text style={styles.textContent}>{textQuestion}</Text>
          {appState === 'start' && (
            <View>
              <Slider
                style={styles.slider}
                minimumValue={minimunQuantityQuestions}
                maximumValue={questionsDB.length}
                step={1}
                onValueChange={value => setQuantityQuestionsSelected(value)}
              />

              <Text style={styles.textContent}>
                Quantidade de questões: {quantityQuestionsSelected}
              </Text>
            </View>
          )}
          <View>
            {appState === 'question' && (
              <RadioButton.Group
                onValueChange={newOptionSelected =>
                  setOptionSelected(newOptionSelected)
                }
                value={optionSelected}>
                <TouchableWithoutFeedback
                  onPress={() => setOptionSelected('a')}>
                  <View style={styles.radioButton}>
                    <RadioButton value="a" />
                    <Text style={styles.textOption}>{textOptionA}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setOptionSelected('b')}>
                  <View style={styles.radioButton}>
                    <RadioButton value="b" />
                    <Text style={styles.textOption}>{textOptionB}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setOptionSelected('c')}>
                  <View style={styles.radioButton}>
                    <RadioButton value="c" />
                    <Text style={styles.textOption}>{textOptionC}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setOptionSelected('d')}>
                  <View style={styles.radioButton}>
                    <RadioButton value="d" />
                    <Text style={styles.textOption}>{textOptionD}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setOptionSelected('e')}>
                  <View style={styles.radioButton}>
                    <RadioButton value="e" />
                    <Text style={styles.textOption}>{textOptionE}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </RadioButton.Group>
            )}
          </View>
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
          <Text style={styles.textButton}>{textButton}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
