// Function to execute formatting commands
function execCmd(command) {
    if (command === 'createLink') {
        const url = prompt('Enter the URL');
        document.execCommand(command, false, url);
    } else if (command === 'insertImage') {
        const url = prompt('Enter the image URL');
        document.execCommand(command, false, url);
    } else {
        document.execCommand(command, false, null);
    }
}

// Function to save post content
function savePost() {
    const content = document.getElementById('editor').innerHTML;
    const post = { content: content, created_at: new Date() };

    fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    })
    .then(response => response.json())
    .then(data => {
        alert('Post saved successfully!');
        document.getElementById('editor').innerHTML = ''; // Clear editor
    })
    .catch(error => {
        console.error('Error saving post:', error);
        alert('Failed to save post.');
    });
}
