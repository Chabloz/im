// Minimalist game loop
export default class {

  constructor({panic = true, panicThreshold = 1000/15, panicCallback = () => false, update = t => true, draw = t => true} = {}) {
    this.loop = null;
    this.panic = panic;
    this.panicThreshold = panicThreshold;
    this.panicCallback = panicCallback;
    this.update = update;
    this.draw = draw;
    this.elapsedTime = 0;
    this.lastDelta = 0;
    this.timers = new Map();
    this.timersInterval = new Map();
  }

  start() {
    this.loop = requestAnimationFrame(now => {
      this.lastTickTime = now;
      this._tick(now);
    });
  }

  stop() {
    cancelAnimationFrame(this.loop);
    this.loop = null;
  }

  toggle() {
    this.isRunning() ? this.stop() : this.start();
  }

  isRunning() {
    return this.loop != null;
  }

  getElapsedTime() {
    return this.elapsedTime;
  }

  setTimeout(timeout, callback) {
    let relTime = this.elapsedTime + timeout;
    this.timers.set(callback, relTime);
  }

  setInterval(timeout, callback) {
    let internallCallback = (missedBy) => {
      callback(missedBy);
      this.setTimeout(timeout-missedBy, missedBy => internallCallback(missedBy));
    };
    this.setTimeout(timeout, internallCallback);
  }

  _tick(now) {
    this.loop = requestAnimationFrame(now => this._tick(now));
    let deltaTime = now - this.lastTickTime;
    this.lastTickTime = now;
    if (this.panic && deltaTime > this.panicThreshold && !this.panicCallback()) return;
    this.elapsedTime += deltaTime;
    // check timers
    for (const [callback, relTime] of this.timers) {
      if (relTime <= this.elapsedTime) {
        callback(relTime - this.elapsedTime);
        this.timers.delete(callback);
      }
    }
    this.update(deltaTime, this.elapsedTime, this.lastDelta);
    this.draw(deltaTime, this.elapsedTime, this.lastDelta);
    this.lastDelta = deltaTime;
  }

}
