const loadLessons = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all") //promise of response
        .then((res) => res.json()) //promise of json data
        .then((json) => displayLesson(json.data));
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
            <button class="btn btn-outline btn-primary">
                <i class="fa-solid fa-book-open"></i>
                Lesson -${lesson.level_no}
            </button>
        `
        // 04. append child

        lessonBtnContainer.append(lessonBtn);
    }

}

loadLessons()



