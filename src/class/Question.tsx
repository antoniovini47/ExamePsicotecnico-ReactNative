export class Question {
  id: number;
  image: any;
  textQuestion: string;
  textOptionA: string;
  textOptionB: string;
  textOptionC: string;
  textOptionD: string;
  textOptionE: string;
  correctOption: string;

  constructor(
    id: number,
    image: any,
    text: string,
    textOptionA: string,
    textOptionB: string,
    textOptionC: string,
    textOptionD: string,
    textOptionE: string,
    correctOption: string,
  ) {
    this.id = id;
    this.image = image;
    this.textQuestion = text;
    this.textOptionA = textOptionA;
    this.textOptionB = textOptionB;
    this.textOptionC = textOptionC;
    this.textOptionD = textOptionD;
    this.textOptionE = textOptionE;
    this.correctOption = correctOption;
  }
}
