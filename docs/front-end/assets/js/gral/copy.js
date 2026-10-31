document.addEventListener('DOMContentLoaded', () => {
    const toggleUI = (btn, copyIcon, checkIcon, btnText, isCopied, text) => {
        btn.classList.toggle('copied', isCopied);
        if (copyIcon) copyIcon.style.display = isCopied ? 'none' : 'inline-block';
        if (checkIcon) checkIcon.style.display = isCopied ? 'inline-block' : 'none';
        if (btnText) btnText.innerText = text;
    };

    document.querySelectorAll('.btn-copy').forEach(button => {
        button.addEventListener('click', async () => {
            const codeEl = button.closest('.code-box')?.querySelector('code');
            if (!codeEl) return;

            const copyIcon = button.querySelector('.copy-icon');
            const checkIcon = button.querySelector('.check-icon');
            const btnText = button.querySelector('span');
            const originalText = button.dataset.origText || (btnText ? btnText.innerText : 'Copiar');
            button.dataset.origText = originalText;

            clearTimeout(button._copyTimer);

            try {
                await navigator.clipboard.writeText(codeEl.innerText);
                toggleUI(button, copyIcon, checkIcon, btnText, true, 'Copiado!');

                button._copyTimer = setTimeout(() => {
                    toggleUI(button, copyIcon, checkIcon, btnText, false, originalText);
                }, 2000);
            } catch (err) {
                console.error('Error al copiar:', err);
                button.classList.add('error');
                button._copyTimer = setTimeout(() => button.classList.remove('error'), 2000);
            }
        });
    });
});