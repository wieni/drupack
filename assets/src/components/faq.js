import { toggleClass } from '../helpers';

window.addEventListener('load', () => {
    const $faqItems = document.querySelectorAll('.js-faq');

    for (let i = 0; i < $faqItems.length; i++) {
        const $faqItem = $faqItems[i];
        const $answer = $faqItem.querySelector('.faq-item__answer');

        $answer.style.height = `${$answer.getBoundingClientRect().height}px`;
        $faqItem.classList.remove('is-active');

        $faqItem.onclick = () => {
            toggleClass($faqItem, 'is-active');
        };
    }
});
