console.log('heyo');
let min = document.getElementById('minutes');
let hour = document.getElementById('hours');
let btn = document.getElementById('btn');
let note = document.getElementById('note');

btn.addEventListener('click', setalarm);

function setalarm() {
    setInterval(() => {
        date = new Date();
        mtime = date.getMinutes();
        htime = date.getHours();
        ahour = hour.value;
        amin = min.value;
        if (ahour == htime && amin == mtime) {
            play();
            note.innerHTML = '<strong>Ringing...</strong>';
        } else {
            note.innerHTML = `You have ${ahour - htime} hours and ${
                amin - mtime
            } minutes remaining for alarm to go.`;
        }
    }, 1000);
}

audio.play();

function play() {
    var audio = new Audio('https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3');
    audio.play();
  }