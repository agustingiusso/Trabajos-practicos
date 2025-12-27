document.addEventListener('DOMContentLoaded', () => {
    const copyButtons = document.querySelectorAll('.btn-copy');

    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            // 1. Obtener el texto del código
            const code = button.closest('.code-box').querySelector('code').innerText;
            
            // 2. Elementos internos para animar
            const copyIcon = button.querySelector('.copy-icon');
            const checkIcon = button.querySelector('.check-icon');
            const btnText = button.querySelector('span');
            const originalText = btnText ? btnText.innerText : 'Copiar';

            try {
                // 3. Copiar al portapapeles
                await navigator.clipboard.writeText(code);

                // --- ESTADO DE ÉXITO ---
                button.classList.add('copied');
                
                // Intercambiar iconos y texto
                if (copyIcon) copyIcon.style.display = 'none';
                if (checkIcon) checkIcon.style.display = 'inline-block';
                if (btnText) btnText.innerText = 'Copiado!';

                // 4. Restaurar estado original después de 2 seg
                setTimeout(() => {
                    button.classList.remove('copied');
                    if (copyIcon) copyIcon.style.display = 'inline-block';
                    if (checkIcon) checkIcon.style.display = 'none';
                    if (btnText) btnText.innerText = originalText;
                }, 2000);

            } catch (err) {
                console.error('Error al copiar:', err);
                
                // --- ESTADO DE ERROR ---
                button.classList.add('error');
                setTimeout(() => button.classList.remove('error'), 2000);
            }
        });
    });
});