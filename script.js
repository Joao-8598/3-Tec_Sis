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

var estado = document.getElementById('estado');
$('#onoff1').on('change', function toggleDarkMode() {
    var el = this;
    estado.innerHTML = el.checked ? 'ligado' : 'desligado';

    // aqui podes juntar a lógica do ajax
    $.ajax({
        url: "some.php",
        data: {
            estado: this.checked
        }
    }).done(function(msg) {
        if (msg == 'failed') return el.checked = !el.checked; // caso o servidor retorne "failed" mudar o estado do botão
        else alert("Info gravada: " + msg);
    });
});
