async function addPost(event) {
    // event.preventDefault();
    
    document.location.replace('/dashboard/create-post');
 
}

document.querySelector('#newPost').addEventListener('click', addPost);