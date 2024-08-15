class Keyboard {
    LEFT = false;
    RIGHT = false;
    UP = false;
    SPACE = false;
    D = false;

    /**
     * This function is used to add events to the mobile buttons.
     */
    mobileBtnsPressEvents() {
        this.btnLeft();
        this.btnRight();
        this.btnJump();
        this.btnThrow();
    }

    /** 
     * This function is used to add events for the left button on mobile devices.
     */
    btnLeft() {
        document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.LEFT = true;
        });
        document.getElementById('btnLeft').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.LEFT = false;
        });
    }

    /**
     * This function is used to add events for the right button on mobile devices.
     */
    btnRight() {
        document.getElementById('btnRight').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.RIGHT = true;
        });
        document.getElementById('btnRight').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.RIGHT = false;
        });
    }

    /**
     * This function is used to add events for the jump button on mobile devices.
     */
    btnJump() {
        document.getElementById('btnJump').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.SPACE = true;
        });
        document.getElementById('btnJump').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.SPACE = false;
        });
    }

    /**
     * This function is used to add events for the throw button on mobile devices.
     */
    btnThrow() {
        document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.D = true;
        });
        document.getElementById('btnThrow').addEventListener('touchend', (e) => {
            e.preventDefault();
            this.D = false;
        });
    }
}