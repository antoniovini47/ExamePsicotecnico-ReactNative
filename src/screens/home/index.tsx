import React, {useEffect, useRef} from 'react';
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  ToastAndroid,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import mobileAds, {
  BannerAd,
  BannerAdSize,
  TestIds,
} from 'react-native-google-mobile-ads';

import {styles} from './styles';
import questionsDB from '../../database/QuestionsDB';
import {Question} from '../../class/Question';

let isAdBannerLoaded = false;

const bannerAdId = __DEV__
  ? TestIds.ADAPTIVE_BANNER
  : 'ca-app-pub-9218769381944425/9573093376';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    console.log(`Ads Initializeds - Banner Ad id: ${bannerAdId} `);
  });

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
var correctSound = new Sound('correct.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

var incorrectSound = new Sound('incorrect.mp3', Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log('failed to load the sound', error);
    return;
  }
});

const imageDefaultPath: string =
  '../../../android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png';

const minimunQuantityQuestions = 3; //CBD - Channge Before Deploy

const showToastSelectAOption = () => {
  ToastAndroid.showWithGravity(
    'Por favor, selecione uma opção',
    ToastAndroid.LONG,
    ToastAndroid.CENTER,
  );
};

let emptyQuestion: Question = {
  id: 0,
  textQuestion: 'Null Question',
  textOptionA: 'Alt A',
  textOptionB: 'Alt B',
  textOptionC: 'Alt C',
  textOptionD: 'Alt D',
  textOptionE: 'Alt E',
  correctOption: 'a',
  image: require(imageDefaultPath),
};
let currentQuestion = 0,
  sortedQuestions: Question[] = [emptyQuestion],
  scoreCount = 0;

function sortingQuestions(quantity: number): Question[] {
  const allQuestions = [...questionsDB];
  const questionsSelected: Question[] = [];

  for (let i = 1; i <= quantity; i++) {
    let sortedNumber = Math.floor(Math.random() * allQuestions.length);
    questionsSelected.push({
      ...allQuestions[sortedNumber],
    });
    allQuestions.splice(sortedNumber, 1);
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
  }, [currentQuestion]);

  function mountNextQuestion() {
    currentQuestion++;
    setTextTitle(`Questão ${currentQuestion}/${quantityQuestionsSelected}`);
    setOptionSelected('');
    //setOptionSelected('b'); //Debug only CBD - Remove
    setImagePath(sortedQuestions[currentQuestion].image);
    setTextQuestion(sortedQuestions[currentQuestion].textQuestion);
    setTextOptionA(sortedQuestions[currentQuestion].textOptionA);
    setTextOptionB(sortedQuestions[currentQuestion].textOptionB);
    setTextOptionC(sortedQuestions[currentQuestion].textOptionC);
    setTextOptionD(sortedQuestions[currentQuestion].textOptionD);
    setTextOptionE(sortedQuestions[currentQuestion].textOptionE);
  }

  const handleMainButtonClicked = () => {
    if (appState === 'result') {
      setAppState('start');
      setTextButton('Iniciar');
      setTextTitle('Exame Psicotécnico');
      setTextQuestion(
        'Selecione a quantidade de questões e clique em iniciar para começar o exame.',
      );
      sortedQuestions = [emptyQuestion];
      currentQuestion = 0;
      scoreCount = 0;
      return;
    }

    if (appState === 'paused') {
      setAppState('question');
      setTextButton('Responder');

      if (currentQuestion == quantityQuestionsSelected) {
        setImagePath(require(imageDefaultPath));
        setAppState('result');
        setTextButton('Repetir');
        setTextTitle('Resultado');
        setTextQuestion(
          `Sua pontuação foi: ${scoreCount}/${quantityQuestionsSelected}`,
        );
        return;
      }

      mountNextQuestion();
      return;
    }

    if (appState === 'question') {
      if (optionSelected == undefined || optionSelected == '') {
        showToastSelectAOption();
        return;
      }

      if (optionSelected == sortedQuestions[currentQuestion].correctOption) {
        correctSound.play();
        scoreCount++;
      } else {
        incorrectSound.play();
      }

      setTextButton('Continuar');
      setAppState('paused');
      return;
    }

    if (appState === 'start') {
      async function loadQuestions() {
        sortedQuestions = sortedQuestions.concat(
          sortingQuestions(quantityQuestionsSelected),
        );
        mountNextQuestion();
      }

      loadQuestions();
      setAppState('question');
      setTextButton('Responder');
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
            {(appState === 'question' || appState == 'paused') && (
              <RadioButton.Group
                onValueChange={newOptionSelected =>
                  setOptionSelected(newOptionSelected)
                }
                value={optionSelected}>
                <TouchableWithoutFeedback
                  onPress={() => setOptionSelected('a')}>
                  <View
                    style={[
                      styles.radioButton,
                      {
                        backgroundColor:
                          appState === 'paused'
                            ? sortedQuestions[currentQuestion].correctOption ===
                              'a'
                              ? 'green'
                              : 'red'
                            : 'black',
                      },
                    ]}>
                    <RadioButton value="a" disabled={appState === 'paused'} />
                    <Text style={styles.textOption}>{textOptionA}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setOptionSelected('b')}>
                  <View
                    style={[
                      styles.radioButton,
                      {
                        backgroundColor:
                          appState === 'paused'
                            ? sortedQuestions[currentQuestion].correctOption ===
                              'b'
                              ? 'green'
                              : 'red'
                            : 'black',
                      },
                    ]}>
                    <RadioButton value="b" disabled={appState === 'paused'} />
                    <Text style={styles.textOption}>{textOptionB}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setOptionSelected('c')}>
                  <View
                    style={[
                      styles.radioButton,
                      {
                        backgroundColor:
                          appState === 'paused'
                            ? sortedQuestions[currentQuestion].correctOption ===
                              'c'
                              ? 'green'
                              : 'red'
                            : 'black',
                      },
                    ]}>
                    <RadioButton value="c" disabled={appState === 'paused'} />
                    <Text style={styles.textOption}>{textOptionC}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setOptionSelected('d')}>
                  <View
                    style={[
                      styles.radioButton,
                      {
                        backgroundColor:
                          appState === 'paused'
                            ? sortedQuestions[currentQuestion].correctOption ===
                              'd'
                              ? 'green'
                              : 'red'
                            : 'black',
                      },
                    ]}>
                    <RadioButton value="d" disabled={appState === 'paused'} />
                    <Text style={styles.textOption}>{textOptionD}</Text>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback
                  onPress={() => setOptionSelected('e')}>
                  <View
                    style={[
                      styles.radioButton,
                      {
                        backgroundColor:
                          appState === 'paused'
                            ? sortedQuestions[currentQuestion].correctOption ===
                              'e'
                              ? 'green'
                              : 'red'
                            : 'black',
                      },
                    ]}>
                    <RadioButton value="e" disabled={appState === 'paused'} />
                    <Text style={styles.textOption}>{textOptionE}</Text>
                  </View>
                </TouchableWithoutFeedback>
              </RadioButton.Group>
            )}
          </View>
        </ScrollView>
      </View>
      <View style={styles.adBanner}>
        {/* CBD - Alterar ID Banner*/}
        {!isAdBannerLoaded && (
          <Text style={styles.textAdBanner}>
            Carregando anúncios. Para remover anúncios clique no botão de
            configurações.
          </Text>
        )}
        <View style={{display: isAdBannerLoaded ? 'flex' : 'none'}}>
          <BannerAd
            unitId={bannerAdId}
            size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
            onAdLoaded={() => {
              console.log(
                `isAdBannerLoaded ficou true, pelo loaded, result: ${isAdBannerLoaded}`,
              );
              isAdBannerLoaded = true;
            }}
            onAdFailedToLoad={() => {
              console.log(
                `isAdBannerLoaded ficou false, pelo failed, result: ${isAdBannerLoaded}`,
              );
              isAdBannerLoaded = false;
            }}
            onAdClosed={() => {
              console.log(
                `isAdBannerLoaded ficou false, pelo closed, result: ${isAdBannerLoaded}`,
              );
              isAdBannerLoaded = false;
            }}
          />
        </View>
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
