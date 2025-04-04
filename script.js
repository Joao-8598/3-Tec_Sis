document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema salvo se existir
    if (savedTheme) {
        document.body.classList.add(savedTheme);
    }
    
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark');
        
        // Salvar preferência no localStorage
        if (document.body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    });
});

const body = document.body;

function toggleDarkMode() {
    body.classList.toggle('dark-mode');
}

