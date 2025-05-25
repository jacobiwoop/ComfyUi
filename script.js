// Sample Ad Data / In-memory "database"
let adsData = [ // Changed to let to allow modification/reassignment if needed, though push is fine for arrays.
    {
        id: 1,
        title: "Vintage Bicycle - Like New",
        description: "A beautiful vintage bicycle, recently restored and in excellent condition. Perfect for city cruising or as a collector's item. Has a new leather seat and tires.",
        price: "250",
        contact: "seller1@example.com"
    },
    {
        id: 2,
        title: "Graphic Design Services",
        description: "Professional graphic design services for logos, brochures, websites, and more. Affordable rates and quick turnaround. Contact for a free quote.",
        price: "50 an hour",
        contact: "designer@example.com"
    },
    {
        id: 3,
        title: "Apartment for Rent - 2 Bedroom",
        description: "Spacious 2-bedroom apartment available in a quiet neighborhood. Close to public transport and amenities. Includes a modern kitchen and a balcony. Utilities not included.",
        price: "1200/month",
        contact: "landlord@example.com"
    },
    {
        id: 4,
        title: "Used Textbooks - Various Subjects",
        description: "Selling a collection of used textbooks for university courses, including mathematics, physics, and literature. All in good condition. Prices vary.",
        price: "10-30 each",
        contact: "student@example.com"
    }
];

// To generate unique IDs for new ads
let nextAdId = adsData.length > 0 ? Math.max(...adsData.map(ad => ad.id)) + 1 : 1;

document.addEventListener('DOMContentLoaded', () => {
    const pagePath = window.location.pathname;

    if (document.getElementById('ad-listings')) { // Index page
        displayAdsOnIndexPage();
    } else if (document.getElementById('ad-detail-title')) { // Ad detail page (more robust check)
        displayAdDetails();
    } else if (document.getElementById('post-ad-form')) { // Post ad page
        handleAdSubmission();
    }
});

function displayAdsOnIndexPage() {
    const adListingsContainer = document.getElementById('ad-listings');
    if (!adListingsContainer) {
        console.error("Ad listings container not found!");
        return;
    }

    adListingsContainer.innerHTML = ''; // Clear any existing content (like "Loading ads...")

    if (adsData.length === 0) {
        adListingsContainer.innerHTML = '<p>No ads available.</p>';
        return;
    }

    adsData.forEach(ad => {
        const adItem = document.createElement('div');
        adItem.classList.add('ad-item'); // Use the class from style.css

        const title = document.createElement('h3');
        title.textContent = ad.title;

        const price = document.createElement('p');
        price.textContent = `Price: ${ad.price}`;

        const viewDetailsLink = document.createElement('a');
        viewDetailsLink.href = `ad.html?id=${ad.id}`;
        viewDetailsLink.textContent = 'View Details';
        // Optional: Add some styling or class to the link
        // viewDetailsLink.classList.add('view-details-link');

        adItem.appendChild(title);
        adItem.appendChild(price);
        adItem.appendChild(viewDetailsLink);

        adListingsContainer.appendChild(adItem);
    });
}

function displayAdDetails() {
    const params = new URLSearchParams(window.location.search);
    const adId = parseInt(params.get('id')); // Ensure ID is an integer for comparison

    const ad = adsData.find(a => a.id === adId);

    // Get the placeholder elements (assuming they will have these IDs)
    const adTitleElement = document.getElementById('ad-detail-title');
    const adDescriptionElement = document.getElementById('ad-detail-description');
    const adPriceElement = document.getElementById('ad-detail-price');
    const adContactElement = document.getElementById('ad-detail-contact'); // Need to add this to ad.html

    // Fallback for the main content area if specific elements aren't found
    const mainContent = document.querySelector('main');


    if (ad) {
        if (adTitleElement) adTitleElement.textContent = ad.title;
        else mainContent.innerHTML = `<h2>${ad.title}</h2>`; // Fallback

        if (adDescriptionElement) adDescriptionElement.textContent = ad.description;
        else mainContent.innerHTML += `<p>${ad.description}</p>`; // Fallback

        if (adPriceElement) adPriceElement.textContent = `Price: ${ad.price}`;
        else mainContent.innerHTML += `<p>Price: ${ad.price}</p>`; // Fallback
        
        if (adContactElement) adContactElement.textContent = `Contact: ${ad.contact}`;
        else mainContent.innerHTML += `<p>Contact: ${ad.contact}</p>`; // Fallback

        // Update the header h1 as well, if it's generic
        const headerTitle = document.querySelector('header h1');
        if (headerTitle && headerTitle.textContent === 'Ad Details') {
            headerTitle.textContent = ad.title;
        }

    } else {
        if (mainContent) {
            mainContent.innerHTML = '<h2>Ad not found</h2><p>Sorry, the ad you are looking for does not exist or has been removed.</p>';
        } else {
            console.error("Main content area not found to display 'Ad not found' message.");
        }
    }
}

function handleAdSubmission() {
    const form = document.getElementById('post-ad-form');
    if (!form) {
        console.error("Post ad form not found!");
        return;
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default page reload

        // Get form values
        const title = document.getElementById('ad-title').value.trim();
        const description = document.getElementById('ad-description').value.trim();
        const price = document.getElementById('ad-price').value; // Price can be text e.g., "contact for price" or number
        const contact = document.getElementById('ad-contact').value.trim();

        // Basic validation
        if (!title || !description || !price || !contact) {
            alert('Please fill in all fields.');
            return;
        }

        // Create new ad object
        const newAd = {
            id: nextAdId,
            title: title,
            description: description,
            price: price, // Storing as is, could be string or number
            contact: contact
        };

        // Add to adsData array
        adsData.push(newAd);
        nextAdId++; // Increment for the next ad

        // Optional: Clear form fields
        form.reset();

        // Success message and redirect
        alert('Ad posted successfully!');
        window.location.href = 'index.html'; // Redirect to home page
    });
}
