const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //all lessons called
        .then((res) => res.json())
        .then((json) => displayBtns(json.data));
}


// lesson word called by level
const lessonWords = (level) => {
    fetch(`https://openapi.programming-hero.com/api/level/${level}`) //lesson all words called
        .then((res) => res.json())
        .then((json) => showLessonWords(json.data));
}


// fetch word details for modal
const wordDetailes = (wordId) => {
    fetch(`https://openapi.programming-hero.com/api/word/${wordId}`)
        .then((res) => res.json())
        .then((json) => showWordModal(json.data));
};



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
            <div class="h-full text-center border border-gray-400 rounded-lg shadow-lg pt-5 pb-2.5 px-2.5 space-y-2.5 flex flex-col justify-between">
                <div>
                    <h2 class="text-2xl font-bold">${word.word}</h2>
                    <p class="text-[16px] font-semibold">Meaning /Pronounciation</p>
                    <h2 class="bangla-font text-2xl font-semibold text-[#5e5e61]">"${word.meaning} / ${word.pronunciation}"</h2>
                </div>
                <div class="flex justify-between">
                    <button id= "infoId${word.id}"
                        class="btn text-[#5e5e61]  w-8 h-8 flex items-center justify-center bg-[#1A91FF50] rounded-sm">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button
                        class="btn text-[#5e5e61] w-8 h-8 flex items-center justify-center bg-[#1A91FF50] rounded-sm">
                        <i class="fa-solid fa-volume-high"></i>
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
                <h3 class="text-lg font-bold">
                    ${word.word} 
                    (<i class="fa-solid fa-microphone-lines"></i>: ${word.pronunciation || "-"})
                </h3>
                <p class="mt-2 font-bold">Meaning</p>
                <p class="py-2">${word.meaning || "-"}</p>
                <p class="mt-2 font-bold">Example</p>
                <p class="py-2">${word.sentence || "-"}</p>
                <p class="mt-2 font-bold">সমার্থক শব্দ গুলো</p>
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
        <button id="lessonBtn${lesson.level_no}" class="btn btn-outline btn-primary lessonBtns">
            <i class="fa-solid fa-book-open"></i>
            Lesson -${lesson.level_no}
        </button>
        `;

        // append child
        lessonBtnContainer.append(button);

        // active button
        const activeButton = document.getElementById(`lessonBtn${lesson.level_no}`);

        // active button function for show it's words
        activeButton.addEventListener('click', () => {
            lessonWords(lesson.level_no);

            // function for default word section
            const defaultWordSection = document.getElementById('default-word');
            defaultWordSection.classList.add('hidden');
        })
    }


}



loadLessons();