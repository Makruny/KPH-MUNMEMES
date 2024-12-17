const CLIENT_ID = 'adbbc0d7250341e';
const ACCESS_TOKEN = '9eae8a9f78374329bbd24431b05675bc593e58c6';

// Get elements
const uploadButton = document.getElementById('uploadButton');
const fileInput = document.getElementById('fileInput');
const memeGallery = document.getElementById('memeGallery');

// Function to display memes from localStorage
function loadMemes() {
    const memes = JSON.parse(localStorage.getItem('memes')) || [];
    memes.forEach(meme => {
        displayMeme(meme);
    });
}

// Function to display meme in gallery
function displayMeme(url) {
    const memeDiv = document.createElement('div');
    memeDiv.classList.add('meme');

    const memeImg = document.createElement('img');
    memeImg.src = url;

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function() {
        deleteMeme(url);
    };

    memeDiv.appendChild(memeImg);
    memeDiv.appendChild(deleteButton);
    memeGallery.appendChild(memeDiv);
}

// Function to upload meme to Imgur
async function uploadMemeToImgur(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
            'Authorization': `Client-ID ${CLIENT_ID}`,
        },
        body: formData,
    });

    const data = await response.json();
    return data.data.link;  // Return the image URL
}

// Function to handle meme upload
async function handleUpload() {
    const file = fileInput.files[0];
    if (!file) {
        alert('Please select an image to upload.');
        return;
    }

    try {
        const imageUrl = await uploadMemeToImgur(file);
        const memes = JSON.parse(localStorage.getItem('memes')) || [];
        memes.push(imageUrl);

        localStorage.setItem('memes', JSON.stringify(memes));  // Save memes to localStorage
        displayMeme(imageUrl);
    } catch (error) {
        alert('Failed to upload meme. Try again.');
    }
}

// Function to delete meme
function deleteMeme(url) {
    let memes = JSON.parse(localStorage.getItem('memes')) || [];
    memes = memes.filter(meme => meme !== url);
    localStorage.setItem('memes', JSON.stringify(memes));

    // Remove from UI
    const memeElements = document.querySelectorAll('.meme');
    memeElements.forEach(memeElement => {
        if (memeElement.querySelector('img').src === url) {
            memeElement.remove();
        }
    });
}

// Event listener for upload button
uploadButton.addEventListener('click', handleUpload);

// Load memes from localStorage when the page loads
window.onload = loadMemes;
