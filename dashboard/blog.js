document.addEventListener('DOMContentLoaded', function () {
    const createPostBtn = document.getElementById('createPostBtn');
    const createPostModal = document.getElementById('createPostModal');
    const closeModal = document.getElementById('closeModal');
    const postForm = document.getElementById('postForm');
    const postContainer = document.querySelector('.post-container');
    const postDetailModal = document.getElementById('postDetailModal');
    const closeDetailModal = document.getElementById('closeDetailModal');
    const detailTitle = document.getElementById('detailTitle');
    const detailDate = document.getElementById('detailDate');
    const detailDescription = document.getElementById('detailDescription');

    // Function to create a new blog post element
    function createBlogPostElement(post) {
        const newPostElement = document.createElement('div');
        newPostElement.className = 'blog-post';
        newPostElement.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.description}</p>
            <p>Category: ${post.category}</p>
        `;
        return newPostElement;
    }

    // Load existing blog posts from local storage when the page loads
    function loadBlogPostsFromLocalStorage() {
        const existingPostsJSON = localStorage.getItem('blogPosts');
        if (existingPostsJSON) {
            const existingPosts = JSON.parse(existingPostsJSON);
            existingPosts.forEach(post => {
                const newPostElement = createBlogPostElement(post);
                postContainer.appendChild(newPostElement);
            });
        }
    }

    // Add event listeners
    createPostBtn.addEventListener('click', function () {
        createPostModal.style.display = 'flex';
    });

    closeModal.addEventListener('click', function () {
        createPostModal.style.display = 'none';
    });

    postForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        const postCategory = document.getElementById('postCategory').value;
        const postTitle = document.getElementById('postTitle').value;
        const postDescription = document.getElementById('postDescription').value;

        // Validation
        if (postCategory.trim() === '' || postTitle.trim() === '' || postDescription.trim() === '') {
            alert('Please fill out all fields.');
            return;
        }

        // Get the current date
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('default', { day: 'numeric', month: 'short', year: 'numeric' });

        // Create a new post object
        const newPost = {
            category: postCategory,
            title: postTitle,
            description: postDescription,
            date: formattedDate
        };

        // Save the new post to local storage
        const existingPostsJSON = localStorage.getItem('blogPosts');
        const existingPosts = existingPostsJSON ? JSON.parse(existingPostsJSON) : [];
        existingPosts.push(newPost);
        localStorage.setItem('blogPosts', JSON.stringify(existingPosts));

        // Create a new post element and append it to the post container
        const newPostElement = createBlogPostElement(newPost);
        postContainer.appendChild(newPostElement);

        // Close the modal and reset the form
        createPostModal.style.display = 'none';
        postForm.reset();
    });

    postContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('load-more') ||
            event.target.classList.contains('post-title')) {
            const title = event.target.getAttribute('data-title');
            const date = event.target.getAttribute('data-date');
            const description =
                event.target.getAttribute('data-description');

                // Set content in detail modal
                detailTitle.textContent = title;
                detailDate.textContent = date;
                detailDescription.textContent = description;
    
                // Display the detail modal
                postDetailModal.style.display = 'flex';
            }
    
            if (event.target.classList.contains('delete-post')) {
                const titleToDelete =
                    event.target.getAttribute('data-title');

                    const postToDelete =
                document.querySelector(`
            .post-title[data-title=
                "${titleToDelete}"]`).closest('.post-box');

            // Add fadeOut class to initiate the animation
            postToDelete.classList.add('fadeOut');

            // Remove the post after the animation completes
            setTimeout(() => {
                postContainer.removeChild(postToDelete);
            }, 500);
}
    });

    

    closeDetailModal.addEventListener('click', function () {

        // Add fadeOut class
        postDetailModal.classList.add('fadeOut');
        setTimeout(() => {
            postDetailModal.style.display = 'none';

            // Remove fadeOut class
            postDetailModal.classList.remove('fadeOut');
        }, 500);
    });

    // Load existing blog posts from local storage when the page loads
    loadBlogPostsFromLocalStorage();
});