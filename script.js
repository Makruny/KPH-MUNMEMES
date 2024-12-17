document.getElementById("upload-btn").addEventListener("click", function() {
    let fileInput = document.getElementById("file-input");
    let file = fileInput.files[0];
    if (file) {
        let reader = new FileReader();
        reader.onload = function(e) {
            let memeGallery = document.getElementById("meme-gallery");

            let memeContainer = document.createElement("div");
            memeContainer.classList.add("meme-container");

            let memeImage = document.createElement("img");
            memeImage.src = e.target.result;
            memeImage.classList.add("meme");

            let likeButton = document.createElement("button");
            likeButton.classList.add("like-btn");
            likeButton.textContent = "Like";

            let commentButton = document.createElement("button");
            commentButton.classList.add("comment-btn");
            commentButton.textContent = "Comment";

            let deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-btn");
            deleteButton.textContent = "Delete";

            let commentsContainer = document.createElement("div");
            commentsContainer.classList.add("comments-container");

            let commentInput = document.createElement("input");
            commentInput.type = "text";
            commentInput.classList.add("comment-input");
            commentInput.placeholder = "Add a comment...";

            let addCommentButton = document.createElement("button");
            addCommentButton.textContent = "Post Comment";
            addCommentButton.style.marginTop = "10px";
            addCommentButton.style.padding = "5px 10px";
            addCommentButton.style.backgroundColor = "black";
            addCommentButton.style.color = "white";
            addCommentButton.style.border = "none";
            addCommentButton.style.cursor = "pointer";

            addCommentButton.addEventListener("click", function() {
                if (commentInput.value.trim() !== "") {
                    let comment = document.createElement("div");
                    comment.classList.add("comment");
                    comment.textContent = commentInput.value;
                    commentsContainer.appendChild(comment);
                    commentInput.value = "";  // Clear input after posting
                }
            });

            // Delete meme functionality
            deleteButton.addEventListener("click", function() {
                memeContainer.remove();
            });

            memeContainer.appendChild(memeImage);
            memeContainer.appendChild(likeButton);
            memeContainer.appendChild(commentButton);
            memeContainer.appendChild(deleteButton);
            memeContainer.appendChild(commentInput);
            memeContainer.appendChild(addCommentButton);
            memeContainer.appendChild(commentsContainer);

            memeGallery.appendChild(memeContainer);
        };
        reader.readAsDataURL(file);
        fileInput.value = "";  // Clear file input after upload
    } else {
        alert("Please select an image file first.");
    }
});
