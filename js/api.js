// create function for load api
const loadApi = () => {

	// get search input
	const searchInput = document.getElementById('search-input');

	const searchText = searchInput.value;

	// if search an empty value
	if(searchInput.value === '') {
		alert('Please write something!');
	}
	else {

	//empty field
	searchInput.value = '';

	//get api
	const url = `https://openlibrary.org/search.json?q=${searchText}`;

	//fetch data
	fetch(url)
	.then(res => res.json())
	.then(data => displayData(data, data.docs))
	}


}


// function for display data

const displayData = (books, docs) => {


	//if search not found
	if(books.numFound === 0 ) {
		alert('Please enter Correct Name!');
	}
	else {
		//get books div id
		const bookNumber = document.getElementById('display-book-number');

		//empty previous value
		bookNumber.textContent = '';

		//create div
		const div = document.createElement('div');
		div.innerHTML = `<h5 class="text-white mt-5">Total Books Found : ${books.numFound}</h5>`;
		//append div
		bookNumber.appendChild(div);

		//get display Result div
		const displayResult = document.getElementById('display-result');

		//empty previous result
		displayResult.textContent ='';

		//sliced to show limited result of docs array
		const sliced = docs.slice(0, 21);

		// loop through the sliced array
		sliced.forEach(book => {

		//get image url
		const coverUrl = `src = "https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg"`;

		//create div
		const div = document.createElement('div');

		//add class
		div.classList.add('col');
		div.innerHTML = `
		  <div class="card h-100 text-center">
		  <img id="img-field"  class="card-img-top img-fluid mx-auto h-75 p-3" ${book.cover_i===undefined?"src = https://fivebooks.com/app/uploads/2010/09/no_book_cover.jpg": coverUrl}>
			<div class="card-body p-2">
			  <h5 class="card-title mt-2"> ${book.title}</h5>
			  <p class="card-text">Book Author : <span class="text-primary fw-bold">${book.author_name===undefined?"Name not Found": book.author_name[0]}</span></p>
			  <p class="card-text">First published in <span class="text-danger fw-bold"> ${book.first_publish_year===undefined?"Not Found":book.first_publish_year}</span> by <span class="text-secondary fw-bold">${book.publisher===undefined?"Not Found": book.publisher[0]}</span> </p>
			</div>
		  </div>`;

		//Append Div for display result
		displayResult.appendChild(div);

	})
	}



}