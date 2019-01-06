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
        labelElement = `<label><input type="${typeOfInput}" name="question" value="${content}">${content}</label>`
    }
    if (typeOfInput === "checkbox"){
        labelElement = `<label><input type="${typeOfInput}" name="question" value="${content}>${content}</label>`
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

function emptyQuestionContainer(){
    const destination = document.getElementById("questionContainer")
    destination.innerHTML = ""
}

function getAnswer(){ //Returns an array of all checked answers
    const answersLocation = document.getElementsByName("question")
    let answers = []

    for (answer of answersLocation){ //Get all checked options
        if (answer.checked){
            answers.push(answer.value)
        }
    }
    return answers
}

//Classes and objects
class Question {
    //Constructor
    constructor(typeOfAnswer, questionString, answerArray, correctAnswer){
        this.typeOfAnswer = typeOfAnswer, //Radio or checkbox
        this.question = questionString, //The question itself
        this.answers = answerArray, //All options for answers
        this.correctAnswer = correctAnswer //As an array
        this.chosenAnswer = []
    }
}

const quizMaster = {
    score : 0,            //Keep track of score. Start off at 0 points
    winLimit : 6,         //Minimal score needed to win
    questionIndex : 0,    //Variable to keep check of progress through array of questions
    questions : [
        question1 = new Question("radio", "What said the chicken before crossing the road?", ["Wololo", "Foo"], ["Wololo"]),
        question2 = new Question("radio", "Is grass green?", [true, false], [true]),
        question3 = new Question("checkbox", "Who is the coolest dude on the face of the planet?", ["Chuck Norris", "Shigeru Miyamoto", "Yours truly"], ["Yours truly", "Chuck Norris"])
    ],

    askQuestion(){  //Swap out the previous question for the new question.
        const currentQuestion = this.questions[this.questionIndex]
        emptyQuestionContainer()
        makeQuestion(currentQuestion.question)
        makeElements(currentQuestion.typeOfAnswer, currentQuestion.answers)
    },
    
    retrieveAnswer(){ //Storing answer from current question
        const answersLocation = document.getElementsByName("question")
        for (answer of answersLocation){ //Get all checked options
            if (answer.checked){
                this.questions[this.questionIndex]
                .chosenAnswer
                .push(answer.value)
            }
        }
        console.log(this.questions[this.questionIndex])
    },
        
    checkCorrectAnswer(){ //Return true if all correct options are given
        const currentQuestion = this.questions[this.questionIndex]
        let correctCounter = 0
        for (answer of currentQuestion.chosenAnswer){
            if (currentQuestion.correctAnswer.includes(answer)){
               console.log(answer)
                correctCounter++ 
            }
        }
        return currentQuestion.correctAnswer.length === correctCounter
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

quizMaster.askQuestion()

