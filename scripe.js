' use strict';
const accessKey = 'oOHVYZTfP0eG229z61oG9fuGgrLfeHMvRd8VjBOVS0g';

const formEl = document.getElementById('form');
const inputEl = document.getElementById('input');
const searchBtn = document.getElementsByClassName('search - btn');
const mainResults = document.querySelector('.main-container');
const showBtn = document.getElementById('show-more');

let inputData = '';
let page = 1;

async function searchImage() {
    if (inputEl?.value) {
        inputData = inputEl?.value;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (page === 1) {
        mainResults.innerHTML = '';
    }
    if (results.length === 0) {
        console.log("No Resulst found");
        showBtn.style.display = 'none';
        emptyContainer.classList.remove('hidden')
    } else {
        results.map((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('results');
            const image = document.createElement('img');
            image.src = result?.urls?.thumb;
            image.alt = result.alt_description;
            const imgeLink = document.createElement('a');
            imgeLink.href = result?.links?.html;
            imgeLink.target = '_blank';
            imgeLink.textContent = result.alt_description;

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imgeLink);
            mainResults.appendChild(imageWrapper);
        });
        page++;

        if (page > 1) {
            showBtn.style.display = 'block';
        }
    }
}
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
})
showBtn.addEventListener('click', function () {
    searchImage();
})
