

export class Timer {
    timerId; start; remaining;

    constructor(callback, delay) {
        this.callback = callback;
        this.remaining = delay

        this.resume()
    }


    pause() {
        window.clearTimeout(this.timerId);
        this.timerId = null;
        this.remaining -= Date.now() - this.start;
    };

    resume() {
        if (this.timerId) {
            return;
        }

        this.start = Date.now();
        this.timerId = window.setTimeout(this.callback, this.remaining);
    };
}
