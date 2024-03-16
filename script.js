const searchForm=document.querySelector('form')
const movieContainer=document.querySelector('.movie-container')
const inputBox=document.querySelector('.inputBox')
                                                                                                 //Fetch API

//Function to fetch movie details using OMDB API

const getMovieInfo = async (movie) => {
    const myAPIKey = "db37737a";
    const url = `http://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            showMovieData(data); // Call the function to display data
        } else {
            throw new Error('Network response was not ok.');
        }
    } catch (error) {
        showErrorMessage("No Movies Found");
    }
};

                                                                   // Function to show movie data on screen
const showMovieData = (data) => {
    movieContainer.innerHTML=""
    movieContainer.classList.remove('noBackground')
    // Use Array destructuring to extract properties from data object
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster } = data;
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info') 
    movieElement.innerHTML = `<h2>${Title}</h2>
                               <p><strong>Rating:&#11088;</strong>${imdbRating}</p>`
    const movieGenreElement=document.createElement('div');
    movieGenreElement.classList.add('movie-genre')  
    Genre.split(",").forEach(element=>{
        const p=document.createElement('p')
        p.innerText=element;
        movieGenreElement.appendChild(p)
    })   
    movieElement.appendChild(movieGenreElement)  
    movieElement.innerHTML += `<p><strong>Released Date;</strong>${Released}</p>
                            <p><strong>Duration;</strong>${Runtime}</p>
                            <p><strong>Cast;</strong>${Actors}</p>
                            <p><strong>Plot;</strong>${Plot}</p>` 
                            
                                                                        //  Create a div for movie poster
    const moviePosterElement=document.createElement('div')
    moviePosterElement.classList.add('movie-poster')
    moviePosterElement.innerHTML=`<img src="${Poster}"/>`
    movieContainer.appendChild(moviePosterElement)
    movieContainer.appendChild(movieElement);
};

                                                                     //Function to display Error Message
const showErrorMessage=(message)=>{
    movieContainer.innerHTML=`<h2>${message}</h2>`
    movieContainer.classList.add('noBackground')
}

                                                                 // Adding event listener to search form
searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if (movieName !== '') {
        showErrorMessage("Fetching Movie Information...")
        getMovieInfo(movieName);
    }else{
        movieContainer.innerHTML=`<h2>Enter movie name to get movie Information</h2>`
    }
});
