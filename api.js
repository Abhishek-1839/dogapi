document.addEventListener('DOMContentLoaded', () => {
    const breedSelect = document.getElementById('breed');
    const imageContainer = document.getElementById('image-container');

    // Fetch the list of breeds and populate the dropdown menu
    async function fetchBreeds() {
        try {
            const response = await fetch('https://dog.ceo/api/breeds/list/all');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            const breeds = Object.keys(data.message);
            populateBreedDropdown(breeds);
        } catch (error) {
            console.error('Error fetching breeds:', error);
            alert('Failed to fetch breeds');
        }
    }

    // Populate the breed dropdown menu
    function populateBreedDropdown(breeds) {
        breeds.forEach(breed => {
            const option = document.createElement('option');
            option.value = breed;
            option.textContent = breed;
            breedSelect.appendChild(option);
        });
    }

    // Fetch a random image of the selected breed
    async function fetchBreedImage(breed) {
        try {
            const url = `https://dog.ceo/api/breed/${breed}/images/random`;
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            displayImage(data.message);
        } catch (error) {
            console.error('Error fetching breed image:', error);
            alert('Failed to fetch breed image');
        }
    }

    // Display the image in the container
    function displayImage(imageUrl) {
        imageContainer.innerHTML = `<img src="${imageUrl}" alt="Dog image" style="max-width: 100%;">`;
    }

    // Add event listener for breed selection change
    breedSelect.addEventListener('change', (event) => {
        const selectedBreed = event.target.value;
        if (selectedBreed) {
            fetchBreedImage(selectedBreed);
        }
    });

    // Initialize the page by fetching the breeds
    fetchBreeds();
});
