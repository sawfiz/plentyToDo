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
        helpEl.appendChild(clon);
    }

    function hideHelp() {
        helpEl.innerText = '▹ Help'
        show = false;
    }

    return {toggleHelp}
})();

export default help;