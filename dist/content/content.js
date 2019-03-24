var SaveYourAss = /** @class */ (function () {
    function SaveYourAss() {
        var _this = this;
        this.buttonExists = document.querySelector('button[id="submit"]') ? true : false;
        this.domChanged = function () {
            var button = _this.getButton();
            if (button && !_this.buttonExists) {
                console.log('button#submit detected');
                _this.handleButton(button);
                _this.buttonExists = true;
            }
            else if (!button && _this.buttonExists) {
                console.log('button#submit stopped to be detected');
                _this.buttonExists = false;
            }
        };
        this.observer = new MutationObserver(this.domChanged);
    }
    SaveYourAss.prototype.getButton = function () {
        return document.querySelector('button[id="submit"]');
    };
    SaveYourAss.prototype.initWrapper = function (wrapper) {
        wrapper.style.display = 'inline-block';
        wrapper.addEventListener('click', function (event) {
            if (!confirm('Vuoi veramente inviare le risposte?')) {
                event.preventDefault();
                event.stopPropagation();
            }
        });
    };
    SaveYourAss.prototype.replaceButton = function (button, wrapper) {
        button.parentElement.replaceChild(wrapper, button);
        wrapper.append(button);
    };
    SaveYourAss.prototype.handleButton = function (button) {
        var wrapper = document.createElement('div');
        this.initWrapper(wrapper);
        this.replaceButton(button, wrapper);
    };
    SaveYourAss.prototype.start = function () {
        if (this.observer)
            this.observer.observe(document.body, { subtree: true, attributes: true, characterData: true, childList: true });
    };
    SaveYourAss.prototype.stop = function () {
        if (this.observer)
            this.observer.disconnect();
    };
    return SaveYourAss;
}());
var saveYourAss = new SaveYourAss();
saveYourAss.start();
