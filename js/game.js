'use strict';

const gameBurger = document.querySelector('.header-burger');
const gameList = document.querySelector('.header-list');
const gameAction = document.querySelector('.header-action');

gameBurger.addEventListener('click', () => {
    gameBurger.classList.toggle('active');
    gameList.classList.toggle('visible');
    gameAction.classList.toggle('visible');
})


const faqQuestion = document.querySelectorAll('.faq-question');
const faqAnswer = document.querySelectorAll('.faq-answer');
// const faqImg = document.querySelector('.faq-img img');

faqQuestion.forEach((item) => {
    item.addEventListener('click', () => {
        const faqAttribute = item.getAttribute('data-tab');
        const activeAnswer = document.querySelector(faqAttribute);

        faqAnswer.forEach((item) => {
            item.classList.remove('active-answer');
        })
        activeAnswer.classList.add('active-answer');

    })
})


