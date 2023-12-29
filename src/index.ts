export class Throttler {
    private pending: Function | undefined;
    private timer: ReturnType<typeof setTimeout> | undefined;
    private handler: () => void;

    /**
     * @param timeout The delay for execution
     */
    constructor(private timeout: number) {
        this.handler = () => {
            if (this.pending !== undefined) {
                this.pending();
            }
        };
    }

    /**
     * Removes any current timed action and replaces it
     * Restarts the timer
     */
    reset(action: Function) {
        this.cancel();
        this.pending = action;
        this.setTimer();
    }

    /**
     * Sets the action but doesn't reset the timer if it already exists
     */
    push(action: Function) {
        this.pending = action;
        this.setTimer();
    }

    /**
     * Cancels the current timed action and calls this one instantly
     */
    exec(action: Function) {
        this.cancel();
        action();
    }

    /**
     * Cancels the current timed action
     */
    cancel() {
        if (this.timer === undefined) {
            return;
        }
        clearTimeout(this.timer);
        this.pending = undefined;
        this.timer = undefined;
    }

    private setTimer() {
        if (!this.timer) {
            this.timer = setTimeout(this.handler.bind(this), this.timeout);
        }
    }
}
