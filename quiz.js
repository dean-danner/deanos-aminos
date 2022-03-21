var myQuestion = document.getElementById("question");
var myAnswer = document.getElementById("answer");
var myStatus = document.getElementById("status");
var myEnd = document.getElementById("end");
var mode = sessionStorage.getItem("mode");

const aminos = [["alanine", "A"], ["glycine", "G"], ["isoleucine", "I"],
["leucine", "L"], ["proline", "P"], ["valine", "V"],
["phenylalanine", "F"], ["tryptophan", "W"], ["tyrosine", "Y"],
["aspartic_acid", "D"], ["glutamic_acid", "E"], ["arginine", "R"],
["histidine", "H"], ["lysine", "K"], ["serine", "S"],
["threonine", "T"], ["cysteine", "C"], ["methionine", "M"],
["asparagine", "N"], ["glutamine", "Q"]];
const qtime = 60;
var qnum = 0, timer = 0, points = 0, interval = 0;
var questions = [], times = [], choices = [];
var answer = "";

function generateQuestions() {
    let question = 0;

    while (questions.length < aminos.length) {
        question = Math.round(Math.random() * (aminos.length-1));
        if (questions.includes(aminos[question])) {
            continue;
        } else {
            questions.push(aminos[question]);
        }
    }
}

function askQuestion() {
    answer = questions[qnum];

    if ((qnum + 1) < 10) {
        myQuestion.innerHTML = "0";
    } else {
        myQuestion.innerHTML = "";
    }
    if (mode == "0") {
        displayStrQuestion();
        displayStrAnswers();
    } else if (mode == "1") {
        displayNameQuestion();
        displayNameAnswers();
    } else if (mode == "2") {
        displayCodeQuestion();
        displayNameAnswers();
    }
    displayTimer();

    let processPoints = points.toString();
    if (points < 100) {
        processPoints = "0" + processPoints;
        if (points < 10) {
            processPoints = "0" + processPoints;
        }
    }
    document.getElementById("points").innerHTML = processPoints;
}

function displayTimer() {
    timer = qtime;
    document.getElementById("time").innerHTML =
    "<progress class='nes-progress' value='" + timer +
    "' max='" + qtime + "'></progress>";
    
    interval = setInterval(function() {
        timer--;
        document.getElementById("time").innerHTML =
        "<progress class='nes-progress' value='" + timer +
        "' max='" + qtime + "'></progress>";

        if (timer < 1) {
            checkAnswer("");
        }
    }, 1000);
}

function generateAnswers() {
    let choice = 0;
    choices = [];

    while (choices.length < 4) {
        choice = Math.round(Math.random() * (aminos.length-1));
        if (aminos[choice] == answer || choices.includes(aminos[choice])) {
            continue;
        } else {
            choices.push(aminos[choice]);
        }
    }

    let rand = Math.round(Math.random() * (choices.length-1));
    choices[rand] = answer;
}

function displayNameQuestion() {
    myQuestion.innerHTML += (qnum + 1) + ". What structure is this?";
    document.getElementById("namestr").innerHTML = "<img src='assets\\" +
    answer[0] + ".png' width='110px' />";
}

function displayNameAnswers() {
    generateAnswers();

    myAnswer.innerHTML = "";
    for (let i = 0; i < choices.length; i++) {
        myAnswer.innerHTML += "<span id=a" + i + " onclick=checkAnswer('" +
        choices[i] + "') class='hblack nes-pointer'>" +
        (choices[i][0].charAt(0).toUpperCase() +
        choices[i][0].slice(1)).replace("_", " ") + "</span>";
    }
}

function displayStrQuestion() {
    myQuestion.innerHTML += (qnum + 1) + ". What is the structure of <u>" +
    answer[0].replace("_", " ") + "</u>?";
}

function displayStrAnswers() {
    generateAnswers();

    myAnswer.innerHTML = "";
    for (let i = 0; i < choices.length; i++) {
        myAnswer.innerHTML += "<img  id=a" + i + " src='assets\\" + choices[i][0] +
        ".png' class='hblack nes-pointer' onclick=checkAnswer('" +
        choices[i] + "') />";
    }
}

function displayCodeQuestion() {
    myQuestion.innerHTML += (qnum + 1) + ". What structure corresponds to this code?";
    document.getElementById("namestr").innerHTML = "<center><div id='code'>" + answer[1] + "</center><div>";
}

function displaySolution() {
    for (let i = 0; i < choices.length; i++) {
        option = document.getElementById("a" + i)
        if (choices[i] == answer) {
            option.className = "hgreen";
        } else {
            option.className = "hred";
        }
        option.onclick = "";
    }
}

function checkAnswer(choice) {
    times.push(timer);
    clearInterval(interval);
    displaySolution();

    if (choice == answer) {
        addPoints();
    }

    setTimeout(function() {
        if (qnum < questions.length - 1) {
            qnum++;
            askQuestion();
        } else {
            endQuiz();
        }
    }, 1000);
}

function addPoints() {
    if (timer > (qtime - 12)) {
        points += 5;
    } else if (timer > (qtime - 24)) {
        points += 4;
    } else if (timer > (qtime - 36)) {
        points += 3;
    } else if (timer > (qtime - 48)) {
        points += 2;
    } else {
        points++;
    }
}

function endQuiz() {
    myAnswer.className = "off";
    myStatus.className = "off";
    document.getElementById("namestr").className = "off";
    document.getElementById("question").className = "off";

    myEnd.className = "nes-container with-title";
    if (points < 80) {
        document.getElementById("msg").innerHTML = "Nice try!";
    }
    document.getElementById("endtime").innerHTML =
    "You finished the quiz in <span style='color: green'>" +
    calcTime()[0] + "</span> minutes and <span style='color: green'>" +
    calcTime()[1] + "</span> seconds!";
    document.getElementById("endpoints").innerHTML =
    "You got " + points + "/100 points.";
    document.getElementById("endgrade").innerHTML =
    "Your grade: <span style='color: red;'><b>" + calcGrade() + "</b></span>"
}

function calcTime() {
    let final = times.reduce(function (total, i) {
        return total + i
        }, 0);
    
    final -= (qtime * questions.length);
    final += 25;
    return [Math.abs(parseInt(final / qtime)), Math.abs(final % qtime)];
}

function calcGrade() {
    let grade = "";

    if (points >= 90) {
        grade = "A";
    } else if (points >= 80) {
        grade = "B";
    } else if (points >= 70) {
        grade = "C";
    } else if (points >= 60) {
        grade = "D";
    } else {
        grade = "F";
    }
    
   return grade;
}

generateQuestions();
askQuestion();