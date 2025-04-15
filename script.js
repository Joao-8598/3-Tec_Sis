document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const darkModeSwitch = document.getElementById('onoff1');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    
    // Aplicar tema salvo se existir
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        darkModeSwitch.checked = true;
    }
    
    // Configurar o toggle do botão de tema
    themeToggle.addEventListener('click', function() {
        body.classList.toggle('dark');
        darkModeSwitch.checked = body.classList.contains('dark');
        
        // Salvar preferência no localStorage
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    });
    
    // Configurar o toggle do switch
    darkModeSwitch.addEventListener('change', function() {
        body.classList.toggle('dark');
        
        // Salvar preferência no localStorage
        if (body.classList.contains('dark')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.removeItem('theme');
        }
    });
});