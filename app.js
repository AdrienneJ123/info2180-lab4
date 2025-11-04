document.addEventListener('DOMContentLoaded', function() {
    const searchForm =document.getElementById('search-form');
    const searchInput =document.getElementById('search-input');
    const resultDiv=document.getElementById('result');
    let superheroesData=[];
    // Fetch superheroes data when the page is loaded
    fetchSuperheroes();
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        performSearch();
    });
        // The search query will be sent as a query parameter (e.g., superheroes.php?query=Ironman)
    async function fetchSuperheroes() {
        try {
// Passes the query as a URL parameter to superheroes.php
            const response=await fetch('superheroes.php');
            const text= await response.text();
            superheroesData =parseSuperheroesData();
        } catch (error) {
            console.error('Error fetching superheroes:', error);
            // Fallback if fetch fails
            superheroesData = getFallbackSuperheroesData();
        }
    }
    
    function parseSuperheroesData() {
        return getFallbackSuperheroesData();
    }
    function getFallbackSuperheroesData() {
        return [
            { id: 1, name: "Steve Rogers", alias: "Captain America", biography: "Recipient of the Super-Soldier serum, World War II hero Steve Rogers fights for American ideals as one of the world's mightiest heroes and the leader of the Avengers." },
            { id: 2, name: "Tony Stark", alias: "Ironman", biography: "Genius. Billionaire. Playboy. Philanthropist. Tony Stark's confidence is only matched by his high-flying abilities as the hero called Iron Man." },
            { id: 3, name: "Peter Parker", alias: "Spiderman", biography: "Bitten by a radioactive spider, Peter Parker's arachnid abilities give him amazing powers he uses to help others, while his personal life continues to offer plenty of obstacles." },
            { id: 4, name: "Carol Danvers", alias: "Captain Marvel", biography: "Carol Danvers becomes one of the universe's most powerful heroes when Earth is caught in the middle of a galactic war between two alien races." },
            { id: 5, name: "Natasha Romanov", alias: "Black Widow", biography: "Despite super spy Natasha Romanoff's checkered past, she's become one of S.H.I.E.L.D.'s most deadly assassins and a frequent member of the Avengers." },
            { id: 6, name: "Bruce Banner", alias: "Hulk", biography: "Dr. Bruce Banner lives a life caught between the soft-spoken scientist he's always been and the uncontrollable green monster powered by his rage." },
            { id: 7, name: "Clint Barton", alias: "Hawkeye", biography: "A master marksman and longtime friend of Black Widow, Clint Barton serves as the Avengers' amazing archer." },
            { id: 8, name: "T'challa", alias: "Black Panther", biography: "T'Challa is the king of the secretive and highly advanced African nation of Wakanda - as well as the powerful warrior known as the Black Panther." },
            { id: 9, name: "Thor Odinson", alias: "Thor", biography: "The son of Odin uses his mighty abilities as the God of Thunder to protect his home Asgard and planet Earth alike." },
            { id: 10, name: "Wanda Maximoff", alias: "Scarlett Witch", biography: "Notably powerful, Wanda Maximoff has fought both against and with the Avengers, attempting to hone her abilities and do what she believes is right to help the world." }
        ];
    }
    function performSearch() {
    // Sanitizes the user input to prevent malicious code injection (XSS protection)
        const query=sanitizeInput(searchInput.value.trim());
        const resultHeader = document.createElement('div');
        resultHeader.innerHTML = `
            <h1>RESULT</h1>
            <hr>
        `;
        // Clear previous results
        resultDiv.innerHTML= '';
        resultDiv.appendChild(resultHeader);
        // Add loading message after the header
        const loadingDiv = document.createElement('div');
        loadingDiv.innerHTML = '<p class="loading">Searching...</p>';
        resultDiv.appendChild(loadingDiv);
        
        setTimeout(() =>{
            if (query==='') {
                displayResults(superheroesData);
            } else {
                const result =searchSuperhero(query);
                displayResults(result);
            }
        }, 300);
        //Search for a superhero by name or alias
    }function searchSuperhero(query) {
        const lowerQuery = query.toLowerCase();
        const found = superheroesData.find(superhero => 
            superhero.name.toLowerCase().includes(lowerQuery) || 
            superhero.alias.toLowerCase().includes(lowerQuery)
        );
        return found || { error: 'Superhero not found' };}
    function sanitizeInput(input) {
        const div = document.createElement('div');
        div.textContent = input;
        return div.innerHTML;
    }
    function displayResults(data) {
        const resultHeader=resultDiv.firstChild;
        // Clears everything except the header
        while (resultDiv.children.length > 1) {
            resultDiv.removeChild(resultDiv.lastChild);
        }
        // Create content container for results
        const contentDiv= document.createElement('div');
        contentDiv.className='result-content';
                    //If an error message exists superhero not found
        if (data.error) {
            contentDiv.innerHTML = `<p class="error-message">${data.error}</p>`;
             //If displaying all superheroes (empty query)
        } else if (Array.isArray(data)) {
            if (data.length===0) {
                contentDiv.innerHTML = '<p class="error-message">No superheroes found.</p>';
            } //If displaying one superhero
            else {
               // Displays the superhero details with alias in <h3>, name in <h4>, and biography in <p>
                const list = document.createElement('ul');
                list.className = 'superhero-list';
                data.forEach(superhero => {
                    const li =document.createElement('li');
                    li.textContent= superhero.alias;
                    list.appendChild(li);
                });
                contentDiv.appendChild(list);
            }
        } else {
            const detailDiv = document.createElement('div');
            detailDiv.className= 'superhero-detail';
            detailDiv.innerHTML = `
                <h3>${data.alias}</h3>
                <h4>${data.name}</h4>
                <p>${data.biography}</p>
            `;
            contentDiv.appendChild(detailDiv);
        } // Adds the content after the header
        resultDiv.appendChild(contentDiv);
    }
});