//Script for online quiz. Make it object oriented for practice

/*TODO:
    - Class for questions and the answers belonging to the question;
    - Quizmaster object:
        - To keep track of score;
        - Check if you won.
*/

//Some functions for creating the forms
function makeQuestion(question){
    const destination = document.getElementById("questionContainer")
    let newDiv = document.createElement("div")
    newDiv.innerHTML = `<h1>${question}</h1>`

    destination.appendChild(newDiv)
}
function makeInputOption(typeOfInput, content){
    let newDiv = document.createElement("div") //Basis DIV with Bootstrap-class
    newDiv.setAttribute("class", typeOfInput)
    let labelElement
    
    //HTML strings for each different type of label
    if (typeOfInput === "radio"){
        labelElement = `<label><input type="${typeOfInput}" name="answer">${content}</label>`
    }
    if (typeOfInput === "checkbox"){
        labelElement = `<label><input type="${typeOfInput}" value="">${content}</label>`
    }
    newDiv.innerHTML = labelElement
    return newDiv
}

function makeElements(type, contentArray){
    const destination = document.getElementById("questionContainer")
    let newDiv = document.createElement("div")
    newDiv.setAttribute("class", "col-xs-10 questionCard")
    
    for (option of contentArray){
        newDiv.appendChild(makeInputOption(type, option))
    }
    destination.appendChild(newDiv)
}

function makeRadioElements(contentArray){
    makeElements("radio", contentArray)
}
function makeCheckboxElements(contentArray){
    makeElements("checkbox", contentArray)
}

function emptyQuestionContainer(){
    const destination = document.getElementById("questionContainer")
    destination.innerHTML = ""
}

//Classes and objects
class Question {
    //Constructor
    constructor(typeOfAnswer, questionString, answerArray, correctAnswer){
        this.typeOfAnswer = typeOfAnswer, //Radio or checkbox
        this.question = questionString, //The question itself
        this.answers = answerArray, //All options for answers
        this.correctAnswer = correctAnswer
    }
}

const quizMaster = {
    score : 0,            //Keep track of score. Start off at 0 points
    winLimit : 6,         //Minimal score needed to win
    questionIndex : 0,    //Variable to keep check of progress through array of questions
    questions : [
        question1 = new Question("radio", "What said the chicken before crossing the road?", ["Wololo", "Foo"], "Wololo"),
        question2 = new Question("radio", "Is grass green?", [true, false], true),
        question3 = new Question("checkbox", "Who is the coolest dude on the face of the planet?", ["Chuck Norris", "Shigeru Miyamoto", "Yours truly"], "Yours truly")
    ],

    askNextQuestion(){  //Swap out the previous question for the new question. TODO: still needs a button
        const currentQuestion = this.questions[this.questionIndex]
        emptyQuestionContainer()
        makeQuestion(currentQuestion.question)
        makeElements(currentQuestion.typeOfAnswer, currentQuestion.answers)
        this.questionIndex++ //Add 1 to questionindex
    },
    
    retrieveAnswer(){
        //Code for getting answer from document object
    },
        
    checkCorrectAnswer(question, givenAnswer){
        return question.correctAnswer === givenAnswer
    },

    addPointToScore(questionResult){
        if (questionResult){
            this.score++
        }
    },

    checkWin(){
        return this.score >= this.winLimit
    }
}
//End of classes and objects

//Testing stuff
// console.log(quizMaster.score)
// console.log(quizMaster.addPointToScore(true))
// console.log(quizMaster.score)
const test = document.getElementById("questionCard")
const testArray = ["Option A", "Option B", "Option C"]

console.log(question1.question)
console.log(question1.answers)
console.log(question1.correctAnswer)

console.log(question2.question)
console.log(question2.answers)
console.log(question2.correctAnswer)