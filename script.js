const button = document.getElementById("submit");

const reset_button = document.getElementById("reset");

if (button) {
    //make the button work when clicked
    button.addEventListener("click", calcScore);
}

if (reset_button) {
    // add event to reset button
    reset_button.addEventListener("click", resetQuiz);
}

//object to store answers
const answers = {
    question1: {
        type: "multi-choice",
        correct: "Uniform Resource Locator"
    },
    question2: {
        type: "multi-choice",
        correct: "Tim Berners-Lee"
    },
    question3: {
        type: "multi-choice",
        correct: "Parameters"
    },
    question4: {
        type: "text",
        correct: "purpose"
    },
    question5: {
        type: "text",
        correct: "HTTPS"
    },
    question6: {
        type: "multi-select",
        correct: ["A", "C", "D"]
    },
    question7: {
        type: "sequence",
        correct: ["3", "6", "4", "1", "5", "7", "2"]
    }
};

//toggle for results frame
function toggleResults() {
    let frame = document.getElementById("result");
    frame.style.display = "flex"
}

//grade multi-choice
function multiChoice(score, questionNum, key) {
    //get user input from the input from the multichoice
    const selected = document.querySelector(`input[name="${key}"]:checked`);

    //compare answer to selection for multichoice
    if (selected.value === answers[key].correct) {
        document.getElementById("results").innerHTML += "<p>Question " + questionNum + ": Correct </p>";
        score += 1;
    } else {
        document.getElementById("results").innerHTML += "<p>Question " + questionNum + ": Incorrect - " + answers[key].correct + "</p>";
    }
    //return score
    return score;
};

//grade fill-in-the-blank
function text(score, questionNum, key) {
    //get user input from text box
    const input = document.querySelector(`input[name="${key}"]`);

    //compare value of input to answer
    if (input.value.toLowerCase() == answers[key].correct.toLowerCase()) {
        document.getElementById("results").innerHTML += "<p>Question " + questionNum + ": Correct </p>";
        score += 1;
    } else {
        document.getElementById("results").innerHTML += "<p>Question " + questionNum + ": Incorrect - " + answers[key].correct + "</p>";
    }

    return score;
};

//grade multi-select
function multiSelect(score, questionNum, key) {
    //get the selected answers
    const selected_answers = document.querySelectorAll(`input[name="${key}"]:checked`);
    //convert the nodeList to array and convert the contents to strings
    const selected = Array.from(selected_answers).map(item => item.value);

    //get the correct answers
    const correct_answers = answers[key].correct;

    //compare length and values
    if (selected.length === correct_answers.length && selected.every(val => correct_answers.includes(val))) {
        score++;
        document.getElementById("results").innerHTML += "<p>Question " + questionNum + ": Correct</p>";
    } else {
        document.getElementById("results").innerHTML += "<p>Question " + questionNum + ": Incorrect - " + answers[key].correct + "</p>";
    }

    return score;
};

//grade sequence
function sequence(score, questionNum, key) {
    //get the selected answers
    const selected_answers = document.querySelectorAll(`select[name="${key}"] option:checked`);

    //map the NodeList to an array
    selected_answers.forEach(select => {
        user_answers = Array.from(selected_answers).map(item => item.value);
    });

    console.log(user_answers);
    //compare user answer to correct answer
    //loop through the correct answer
    i = 0;

    //define pts
    pts = 0;

    for (let x of answers[key].correct) {
        if (user_answers[i] == x) {
            pts++;
        }
        //increment i
        i++;
    };

    if (pts == 7) {
        score++;
        document.getElementById("results").innerHTML += "<p>Question " + questionNum + ": Correct</p>";
    } else {
        document.getElementById("results").innerHTML += "<p>Question " + questionNum + ": Incorrect - " + answers[key].correct + "</p>";
    }

    return score;
};

//determine type of question and call the related function
function calcScore() {
    //resets score
    let score = 0;
    let questionNum = 1;

    //loop to go through the questions in answers object
    for (let key in answers) {
        //determine which function to call based on what is in "type" in the answers object
        if (answers[key].type == "multi-choice") {
            //send score, questionNum, and key
            score = multiChoice(score, questionNum, key);
        } else if (answers[key].type == "text") {
            score = text(score, questionNum, key);

        } else if (answers[key].type == "multi-select") {
            score = multiSelect(score, questionNum, key);

        } else if (answers[key].type == "sequence") {
            score = sequence(score, questionNum, key);
        }

        //increment the question counter
        questionNum++;
    };

    //print score and pass/fail
    if (score < 5) {
        const element = document.getElementById("pass_fail");
        element.innerHTML = "Try Again.";
        element.style.backgroundColor = "red";
    } else {
        const element = document.getElementById("pass_fail");
        element.innerHTML = "Congratulations!"
        element.style.backgroundColor = "lightgreen"
    }

    document.getElementById("score").innerHTML = score;

    const sub_button = document.getElementById("submit");
    sub_button.style.display = "none";

    //show results
    toggleResults();
};



function resetQuiz() {
    //reset the page back to the quiz page
    let frame2 = document.getElementById("result");
    frame2.style.display = "none"

    //clear selections
    document.getElementById("quiz").reset();

    //clear the correct/incorrect div
    document.getElementById("results").innerHTML = "";

    //show the submit button again
    const sub_button = document.getElementById("submit");
    sub_button.style.display = "block";
};

