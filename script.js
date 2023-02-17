const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector(".timer .timer_sec");
const timeLine = quiz_box.querySelector("header .time_line");
const timeOff = quiz_box.querySelector("header .time_text");

start_btn.onclick = () => {
    info_box.classList.add("activeInfo");
}
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
}
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo");
    quiz_box.classList.add("activeQuiz");
    showQuestions(0);   
    quesCounter(1);
    startTimer(15);
    startTimerLine(0);
}
let ques_count = 0;
let ques_num = 1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue = 0;
let userScore = 0;

const next_btn = quiz_box.querySelector('.next_btn');
const result_box = document.querySelector('.result_box');
const restart_quiz = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');

restart_quiz.onclick = () => {
    window.location.reload();
}

quit_quiz.onclick = () => {
    quit_quiz.style.opacity = 0;
}

next_btn.onclick = () => {
    if (ques_count < questions.length-1){
        ques_count++;
        ques_num++;
        showQuestions(ques_count);
        quesCounter(ques_num);
        clearInterval(counter);
        startTimer(timeValue);
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display = "none";
        timeOff.textContent = "Time Left";
    }
    else{
        clearInterval(counter);
        clearInterval(counterLine);
        console.log("Questions completed!");
        showResultBox();
    }
}

function showQuestions(index){
    const que_text = document.querySelector(".que_text");
    
    let que_tag = '<span>' +questions[index].num + ". " + questions[index].question + '</span>';
    let option_tag = '<div class="option">' + questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">' + questions[index].options[3] + '<span></span></div>';
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;
    const option = option_list.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");  
    }
}

function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    let correctAns = questions[ques_count].answer;
    let allOptions = option_list.children.length;
    if (userAns == correctAns){
        userScore++;
        console.log(userScore);
        answer.classList.add("correct");
        console.log("Answer is correct!");
    }
    else{
        answer.classList.add("incorrect");
        console.log("Answer is incorrect!");

        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
            }  
        }
    }
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    next_btn.style.display = "block";
}

function showResultBox(){
    info_box.classList.remove("activeInfo");
    quiz_box.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector('.score');
    if(userScore > 7){
        let scoreTag = '<span>Congratulations! you scored <p>' + userScore +'</p>Out Of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else if(userScore > 4){
        let scoreTag = '<span>Nice! you scored <p>' + userScore +'</p>Out Of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else{
        let scoreTag = '<span>Sorry! you scored only <p>' + userScore +'</p>Out Of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
}


function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time<9){
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0){
            clearInterval(counter);
        timeCount.textContent = "00";
        timeOff.textContent = "Time Up";
        let correctAns = questions[ques_count].answer;
        let allOptions = option_list.children.length;
        for (let i = 0; i < allOptions; i++) {
            if(option_list.children[i].textContent == correctAns){
                option_list.children[i].setAttribute("class", "option correct");
            }  
        }
        for (let i = 0; i < allOptions; i++) {
            option_list.children[i].classList.add("disabled");
        }
        next_btn.style.display = "block";       
        }
    }
}
function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time++;
        timeLine.style.width = time + "px";
        if (time > 549){
            clearInterval(counterLine);
        }
    }
}


function quesCounter(index){
    const bottom_ques_number = quiz_box.querySelector('.total_ques');
    let totalQuesCountTag = '<span><p>' + index +'</p>Of<p>' + questions.length + '</p>Questions</span>';
    bottom_ques_number.innerHTML = totalQuesCountTag;
}