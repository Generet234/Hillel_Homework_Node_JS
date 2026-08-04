if(typeof document !== 'undefined') {
    const inputWordsForbidden = document.getElementsByClassName("forbiddenWords")[1] as HTMLInputElement;
    const inputString = document.getElementsByClassName("string")[1] as HTMLInputElement;
    let responseText = document.getElementsByClassName("response")[0] as HTMLInputElement;

    let text: string = inputWordsForbidden ? inputWordsForbidden.value : "This is a test sentence with some bad words."
    let forbiddenWords : string[] = inputString ? inputString.value.split(",") : ['bad','test']


    function highlightForbiddenWords(text:string,forbiddenWords:string[] ) {
        const foundWords = forbiddenWords.filter((element:string) => text.includes(element))
        console.log(foundWords)
        if (foundWords.length > 0){
            for(let word of foundWords){
                text = text.replace(word, `<del>${word}</del> `)
            }
        }
        responseText.innerHTML = text
        return text
    }

    console.log(highlightForbiddenWords(text, forbiddenWords))
}