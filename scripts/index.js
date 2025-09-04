const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then((res) => res.json()) //promise of json data
        .then((json) => displayLesson(json.data));
}

const loadLevelWords = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`

    fetch(url).then((res) => res.json()).then((json) => displayLessonWords(json.data))
}

const displayLessonWords = (words) => {
    const lessonWordContainer = document.getElementById("lesson-word-container");
    lessonWordContainer.innerHTML = "";
    for (let word of words) {
        const wordContainer = document.createElement("div");
        wordContainer.innerHTML = `<div class="text-center border border-gray-300 rounded-lg shadow-lg pt-5 pb-2.5 px-2.5 space-y-2.5 h-full flex flex-col justify-between">
                <div>
                    <h2 class="text-2xl font-bold">${word.word ? word.word : "-"}</h2>
                    <p class="text-[16px] font-semibold">Meaning /Pronounciation</p>
                    <h2 class="bangla-font text-2xl font-semibold text-[#5e5e61]">"${word.meaning ? word.meaning : "-"} / ${word.pronunciation ? word.pronunciation : "-"}"</h2>
                </div>
                <div class="flex justify-between mt-5">
                    <button id= "infoBtn${word.id}"
                        class="btn text-[#5e5e61] w-8 h-8 flex items-center justify-center bg-[#1A91FF25] rounded-lg">
                        <i class="fa-solid fa-circle-info"></i>
                    </button>
                    <button
                        class="btn text-[#5e5e61] w-8 h-8 flex items-center justify-center bg-[#1A91FF25] rounded-lg">
                        <i class="fa-solid fa-volume-high"></i>
                    </button>
                </div>
            </div>`;
        lessonWordContainer.append(wordContainer);

        const infoBtn = document.getElementById(`infoBtn${word.id}`)
        if (infoBtn) {
            infoBtn.addEventListener('click', () => {
                const modalContainer = document.getElementById('modal-container');
                modalContainer.innerHTML = `
                    <dialog id="my_modal_2" class="modal">
                        <div class="modal-box">
                            <h3 class="text-lg font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})!</h3>
                            <p class="py-2">Meaning</p>
                            <p class="py-2">${word.meaning}</p>
                            <p class="py-2">Example</p>
                            <p class="py-2">${word.sentence}</p>
                            <p>সমার্থক শব্দ গুলো</p>
                            <div id="synonym-words">
                                Enthusiastic
                            </div>
                        </div>
                        <form method="dialog" class="modal-backdrop">
                            <button>close</button>
                        </form>
                    </dialog>
                `;
                const modal = document.getElementById('my_modal_2');
                modal.showModal();
            });
        }
    }

    //     {
    // "status": true,
    // "message": "successfully fetched a word details",
    // "data": {
    // "word": "Eager",
    // "meaning": "আগ্রহী",
    // "pronunciation": "ইগার",
    // "level": 1,
    // "sentence": "The kids were eager to open their gifts.",
    // "points": 1,
    // "partsOfSpeech": "adjective",
    // "synonyms": [
    // "enthusiastic",
    // "excited",
    // "keen"
    // ],
    // "id": 5
    // }
    // }


    if (words.length == 0) {
        const noWord = document.getElementById('no-word');
        noWord.classList.remove('hidden')
    }
    else {
        const noWord = document.getElementById('no-word');
        noWord.classList.add('hidden')
    }

}



const displayLesson = (lessons) => {
    // 01. get the container and make empty
    const lessonBtnContainer = document.getElementById('lesson-btn-container');
    lessonBtnContainer.innerHTML = "";
    // 02. get into every lesson
    for (let lesson of lessons) {
        // 03. create Element
        const lessonBtn = document.createElement("div");
        lessonBtn.innerHTML = `
            <button id="lessonBtn${lesson.level_no}" class="btn btn-outline btn-primary lessonBtns">
                <i class="fa-solid fa-book-open"></i>
                Lesson -${lesson.level_no}
            </button>
        `;
        // 04. append child

        lessonBtnContainer.append(lessonBtn);

        const currentBtn = document.getElementById(`lessonBtn${lesson.level_no}`);
        currentBtn.addEventListener('click', () => {
            loadLevelWords(lesson.level_no);
            const defaultWordSection = document.getElementById('default-word');
            defaultWordSection.classList.add('hidden')
        })

    }
}

loadLessons()



