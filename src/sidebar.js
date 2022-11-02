const help = (() => {
    const helpEl = document.querySelector('.help');
    let show = false;
    
    function toggleHelp() {
        helpEl.addEventListener('click', () => {
            if (show === false) {
                showHelp();
                show = true;
            } else {
                hideHelp();
            }
        });
    }
    
    function showHelp() {
        const helpContent = document.getElementsByTagName('template')[0];
        const clon = helpContent.content.cloneNode(true);
        helpEl.classList.remove('mdi', 'mdi-chevron-right')
        helpEl.classList.add('mdi', 'mdi-chevron-down')
        helpEl.innerText = 'Help'
        helpEl.appendChild(clon);
    }
    
    function hideHelp() {
        helpEl.classList.remove('mdi', 'mdi-chevron-down')
        helpEl.classList.add('mdi', 'mdi-chevron-right')
        helpEl.innerText = 'Help'
        show = false;
    }

    return {toggleHelp}
})();

export default help;