// set up an audio context. this is where all audio is made
const audioContext = new AudioContext();

// grab the audio HTML element which loads our sound
const audioElement = document.querySelector('audio');

// expose the HTML audio element as an input node to our audio graph (in our context)
// in other words, we grab our audio element and pass it into our audio element into our audio context
const track = audioContext.createMediaElementSource(audioElement);

// gain
const gainNode = audioContext.createGain();

// conntect the audio track to the destination node, which is our computer speakers
track.connect(gainNode).connect(audioContext.destination);

const playButton = document.querySelector('button');

// play and pause button functionality
playButton.addEventListener(
    'click',
    () => {
        // this checks if our audio context has been suspended by the common blockage of autoplay by browsers
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        if (playButton.dataset.playing === "false") {
            audioElement.play();
            playButton.dataset.playing = 'true';
        } else if (playButton.dataset.playing === 'true') {
            audioElement.pause();
            playButton.dataset.playing = 'false';
        }
    },
    false
)

// if the track ends, update the state of our play button to false
audioElement.addEventListener(
    "ended",
    () => {
        playButton.dataset.playing = 'false';
    },
    false
);

// gain control
const volumeControl = document.querySelector('#volume');

// event listener for gain control via user input
volumeControl.addEventListener(
    "input",
    () => {
        gainNode.gain.value = volumeControl.value;
    },
    false
);