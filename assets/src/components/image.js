import hunt from 'huntjs';

function lazyLoadImage() {
    const $oldImage = this;
    const $newImage = new Image();

    $newImage.src = $oldImage.dataset.src;
    $newImage.onload = () => {
        $newImage.classList.add('is-loaded');
    };

    $oldImage.parentNode.insertBefore($newImage, null);
}

window.addEventListener('load', () => {
    const $images = document.querySelectorAll('.js-image');

    hunt($images, {
        in: lazyLoadImage,
    });
});
