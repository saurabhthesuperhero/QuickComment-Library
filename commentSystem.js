// FileName: commentSystem.js

document.addEventListener('DOMContentLoaded', function() {
    const commentSystemContainer = document.getElementById('comment-system');

    // File paths as variables
    const commentSystemUIPath = 'commentSystemUI.html';
    const commentHandlerPath = 'commentHandler.php';

    // Check if the container exists
    if (commentSystemContainer) {
        // Fetch and insert comment form HTML from an external HTML file
        fetch(commentSystemUIPath)
            .then(response => response.text())
            .then(html => {
                commentSystemContainer.innerHTML = html;
                initializeCommentSystem();
            });
    }

    function initializeCommentSystem() {
        const commentsContainer = document.getElementById('comments-container');
        const commentForm = document.getElementById('comment-form');
        const postUrl = window.location.href;

        function fetchComments() {
            fetch(`${commentHandlerPath}?post_url=` + encodeURIComponent(postUrl))
                .then(response => response.json())
                .then(comments => {
                    const commentsContainer = document.getElementById('comments-container');
                    commentsContainer.innerHTML = ''; // Clear existing comments

                    if (comments.length === 0) {
                        // Display message if there are no comments
                        commentsContainer.innerHTML = '<p>No Comments added. Be the first to add one!</p>';
                    } else {
                        const template = document.getElementById('comment-template').content;

                        comments.forEach(comment => {
                            const clone = document.importNode(template, true);
                            clone.querySelector('.comment-name').textContent = comment.name;
                            clone.querySelector('.comment-text').textContent = comment.comment;
                            // Format the date and time
                            const date = new Date(comment.posted_at);
                            const options = {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: '2-digit',
                                hour12: true // Use AM/PM format
                            };
                            const formattedDateTime = date.toLocaleString('en-US', options);
                            clone.querySelector('.comment-date').textContent = formattedDateTime;
                        
                            commentsContainer.appendChild(clone);
                        });
                        
                    }
                });
        }

        // Fetch and display comments on load
        fetchComments();

        // Handle new comment submission
        commentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const formData = new FormData(commentForm);
            const data = Object.fromEntries(formData.entries());
            data.post_url = postUrl;

            fetch(commentHandlerPath, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                fetchComments(); // Reload comments after submission
                commentForm.reset(); // Clear the form entries after successful submission
            });
        });
    }
});
