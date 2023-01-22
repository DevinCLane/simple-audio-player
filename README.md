# Simple Audio Player

A simple audio player with play/pause, volume, and panning functionality.

## Why make this?

I'm exploring audio manipulation using the web audio API.

## What resources did you use to create this?

I benefited from the MDN's guide [Using the Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Using_Web_Audio_API)

## What did you learn?

- Always first check if your audio context is suspended. This is likely the case due to restrictions against autoplaying audio in web browsers. Using something like this works well:
```
        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }
```
- If you'd like to load in an audio souce without using the Fetch API you can use the `createMediaElementSource()` method of the `AudioContext`, which creates a new `MediaElementAudioSourceNode` object, to which you can pass in an `<audio>` (or `<video>`) HTML element.

- adding a `data` attibute to the `button` allowed for nice managing of state for the on and off functionality of the play button.
```
        if (playButton.dataset.playing === "false") {
            audioElement.play();
            playButton.dataset.playing = 'true';
        } else if (playButton.dataset.playing === 'true') {
            audioElement.pause();
            playButton.dataset.playing = 'false';
        }
```
- The values of node objects such as `GainNode` are not simple values but objects of type [`AudioParam`](https://developer.mozilla.org/en-US/docs/Web/API/AudioParam). This means when updating their values (such as with the gain slider), we need to assign them as `gainNode.gain.value = 1`, instead of simply `gainNode.gain = 1`.

- Nodes can be created via either the factory or constructor method.
```
// constructor
const analyserNode = new AnalyserNode(audioCtx, {
  fftSize: 2048,
  maxDecibels: -25,
  minDecibels: -60,
  smoothingTimeConstant: 0.5,
});
// factory method
const analyserNode = audioCtx.createAnalyser();
analyserNode.fftSize = 2048;
analyserNode.maxDecibels = -25;
analyserNode.minDecibels = -60;
analyserNode.smoothingTimeConstant = 0.5;
```
from [Creating an audio node](https://developer.mozilla.org/en-US/docs/Web/API/AudioNode#creating_an_audionode)


## What optimizations would you add with more time?

- CSS for nice design and styling
- Allow user upload of audio
- Effects such as reverb, delay, distortion, pitch shifting, and playback speed would be fun.