class WaveProgress {
    constructor(canvasId, options = {}) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        this.settings = Object.assign({
            width: 300,
            height: 100,
            goalAmount: 100,
            waterColor: ["#00aaff", "#004488"],
            opacity: 0.8,
            waveHeight: 6,
            waveSpeed: 0.02,
            counterFormat: "percentage"
        }, options);

        this.canvas.width = this.settings.width;
        this.canvas.height = this.settings.height;

        this.percentage = 0;
        this.xOffset = this.canvas.width * 0.5;
        this.targetOffset = this.xOffset;
        this.offsetPrev = this.xOffset;
        this.move = false;
        this.moveCur = 0;
        this.moveDur = 50;

        this.waveCurrent = this.canvas.width * 0.5;
        this.waveSpd = this.settings.waveSpeed;
        this.waveSpdCur = this.waveSpd;
        this.waveDur = 80;
        this.waveCur = 0;
        this.waveDown = false;

        this.amp = this.settings.waveHeight;
        this.freq = 0.020;

        this.counterElement = document.getElementById("counter");

        this.init();
    }

    init() {
        this.updateProgress(0);
        window.requestAnimationFrame(() => this.draw());
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();

        this.ctx.beginPath();
        this.ctx.lineWidth = 5;

        if (this.move) {
            let step = this.moveCur / this.moveDur;
            step = 1 - Math.pow(1 - step, 3);
            this.xOffset = this.lerp(this.offsetPrev, this.targetOffset, step);
            this.moveCur += 1;
            if (this.xOffset === this.targetOffset) this.move = false;
        }

        let x = this.amp * Math.sin(this.canvas.height * this.freq + this.waveCurrent);
        this.ctx.moveTo(this.xOffset + x, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.lineTo(0, 0);
        x = this.amp * Math.sin(this.waveCurrent);
        this.ctx.lineTo(this.xOffset + x, 0);

        for (let i = 0; i <= this.canvas.height; i++) {
            x = this.amp * Math.sin(i * this.freq + this.waveCurrent);
            this.ctx.lineTo(this.xOffset + x, i);
        }
        this.ctx.clip();

        let gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, this.settings.waterColor[0]);
        gradient.addColorStop(1, this.settings.waterColor[1]);

        this.ctx.fillStyle = gradient;
        this.ctx.globalAlpha = this.settings.opacity;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.restore();

        if (this.move) {
            this.waveCurrent += this.waveSpd * 1.5;
            this.waveDown = true;
        } else if (this.waveDown) {
            let step = this.waveCur / this.waveDur;
            this.waveSpdCur = this.lerp(this.waveSpd * 1.5, this.waveSpd, step);
            this.waveCur += 1;
            this.waveCurrent += this.waveSpdCur;
            if (this.waveSpdCur === this.waveSpd) this.waveDown = false;
        } else {
            this.waveCurrent += this.waveSpd;
        }

        window.requestAnimationFrame(() => this.draw());
    }

    updateProgress(percentage) {
        this.percentage = Math.max(0, Math.min(percentage, 100));

        if (this.percentage === 0) {
            this.canvas.style.clipPath = "inset(100% 0 0 0)";
        } else {
            this.canvas.style.clipPath = "inset(0 0 0 0)";
        }

        this.targetOffset = (this.percentage / 100) * (this.canvas.width - this.amp) + 8;
        this.offsetPrev = this.xOffset;
        this.move = true;
        this.moveCur = 0;
        this.waveCur = 0;
        this.waveDown = false;

        if (this.counterElement) {
            this.counterElement.textContent = this.percentage + "%";
        }
    }

    changeProgress(amount) {
        this.updateProgress(this.percentage + amount);
    }

    resetProgress() {
        this.updateProgress(0);
    }

    lerp(a, b, t) {
        return a + t * (b - a);
    }
}