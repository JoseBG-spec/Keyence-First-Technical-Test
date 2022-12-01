const input = document.querySelector('.input-btn input');
const listLanguages = document.querySelector('.list-languages ul');
const text = document.querySelector('.list-languages');
const form = document.querySelector('.input-btn form')
let languages = [];

function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded', () => {
        languages = JSON.parse(localStorage.getItem('languages')) || [];
        createHTML();
    });

    listLanguages.addEventListener('click', deleteLanguage);
}

function addLanguage(){
    const language = input.value;
    if (language === '') {
        showError('The field is empty...');
        return;
    }

    const languageObj = {
        language,
        id: Date.now()
    }
    languages = [...languages, languageObj]

    createHTML();
    input.value = '';
}

function deleteLanguage(e){
    if (e.target.tagName == 'SPAN') {
        const deleteId = parseInt(e.target.getAttribute('language-id'));
        languages = languages.filter(language => language.id !== deleteId);
        createHTML();
    }
}

function deleteAllLanguages(){
    languages = [];
    createHTML();
}

function createHTML(){
    clearHTML();

    if (languages.length > 0) {
        languages.forEach(language => {
            const li = document.createElement('li');
            li.innerHTML = `${language.language} <span language-id="${language.id}" >X</span>`;

            listLanguages.appendChild(li);
        });
    }

    sincronizationStorage();
}

function sincronizationStorage(){
    localStorage.setItem('languages', JSON.stringify(languages));
}

function showError(error){
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error');

    text.appendChild(messageError);
    setTimeout(() => {
        messageError.remove();
    },2000);

}

function clearHTML(){
    listLanguages.innerHTML = '';
}