const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved user preference, if any, on page load
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.toggle('dark-mode', savedTheme === 'dark');
}

// Event listener for the toggle button
toggleButton.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  
  // Save the user's preference in localStorage
  const theme = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('theme', theme);
});
