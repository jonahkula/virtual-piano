$(document).ready(function () {
    // for when you click a piano button
    $('.white , .black').on('click', function (event) {
        let pitch = $(event.currentTarget).attr('pitch');
        let tone = $(event.currentTarget).attr('tone');
        playAndCompare(tone, pitch);
    });

    // for when you click the game button
    $('.game').on('click', function (event) {
        playNote(tone[guess]);
        guessed = false;
    });
});

var AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();
var o = null;
var g = null;
let guess;
let guessCompare;
var guessed = true;
let correct = 0;
let missed = 0;
var octave = 4;

// all the notes available for the website
var tone = {
    'C4': 261.63, 'Db4': 277.18, 'D4': 293.66, 'Eb4': 311.13, 'E4': 329.63, 'F4': 349.23, 'Gb4': 369.99,
    'G4': 392.00, 'Ab4': 415.30, 'A4': 440.00, 'Bb4': 466.16, 'B4': 493.88, 'C5': 523.25, 'Db5': 554.37,
    'D5': 587.33, 'Eb5': 622.25, 'E5': 659.26, 'F5': 698.46, 'Gb5': 739.99, 'G5': 783.99, 'Ab5': 830.61,
    'A5': 880.00, 'Bb5': 932.33, 'B5': 987.77, 'C6': 1046.50, 'Db6': 1108.73, 'D6': 1174.66, 'Eb6': 1244.51,
    'E6': 1318.51, 'F6': 1396.91, 'Gb6': 1479.98, 'G6': 1567.98, 'Ab6': 1661.22, 'A6': 1760.00, 'Bb6': 1864.66,
    'B6': 1975.53, 'C7': 2093.00,
}

// function that outputs and plays note from browser
playNote = (frequency, type, duration) => {
    if (type === undefined)
        type = "sine";
    if (duration === undefined)
        duration = 1;
    if (frequency === undefined)
        frequency = 440;
    o = context.createOscillator();
    g = context.createGain();
    o.connect(g);
    o.type = type;
    o.frequency.value = frequency;
    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + duration);
}

// chooses the note to play based off note name and octave
function chooseNote(pitch) {
    if (pitch == "C1")
        pitch = "C" + octave;
    else if (pitch == "C2")
        pitch = "C" + (octave + 1);
    else
        pitch += octave;
    playNote(tone[pitch]);
}

// adds key listeners for the website
document.addEventListener('keypress', (e) => {
    if (e.code === "KeyW")
        playAndCompare("C1", "C");
    else if (e.code === "Digit3")
        playAndCompare("Db", "C#/Db");
    else if (e.code === "KeyE")
        playAndCompare("D", "D");
    else if (e.code === "Digit4")
        playAndCompare("Eb", "D#/Eb");
    else if (e.code === "KeyR")
        playAndCompare("E", "E");
    else if (e.code === "KeyT")
        playAndCompare("F", "F");
    else if (e.code === "Digit6")
        playAndCompare("Gb", "F#/Gb");
    else if (e.code === "KeyY")
        playAndCompare("G", "G");
    else if (e.code === "Digit7")
        playAndCompare("Ab", "G#/Ab");
    else if (e.code === "KeyU")
        playAndCompare("A", "A");
    else if (e.code === "Digit8")
        playAndCompare("Bb", "A#/Bb");
    else if (e.code === "KeyI")
        playAndCompare("B", "B");
    else if (e.code === "KeyO")
        playAndCompare("C2", "C");
    else if (e.code === "KeyQ") {
        octave--;
        if (octave < 4)
            octave = 4;
        document.getElementById("octaveDisplay").innerHTML = octave;
    }
    else if (e.code === "KeyP") {
        octave++;
        if (octave > 6)
            octave = 6;
        document.getElementById("octaveDisplay").innerHTML = octave;
    }
})

// plays note and compares it with the random note
playAndCompare = (note, pitch) => {
    chooseNote(note);
    comparePitches(pitch);
}

// chooses the random note for the mini game
function randomNote() {
    // * (max - min + 1)) + min : for random values inclusive between min and max
    let randNote = Math.floor(Math.random() * (12 - 1 + 1)) + 1;
    let randOctave = Math.floor(Math.random() * (7 - 4 + 1)) + 4;
    if (randOctave == 7 && randNote != 1)
        randomNote();
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
    if (guessCompare.length > 1)
        guess = guessCompare.substring(3) + randOctave;
    else
        guess = guessCompare + randOctave
}

// compare your note with the random note and updates score board
function comparePitches(pitch) {
    if (guessed == false) {
        if (guessCompare == pitch)
            correct++;
        else
            missed++;
        document.getElementById("correctDisplay").innerHTML = correct;
        document.getElementById("missedDisplay").innerHTML = missed;
        document.getElementById("inputDisplay").innerHTML = pitch;
        document.getElementById("noteDisplay").innerHTML = guessCompare;
        guessed = true;
        randomNote();
    }
}
