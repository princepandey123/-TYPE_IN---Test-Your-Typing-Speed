const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");

const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const theResult = document.querySelector(".result");
const theIncorrect = document.querySelector(".incorrect");
const sampleText = document.querySelector("#origin-text p");
var timer = [0, 0, 0, 0]; //for minutes,seconds,hundredth of second,hundredth of second
var interval;
var timerRunning = false;
var errno = 0;
var sentences = [
  "The adventure of living in the path of life. We are born, live our lives, and eventually pass away with time. We are attempting to shape our lives in this way.  Some people have a lot of problems in life, while others do not. Those who have never faced adversity in their lives have one perspective on life. Those that struggle in life have a different perspective. Life is frequently described as priceless. The various ways in which people seek to save lives reveal this even more clearly. Every day, doctors and scientists try to discover innovative treatments that will help people live longer lives. Life is full of both joys and disasters. The ups and downs of life are what they're called. Without them, life is just a never-ending war that can be won at any time. ",
];
var index = 0;
sampleText.innerHTML = sentences[index];
var originText = document.querySelector("#origin-text p").innerHTML;
// Add leading zero to numbers 9 or below (purely for aesthetics):
function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

// Run a standard minute/second/hundredths timer:
function runTimer() {
  let currentTime =
    leadingZero(timer[0]) +
    ":" +
    leadingZero(timer[1]) +
    ":" +
    leadingZero(timer[2]);
  theTimer.innerHTML = currentTime;
  timer[3]++;

  timer[0] = Math.floor(timer[3] / 100 / 60); //convert hundredth of a second int0 minutes
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

// Match the text entered with the provided text on the page:
function spellCheck() {
  let textEntered = testArea.value;
  let originTextMatch = originText.substring(0, textEntered.length); //we want those number of characters of the origin text as we have entered in the text area to match both of these
  if (textEntered == originText) {
    //typing is complete
    clearInterval(interval); //to stop the timer
    testWrapper.style.borderColor = "#33ff33";
    let speed = Math.floor(4 / (timer[1] / 60));
    theResult.innerHTML = "Speed in words per minute is " + speed;
    theIncorrect.innerHTML =
      "Number of letters you typed incorrectly is " + errno;
  } else {
    if (textEntered == originTextMatch) {
      //if user is typing correctly
      testWrapper.style.borderColor = "#65ccf3";
    } else {
      //some error occurs while typing
      errno = errno + 1;
      testWrapper.style.borderColor = "#e95d0f";
    }
  }
}

// Start the timer:
function start() {
  let textEnteredLength = testArea.value.length;
  if (textEnteredLength === 0 && !timerRunning) {
    //!timerRunning is checked so that timer does not run whenever text area becomes empty
    timerRunning = true;
    interval = setInterval(runTimer, 10);
  }
  console.log(textEnteredLength);
}

// Reset everything:
function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timerRunning = false;

  testArea.value = "";
  theTimer.innerHTML = "00:00:00";
  testWrapper.style.borderColor = "grey";
  index++;
  if (index == sentences.length) index = 0;
  sampleText.innerHTML = sentences[index];
  theResult.innerHTML = "";
  theIncorrect.innerHTML = "";
  originText = document.querySelector("#origin-text p").innerHTML;
  errno = 0;
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false); //when you go up the key
resetButton.addEventListener("click", reset, false);
