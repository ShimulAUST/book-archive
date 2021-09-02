//search book function
const searchBook = () => {
    const search = document.getElementById('search-field');
    const searchValue = search.value;
    toggleSpinner('block');

    if (searchValue === '') {

        console.log("No Value");
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${searchValue}`;

        console.log('Clicked');
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.docs, data.numFound))
            .catch(err => console.log(err));

    }

}
//spinner function
const toggleSpinner = displayStyle => {
    document.getElementById('spinner').style.display = displayStyle;
}
//display search result function
const displaySearchResult = (datas, searchNumber) => {
    const divSearchResult = document.getElementById('search-result');
    divSearchResult.textContent = '';
    const numFound = document.getElementById('searchNumber');
    numFound.innerText = "Total search results: " + searchNumber;
    console.log(typeof searchNumber);
    if (searchNumber === 0) {
        const noBookFound = document.getElementById('noBookFound');
        noBookFound.innerText = "No Book Found with this name";
    }
    else {
        noBookFound.textContent = '';
        datas.forEach(data => {
            let authorNames, firstPublished, bookTitle;

            if (data.first_publish_year) {
                firstPublished = data.first_publish_year;
                console.log(data.first_publish_year);
            }
            else {
                firstPublished = "No Date";
                console.log("Date nai");
            }
            if (data.author_name) {
                authorNames = data.author_name;
                console.log(data.author_name);
            }
            else {
                authorNames = "No author";
                console.log('author nai');
            }
            if (data.title) {
                bookTitle = data.title;
                console.log(data.title);
            }
            else {
                bookTitle = "No Title";
                console.log('title Nai')
            }
            const createDiv = document.createElement('div');
            createDiv.classList.add('col-lg-3');

            createDiv.innerHTML = `
        <div class="card-group">
            <div class="card" style="max-width: 600px;">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="https://covers.openlibrary.org/b/id/${data.cover_i}-L.jpg" class="card-img" alt="...">
                       
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                        <h5 class="card-title">${bookTitle.slice(0, 15)}</h5>
                        <p class="card-text">by ${authorNames}<br>Published By: ${data.publisher}</p>
                        <p class="card-text"><small class="text-muted">First Published on: ${firstPublished}</small></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
            createDiv.style.margin = '2%';
            divSearchResult.appendChild(createDiv);
        });
    }
    toggleSpinner('none');
}
