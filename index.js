document.addEventListener("DOMContentLoaded", function() {
    // Retrieve blog post data from local storage
    const blogPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    // Select the container element where we want to display the blog posts
    const container = document.querySelector(".blog-container");

    // Function to create HTML elements for each blog post
    const createBlogPostElement = (title, category, description, image) => {
        const blogPostElement = document.createElement("div");
        blogPostElement.classList.add("blog-post");

        const titleElement = document.createElement("h4");
        titleElement.textContent = title;

        const categoryElement = document.createElement("h5");
        categoryElement.textContent = `Category: ${category}`;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = description;

        
        const imageElement = document.createElement("img");
        imageElement.src = image; // Set the image source
        imageElement.alt = title; 

        blogPostElement.appendChild(titleElement);
        blogPostElement.appendChild(categoryElement);
        blogPostElement.appendChild(descriptionElement);
        blogPostElement.appendChild(imageElement); // Append the image element


        return blogPostElement;
    };

    // Function to display blog posts
    const displayBlogPosts = (posts) => {
        posts.forEach(post => {
            const blogPostElement = createBlogPostElement(post.title, post.category, post.description, post.image);
            container.appendChild(blogPostElement);
        });
    };

    // Display the blog posts
    displayBlogPosts(blogPosts);
});

//for users and admins
// if (localStorage.getItem('email') && localStorage.getItem('password')) {
//     window.location.href = './dashboard/dash.html';
// }