class SaveYourAss {

    private buttonExists = document.querySelector('button[id="submit"]') ? true : false;
    private observer: MutationObserver;

    private getButton(): HTMLButtonElement {
        return document.querySelector('button[id="submit"]')
    }

    private initWrapper(wrapper: HTMLDivElement): void {
        wrapper.style.display = 'inline-block';
        wrapper.addEventListener('click', event => {
            if (!confirm('Vuoi veramente inviare le risposte?')) {
                event.preventDefault();
                event.stopPropagation();
            }
        });
    }

    private replaceButton(button: HTMLButtonElement, wrapper: HTMLDivElement): void {
        button.parentElement.replaceChild(wrapper, button);
        wrapper.append(button);
    }

    private handleButton(button: HTMLButtonElement): void {
        const wrapper = document.createElement('div');
        this.initWrapper(wrapper);
        this.replaceButton(button, wrapper);
    }

    domChanged = () => {
        const button = this.getButton();
        if (button && !this.buttonExists) {
            console.log('button#submit detected');
            this.handleButton(button);
            this.buttonExists = true;
        }
        else if (!button && this.buttonExists) {
            console.log('button#submit stopped to be detected');
            this.buttonExists = false;
        }
    }

    constructor() {
        this.observer = new MutationObserver(this.domChanged);
    }

    start(): void {
        if(this.observer)
            this.observer.observe(document.body, { subtree: true, attributes: true, characterData: true, childList: true });
    }

    stop(): void {
        if(this.observer)
            this.observer.disconnect();
    }

}

const saveYourAss = new SaveYourAss();
saveYourAss.start();

