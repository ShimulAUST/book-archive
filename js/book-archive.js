const searchBook = () => {
    const search = document.getElementById('search-field');
    const searchValue = search.value;
    toggleSpinner('block');
    if (searchValue === '') {

        console.log("No Value");
    }
    else {
        const url = `http://openlibrary.org/search.json?q=${searchValue}`;

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


const displaySearchResult = (datas, searchNumber) => {
    const divSearchResult = document.getElementById('search-result');
    divSearchResult.textContent = '';
    const numFound = document.getElementById('searchNumber');
    numFound.innerText = "Total search results: " + searchNumber;


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
        <div onclick="displayImage('${data.cover_i}')">
            <h2>${bookTitle}</h2>
            <h5>${authorNames}</h5>
            <h5>${firstPublished}</h5>
        </div>
            `;
        createDiv.style.padding = '2%';
        createDiv.style.border = '1px solid';
        createDiv.style.margin = '2%';
        divSearchResult.appendChild(createDiv);
    });
    toggleSpinner('none');


}


const displayImage = cover_i => {
    const bookImage = document.getElementById('book-details');
    bookImage.textContent = '';
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
   
        <div class="row g-0">
            <div class="col-md-4">
                <img src="https://covers.openlibrary.org/b/id/${cover_i}-M.jpg" class="img-fluid rounded-start" alt="...">
            </div>
        </div>
    
    `;
    bookImage.appendChild(div);
}