function Shuffle(words){
    for (let i = words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [words[i], words[j]] = [words[j], words[i]];
    }
    return words;
}

export default function WordChoice(){
    const words = window.localStorage.getItem("words").split(",");
    const randomWords = [];
    function selectWord(word){
        // console.log(word)
        window.localStorage.setItem("word", word);
        let newWords = []
        for(let i = 0; i < words.length; i++){
            if(words[i] !== word){
                newWords.push(words[i])
            }
        }
        window.localStorage.setItem("words", newWords);

    }
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        const removedWord = words.splice(randomIndex, 1)[0];
        randomWords.push(removedWord);
    }
    console.log(randomWords)
    console.log(words)
    return (
        <>
        <div className="wordChoice grid-cols-2 w-1/2 h-1/2">
            {Shuffle(randomWords).map((word, index) => (
                <div className="word bg-gray-600 border-3" key={index} onClick={()=>{selectWord(word)}}>
                    {word}
                </div>
            ))}
        </div>
        </>
    )
    
    // Rest of the code...
}