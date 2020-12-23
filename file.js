$(document).ready(function () {
  // for when you click a piano button
  $(".white , .black").on("click", function (event) {
    let note = $(event.currentTarget).attr("note");
    let keyPressed = $(event.currentTarget).attr("keyPressed");
    playAndCompare(keyPressed, note);
  });

  // for when you click the game button
  $(".game").on("click", function (event) {
    playNote(guess);
    guessed = false;
  });
});

// initiate variables
let guess;
let guessCompare;
let guessed = true;
let correct = 0;
let missed = 0;
let octave = 4;

// function that outputs and plays note from prerecorded sounds
function playNote(pitch) {
  let str = "sounds/" + pitch + ".mp3";
  let audio = new Audio(str);
  audio.play();
}

// set the pitch to play based off note name and octave
function choosePitch(pitch) {
  if (pitch == "C1") pitch = "C" + octave;
  else if (pitch == "C2") pitch = "C" + (octave + 1);
  else pitch += octave;
  playNote(pitch);
}

// adds key listeners for the website
document.addEventListener("keypress", (e) => {
  if (e.code === "KeyW") playAndCompare("C1", "C");
  else if (e.code === "Digit3") playAndCompare("Db", "C#/Db");
  else if (e.code === "KeyE") playAndCompare("D", "D");
  else if (e.code === "Digit4") playAndCompare("Eb", "D#/Eb");
  else if (e.code === "KeyR") playAndCompare("E", "E");
  else if (e.code === "KeyT") playAndCompare("F", "F");
  else if (e.code === "Digit6") playAndCompare("Gb", "F#/Gb");
  else if (e.code === "KeyY") playAndCompare("G", "G");
  else if (e.code === "Digit7") playAndCompare("Ab", "G#/Ab");
  else if (e.code === "KeyU") playAndCompare("A", "A");
  else if (e.code === "Digit8") playAndCompare("Bb", "A#/Bb");
  else if (e.code === "KeyI") playAndCompare("B", "B");
  else if (e.code === "KeyO") playAndCompare("C2", "C");
  else if (e.code === "KeyQ") {
    octave--;
    if (octave < 1) octave = 1;
    document.getElementById("octaveDisplay").innerHTML = octave;
  } else if (e.code === "KeyP") {
    octave++;
    if (octave > 6) octave = 6;
    document.getElementById("octaveDisplay").innerHTML = octave;
  }
});

// plays note and compares it with the random note
playAndCompare = (keyPressed, note) => {
  choosePitch(keyPressed);
  compareNotes(note);
};

// chooses the random note for the mini game
function randomNote() {
  // * (max - min + 1)) + min : for random values inclusive between min and max
  let randNote = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
  let randOctave = Math.floor(Math.random() * (7 - 1 + 1)) + 1;
  if (randOctave == 7 && randNote != 1) {
    // edge case for last piano note
    randomNote();
  }
  switch (randNote) {
    case 1:
      guessCompare = "C";
      break;
    case 2:
      guessCompare = "C#/Db";
      break;
    case 3:
      guessCompare = "D";
      break;
    case 4:
      guessCompare = "D#/Eb";
      break;
    case 5:
      guessCompare = "E";
      break;
    case 6:
      guessCompare = "F";
      break;
    case 7:
      guessCompare = "F#/Gb";
      break;
    case 8:
      guessCompare = "G";
      break;
    case 9:
      guessCompare = "G#/Ab";
      break;
    case 10:
      guessCompare = "A";
      break;
    case 11:
      guessCompare = "A#/Bb";
      break;
    default:
      guessCompare = "B";
  }
  if (guessCompare.length > 1) guess = guessCompare.substring(3) + randOctave;
  else guess = guessCompare + randOctave;
}

// compares your note with the random note and updates score board
function compareNotes(note) {
  if (!guessed) {
    if (guessCompare == note) correct++;
    else missed++;
    document.getElementById("correctDisplay").innerHTML = correct;
    document.getElementById("missedDisplay").innerHTML = missed;
    document.getElementById("inputDisplay").innerHTML = note;
    document.getElementById("noteDisplay").innerHTML = guessCompare;
    guessed = true;
    randomNote();
  }
}
