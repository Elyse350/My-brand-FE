
let blog_data = [
    {
        id: 1,
        title: "Why You must Love JS?",
        type: "Technology",
        image: "images/increment.jpeg",
        // author:"John Doe",
        date: "12th May 2021",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. "
    },

    {
        id: 2,
        title: "The Hero of the 21st Century",
        type: "Politics",
        image: "images/increment.jpeg",
        // author:"James Millina",
        date: "19th June 2021",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, molestie ipsum et, consequat nibh. Etiam non elit dui. "
    }
];


function readBlogs() {
    document.querySelector('.update-blog-form').style.display = "none";
    document.querySelector('.add-new-blog-form').style.display = "none";
    const backNextBtns = document.querySelector('.back-next-btns');

    // Read the data from local storage and parse as JSON
    let deserialized_data = JSON.parse(localStorage.getItem('blog_data')) || [];
    // Update the global blog_data array with the new data from local storage
    blog_data = deserialized_data;

    localStorage.setItem("blog_data", JSON.stringify(blog_data));
    let elements = "";
    blog_data.map(record => {
        elements += `  
        <div class="single-edit-blog">
            <div class="single-blog">
                <a class="blog-title-link" href="">${record.title}</a>
                <div class="crud-edit-or-blog">
                    <div><button type="button" class="edit-single-blog"><img src="./images/icons/edit.svg" alt=""></button></div>
                    <div><button type="button" class="delete-single-blog"  onclick="deleteRecord(${record.id})"><img src="./images/icons/delete.svg" alt=""></button></div>
                </div>      
            </div>
            <div class="date-of-publication">${record.date}</div>
        </div>
        `;
    });

    backNextBtns.insertAdjacentHTML('beforebegin', elements);
}


function createBlog() {
    // document.querySelector('.written-blogs-list').style.display="none";
    // document.querySelector('.add-new-blog-form').style.display="block";
    document.querySelector('#createPostModal').style.display = "block";
    // document.querySelector('.filter-add h1').style.display="none";
    document.querySelector('#createPostBtn').style.display = "none";

}
document.querySelector('#createPostBtn').addEventListener('click', createBlog);

function postBlog() {
    const title = document.querySelector('#postTitle').value,
        category = document.querySelector('#postCategory').value,
        description = document.querySelector('#postDescription').value,
       
        image = document.querySelector('#postImage'),
        id = blog_data.length + 1;
    // let newBlog={title:title, content:content, type:type,  image:image,id:id};
console.log(title,category, description)
    if (title === "" || category === "" || description == "" ) {
        alert("Please fill all the fields");
        return false;

    }
    else {

        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer " + getToken());

        const formdata = new FormData();
        formdata.append("title", title);
        formdata.append("category", category);
        formdata.append("description", description);

        formdata.append("image", image.files[0]);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: formdata,
            redirect: "follow"
        };

        fetch("http://localhost:5646/blogs", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

        blog_data.push(newBlog);
        localStorage.setItem("blog_data", JSON.stringify(blog_data)); // Save the updated blog_data array to local storage

        document.querySelector('.written-blogs-list').style.display = "none";
        document.querySelector('.add-new-blog-form').style.display = "block";
        document.querySelector('.filter-add h1').style.display = "none";
        document.querySelector('#title').value = "";
        document.querySelector('#content').value = "";
        document.querySelector('#type').value = "";
        document.querySelector('#datepicker').value = "";
        document.querySelector('#image').value = "";
        console.log(blog_data);
        readBlogs();
        window.location.href = "./bloglist.html";
    }
}
document.querySelector('.post-btn').addEventListener('click', postBlog);


function deleteBlog(id) {
    let index = blog_data.findIndex(record => record.id === id);
    if (index !== -1) {
        blog_data.splice(index, 1);
        localStorage.setItem("blog_data", JSON.stringify(blog_data)); // update localStorage
        readBlogs();
    }
}

function deleteRecord(id) {
    if (confirm("Are you sure you want to delete this record?")) {
        deleteBlog(id);
    }
}


// //////


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- Boxicons -->
  <link href='https://unpkg.com/boxicons@2.0.9/css/boxicons.min.css' rel='stylesheet'>
  <!-- My CSS -->
  <link rel="stylesheet" href="dash.css">
  <link rel="stylesheet" href="/assets/css/#blog.cs">
  <title>My dashboard</title>
</head>
<body>


  <!-- SIDEBAR -->
  
    <nav  id="sidebar">
    <a href="#" class="brand"><i class='bx bxs-smile'></i><span class="text">Elyse MUTONI</span></a>
    <ul class="side-menu top">
      
      <li class="active"><a href="./dash.html"> <i class='bx bxs-dashboard' ></i> <span class="text">Dashboard</span> </a></li>
      <li><a href="./newusers.html"> <i class="bx bx-user" ></i> <span class="text">users</span> </a></li>

      <li><a href="#"><i class='bx bxs-shopping-bag-alt' ></i><span class="text">My Blog</span></a></li>
      <li><a href="./messenge.html"><i class='bx bxs-message-dots' ></i><span class="text">Message</span></a></li>
     
    <ul class="side-menu">
     <li> <a href="#" class="logout"> <i class='bx bxs-log-out-circle' ></i><span class="text">Logout</span></a></li></ul>
     </ul>
  </nav>

  <!-- SIDEBAR -->



  <!-- CONTENT -->
  <section id="content">
    <!-- NAVBAR -->
    <nav>
      <i class='bx bx-menu' ></i>
      <a href="#blog" class="nav-link">Categories</a>
      <form action="#">
        <div class="form-input">
          <input type="search" placeholder="Search...">
          <button type="submit" class="search-btn"><i class='bx bx-search' ></i></button>
        </div>
      </form>
      <input type="checkbox" id="switch-mode" hidden>
      <label for="switch-mode" class="switch-mode"></label>
      <a href="#" class="notification">
        <i class='bx bxs-bell' ></i>
        <span class="num">8</span>
      </a>
      <!-- <a href="#" class="profile">
        <img src="assets/img/PROFILE.jpg" alt="">
      </a> -->
    </nav>
    <!-- NAVBAR -->

    <!-- MAIN -->
    <header> 
      <h1 class="logo"><a href="#">Your Blog</a></h1> 
      <div class="dashboard-content">
        <div class="dashboard-data-container">
            <div class="dashboard-blog-container dashboard-input-information">
                <div class="dashboard-input-information-upper-section">
                    <p class="title white-text small-text"> Fill in Information</p>
                    <a class="title text-yellow rounded-text category-tag small-text cursor-pointer">Preview</a>

                </div>
              <form action="" method="POST"  class="dashboard-input-information-form" id="dashboard-input-information-form" enctype = "multipart/form-data">
                <div class="input-form">
                    <p class="white-text title small-text">Add Image</p>
                    <input type="file" name="poster" id="blog-form-poster" placeholder="Enter Your Image"/>
                    <p class="small-text red-text error" id="blog-form-poster-error"></p>
                </div>
                <div class="dashboard-image-preview">
                    <img src="" alt="blog-poster" id="image-preview">
                </div>

                  <div class="input-form">
                    <p class="hite-text title small-text">Title</p>
                    <input  type="text" name="title" id="blog-form-title" placeholder="Enter The Title"/>
                    <p class="small-text red-text error" id="blog-form-title-error"></p>

                  </div>
                  <div class="input-form">
                    <p class="hite-text title small-text">Sub Title</p>
                    <input type="text" name="title" id="blog-form-sub-title" placeholder="Enter The sub Title"/>
                    <p class="small-text red-text error" id="blog-form-sub-title-error"></p>

                  </div>

                  <div class="input-form">
                    <p class="hite-text title small-text">Category</p>
                      <select name="categories" id="blog-form-category" title="Categories">
                        <option value="">Choose Category</option>
                        <option value="web-development">Web Development</option>
                        <option value="artificial-intelligence">Artificial Intelligence</option>
                        <option value="technology">Technology</option>
                        <option value="web-hosting">Web Hosting</option>
                    </select>
                    <p class="small-text red-text error" id="blog-form-category-error"></p>

                  </div>
                  <div class="input-form">
                    <p class="hite-text title small-text">Time To read</p>
                    <input type="text" name="time" id="blog-form-time-to-read" placeholder="Enter TheTime Taken To read"/>
                    <p class="small-text red-text error" id="blog-form-time-to-read-error"></p>
                  
                </div>
                  <div class="input-form">
                    <p class="hite-text title small-text">Content</p>
                    <label for="blog-form-content"></label>
                    <textarea name="blog-form-content" id='blog-form-content' rows="3" title="content"></textarea>
                    <p class="small-text red-text error" id="blog-form-content-error"></p>

                  </div>

                  <div class="input-form">
                    <button type="submit"  value="" class="button">Upload Blog </button>
                        </div>
            </form>

      <!-- Detail Modal -->
      <div id="postDetailModal" class="modal"> 
        <div class="modal-content"> 
            <span class="close" id="closeDetailModal"> 
                × 
            </span> 
            <h1 id="detailTitle"></h1> 
            <span id="detailDate"></span>
            <img id="detailImage" src="" alt="Post Image"> <!-- Add the image element -->
            <p id="detailDescription"></p> 
            
        </div> 
    </div>
    
      <div id="postCreatedMessage" class="post-message"> 
          Post created successfully! 
        </div> 

  </main> 

  <!-- CONTENT -->
  </section>
<!-- <script src="../helper.js"></script>
<script src="./messenge.js"></script>
  <script src="./blog.js"> </script> -->
</body>
</html>
