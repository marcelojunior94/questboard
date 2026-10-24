    const sounds = {
    add: new Audio("/audio/Book.wav"),
    check: new Audio("/audio/QuestPluck.wav"),
    delete: new Audio("/audio/Dismiss2.wav"),
    // move: new Audio("./assets/Confirm1.wav"),
}

export function playSound(name, volume = 0.5){
    const sound = sounds[name];
    if(!sound) return;

    const copy = sound.cloneNode();
    copy.volume = volume;
    copy.play();
}