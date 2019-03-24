let rightPage = document.querySelector('button[id="submit"]') ? true : false;

function handleButton(button) {
    const wrapperElement = document.createElement('div');
    wrapperElement.style.display = 'inline-block';
    button.parentElement.replaceChild(wrapperElement, button);
    wrapperElement.append(button);
    wrapperElement.addEventListener('click', event => {
        if(!confirm('Vuoi veramente inviare le risposte?')) {
            event.preventDefault();
            event.stopPropagation();
        }
    });
}

function domChanged() {
    const button = document.querySelector('button[id="submit"]');
    if(button && !rightPage) {
        console.log('button#submit detected');
        handleButton(button);
        rightPage = true;
        
    }
    else if(!button && rightPage) {
        console.log('button#submit stopped to be detected');
        rightPage = false;
    }
}

const observer = new MutationObserver(domChanged);
observer.observe(document.body, { subtree: true, attributes: true, characterData: true, childList: true });