class Debounce {
  enableCB: boolean = true;
  cb: Function;
  ms: number;
  timeout: ReturnType<typeof setTimeout> | null = null;

  constructor(cb: Function, ms: number) {
    this.cb = cb;
    this.ms = ms;
  }

  call() {
    if(this.enableCB) {
      this.cb();
      this.enableCB = false;
      this.timeout = setTimeout(() => {this.enableCB = true}, this.ms)
    } else {
      if(this.timeout) {
        clearTimeout(this.timeout);
      }

      this.timeout = setTimeout(() => {this.enableCB = true}, this.ms)
    }
  }
}

export default Debounce;