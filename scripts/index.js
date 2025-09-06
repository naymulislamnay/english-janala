const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //all lessons called
        .then((res) => res.json())
        .then((json) => displayBtns(json.data));
}

// remove active button
const removeActive = () => {
    const lessonButtons = document.querySelectorAll('.lessonBtn');
    lessonButtons.forEach((btn) => btn.classList.remove('bg-blue-900', 'text-white'))
}


// lesson word called by level
const lessonWords = (level) => {
    fetch(`https://openapi.programming-hero.com/api/level/${level}`) //lesson all words called
        .then((res) => res.json())
        .then((json) => {
            removeActive()
            const activeButton = document.getElementById(`lessonBtn${level}`);
            activeButton.classList.add('bg-blue-900', 'text-white')
            showLessonWords(json.data)
        });
}


// fetch word details for modal
const wordDetailes = (wordId) => {
    fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
        .then((res) => res.json())
        .then((json) => showWordModal(json.data));
};


// word pronounciation function
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}


// show lessons all words
const showLessonWords = (words) => {

    // words container
    const wordsContainer = document.getElementById('lesson-word-container');

    // make sure the container is empty
    wordsContainer.innerHTML = '';

    // start loop for every word
    for (let word of words) {


        // create new card for every word
        const wordCard = document.createElement('div');
        wordCard.innerHTML = `
            <div class="h-full text-center border border-gray-400 rounded-lg shadow-lg pt-1 md:pt-5 pb-1 md:pb-2.5 px-1 md:px-2.5 space-y-2.5 flex flex-col justify-between">
                <div>
                    <h2 class="text-[16px] md:text-2xl font-bold">${word.word}</h2>
                    <p class="text-[9px] md:text-[16px] font-semibold">Meaning /Pronounciation</p>
                    <h2 class="bangla-font text-[12px] md:text-2xl font-semibold text-[#5e5e61]">"${word.meaning} / ${word.pronunciation}"</h2>
                </div>
                <div class="flex justify-between">
                    <button id= "infoId${word.id}"
                        class="btn text-[#5e5e61] w-5 h-6 md:w-8 md:h-8 flex items-center justify-center bg-[#1A91FF50] rounded-sm">
                        <i class="fa-solid fa-circle-info text-[12px] md:text-[16px]"></i>
                    </button>
                    <button onclick="pronounceWord('${word.word}')"
                        class="btn text-[#5e5e61] w-5 h-6 md:w-8 md:h-8 flex items-center justify-center bg-[#1A91FF50] rounded-sm">
                        <i class="fa-solid fa-volume-high text-[12px] md:text-[16px]"></i>
                    </button>
                </div>
            </div>
        `;

        wordsContainer.append(wordCard);


        // info button click → fetch word detail → show modal
        const infoBtn = wordCard.querySelector(`#infoId${word.id}`);
        infoBtn.addEventListener("click", () => {
            wordDetailes(word.id);
        });

    }


    // function for no word lessons
    if (words.length == 0) {
        const noWord = document.getElementById('no-word');
        noWord.classList.remove('hidden');
    }
    else {
        const noWord = document.getElementById('no-word');
        noWord.classList.add('hidden');
    }
}

// show modal with word details
const showWordModal = (word) => {
    const modalContainer = document.getElementById("modal-container");
    modalContainer.innerHTML = `
        <dialog id="my_modal_2" class="modal">
            <div class="modal-box">
                <h3 class="text-sm md:text-lg font-bold">
                    ${word.word} 
                    (<i class="fa-solid fa-microphone-lines"></i>: <span class="bangla-font">${word.pronunciation || "-"}</span>)
                </h3>
                <p class="mt-2 font-bold text-[12px] md:text-lg">Meaning</p>
                <p class="py-2 text-sm md:text-lg bangla-font">${word.meaning || "-"}</p>
                <p class="mt-2 font-bold text-[12px] md:text-lg">Example</p>
                <p class="py-2 text-[12px] md:text-lg">${word.sentence || "-"}</p>
                <p class="bangla-font mt-2 font-bold text-[13px] md:text-lg">সমার্থক শব্দ গুলো</p>
                <div id="synonym-words">
                    ${(word.synonyms && word.synonyms.length > 0)
            ? word.synonyms.join(", ")
            : "No synonyms found"}
                </div>
            </div>
            <form method="dialog" class="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    `;

    const modal = document.getElementById("my_modal_2");
    modal.showModal();
};


// show the lessons buttons
const displayBtns = (lessons) => {

    // lesson button container
    const lessonBtnContainer = document.getElementById('lesson-btn-container')

    // start loop for every buttons
    for (let lesson of lessons) {

        // create new btn for every lesson
        const button = document.createElement('div')
        button.innerHTML = `
        <button id="lessonBtn${lesson.level_no}" class="btn btn-outline btn-primary lessonBtn text-[10px] md:text-[14px] p-1 md:p-2">
            <i class="fa-solid fa-book-open"></i>
            Lesson -${lesson.level_no}
        </button>
        `;

        // append child
        lessonBtnContainer.append(button);

        // // active button
        // const activeButton = document.getElementById(`lessonBtn${lesson.level_no}`);

        // active button function for show it's words
        button.addEventListener("click", () => {
            lessonWords(lesson.level_no);

            // hide default section
            document.getElementById("default-word").classList.add("hidden");


        });



    }


}



loadLessons();


// spinner

// function showSpinner() {
//     document.getElementById("page-spinner").classList.remove("hidden");
// }

// function hideSpinner() {
//     document.getElementById("page-spinner").classList.add("hidden");
// }
