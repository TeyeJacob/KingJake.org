// Smooth scrolling for navigation links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
    });
});



// Toggle night mode
const nightModeToggle = document.createElement('button');
nightModeToggle.textContent = "Toggle Night Mode";
nightModeToggle.style.position = "fixed";
nightModeToggle.style.bottom = "20px";
nightModeToggle.style.right = "20px";
nightModeToggle.style.padding = "10px 20px";
nightModeToggle.style.backgroundColor = "#333";
nightModeToggle.style.color = "#fff";
nightModeToggle.style.border = "none";
nightModeToggle.style.borderRadius = "5px";
nightModeToggle.style.cursor = "pointer";

document.body.appendChild(nightModeToggle);

nightModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('night-mode');
});

// Responsive navigation menu for mobile devices
const navbar = document.querySelector('.navbar');
const menuToggle = document.createElement('button');
menuToggle.textContent = "☰";
menuToggle.style.position = "fixed";
menuToggle.style.top = "10px";
menuToggle.style.left = "10px";
menuToggle.style.padding = "10px";
menuToggle.style.backgroundColor = "#333";
menuToggle.style.color = "#fff";
menuToggle.style.border = "none";
menuToggle.style.borderRadius = "5px";
menuToggle.style.cursor = "pointer";
menuToggle.style.zIndex = "1000";

document.body.appendChild(menuToggle);

menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('navbar-visible');
});

// Collapsible Sections
document.querySelectorAll('.section h2').forEach(header => {
    header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        if (content.classList.contains('section-content')) {
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
        }
    });
});

// Add Picture Functionality
const gallery = document.getElementById('gallery');
const addPictureButton = document.getElementById('addPictureButton');

addPictureButton.addEventListener('click', () => {
    const choice = prompt('Enter "1" to upload from your device or "2" to provide a URL:');
   
    if (choice === '1') {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
       
        fileInput.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const imgContainer = createImageContainer(URL.createObjectURL(file), 'Uploaded Group Picture');
                gallery.appendChild(imgContainer);
            }
        });

        fileInput.click();
    } else if (choice === '2') {
        const imageUrl = prompt('Enter the URL of the picture:');
        if (imageUrl) {
            const imgContainer = createImageContainer(imageUrl, 'New Group Picture');
            gallery.appendChild(imgContainer);
        }
    } else {
        alert('Invalid choice. Please enter "1" or "2".');
    }
});

// Function to create an image container with a delete button
function createImageContainer(imageSrc, altText) {
    const container = document.createElement('div');
    container.style.position = 'relative';
    container.style.display = 'inline-block';
    container.style.margin = '10px';

    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = altText;
    img.style.width = '150px';
    img.style.height = '150px';
    img.style.borderRadius = '10px';
    img.style.objectFit = 'cover';
    img.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.position = 'absolute';
    deleteButton.style.top = '5px';
    deleteButton.style.right = '5px';
    deleteButton.style.padding = '5px 10px';
    deleteButton.style.backgroundColor = '#ff4d4d';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.borderRadius = '5px';
    deleteButton.style.cursor = 'pointer';

    deleteButton.addEventListener('click', () => {
        container.remove();
    });

    container.appendChild(img);
    container.appendChild(deleteButton);

    return container;
}

// Initialize EmailJS (replace 'YOUR_USER_ID' with your EmailJS user ID)
emailjs.init('YOUR_USER_ID');

const feedbackForm = document.getElementById('feedbackForm');

feedbackForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const activityDay = document.getElementById('activityDay').value;
    const feedbackText = document.getElementById('feedbackText').value;

    if (activityDay && feedbackText) {
        const templateParams = {
            activity_day: activityDay,
            feedback_text: feedbackText,
            recipient_email: 'jacobteye42@gmail.com',
        };

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams)
            .then(() => {
                alert('Feedback sent successfully!');
                feedbackForm.reset();
            })
            .catch((error) => {
                alert('Failed to send feedback. Please try again later.');
                console.error('EmailJS Error:', error);
            });
    } else {
        alert('Please fill out all fields before submitting.');
    }
});


// Memory data with associated pictures
const memoryAlbums = {
    retreat2025: [],
    serviceDay: [],
    birthdays: []
};

// Add click event to each "Add Picture" button
document.querySelectorAll('.add-picture-button').forEach(button => {
    button.addEventListener('click', () => {
        const memoryKey = button.getAttribute('data-memory');
        const imageUrl = prompt('Enter the URL of the picture:');
        if (imageUrl) {
            memoryAlbums[memoryKey].push(imageUrl);
            alert(`Picture added to ${memoryKey}!`);
        }
    });
});

// Add click event to each memory item to view pictures
document.querySelectorAll('.memory-list li').forEach(memoryItem => {
    memoryItem.addEventListener('click', () => {
        const memoryKey = memoryItem.getAttribute('data-memory');
        const pictures = memoryAlbums[memoryKey];

        // Set modal title
        modalTitle.textContent = memoryItem.textContent;

        // Clear previous gallery content
        modalGallery.innerHTML = '';

        // Add pictures to the modal gallery
        if (pictures.length > 0) {
            pictures.forEach(picture => {
                const img = document.createElement('img');
                img.src = picture;
                img.alt = memoryItem.textContent;
                modalGallery.appendChild(img);
            });
        } else {
            modalGallery.innerHTML = '<p>No pictures available for this memory. Add some pictures!</p>';
        }

        // Show the modal
        memoryModal.style.display = 'block';
    });
});

// Close the modal
closeModal.addEventListener('click', () => {
    memoryModal.style.display = 'none';
});

// Close the modal when clicking outside of it
window.addEventListener('click', (event) => {
    if (event.target === memoryModal) {
        memoryModal.style.display = 'none';
    }
});


