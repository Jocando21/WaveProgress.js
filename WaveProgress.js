class WaveProgress {
    constructor(divClass, options = {}) {
        this.container = document.querySelector(`.${divClass}`);

        if (!this.container) {
            console.error("Contenedor no encontrado.");
            return;
        }

        this.settings = Object.assign({
            width: 500,
            height: 200,
            goalAmount: 100,
            waterColor: ["#00aaff", "#004488"],
            gradientAngle: 0,
            opacity: 0.8,
            waveHeight: 6,
            waveSpeed: 0.02,
            counterFormat: "percentage",
            stepMode: "continuous",
            outlineColor: "#ffffff",
            outlineWidth: 2,
            borderRadius: 16,
            orientation: "up",
            inertiaStrength: 0.1
        }, options);

        if (this.settings.orientation === "up" || this.settings.orientation === "down") {
            this.container.style.width = `${this.settings.height}px`;
            this.container.style.height = `${this.settings.width}px`;
        } else {
            this.container.style.width = `${this.settings.width}px`;
            this.container.style.height = `${this.settings.height}px`;
        }

        this.container.style.position = `relative`;

        this.canvas = document.createElement("canvas");
        this.container.appendChild(this.canvas);

        this.canvas.width = this.settings.width;
        this.canvas.height = this.settings.height;

        this.canvas.style.position = "absolute";
        this.canvas.style.top = "50%";
        this.canvas.style.left = "50%";
        this.canvas.style.transform = "translate(-50%, -50%)";
        this.canvas.style.borderRadius = `${this.settings.borderRadius}px`;
        this.canvas.style.outline = `${this.settings.outlineWidth}px solid ${this.settings.outlineColor}`;

        this.ctx = this.canvas.getContext("2d");

        this.percentage = 0;
        this.xOffset = 0;
        this.targetOffset = 0;
        this.offsetPrev = 0;
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

        this.lastUpdateTime = 0;
        this.updateInterval = 50;

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

            const inertiaFactor = 1 - Math.pow(1 - this.moveCur / this.moveDur, this.settings.inertiaStrength);
            this.waveSpdCur = this.waveSpd + inertiaFactor * (this.waveSpd * 1.5 - this.waveSpd);

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

        let gradient = this.ctx.createLinearGradient(
            0, 0, 
            this.canvas.width * Math.cos(this.settings.gradientAngle * Math.PI / 180), 
            this.canvas.height * Math.sin(this.settings.gradientAngle * Math.PI / 180)
        );

        gradient.addColorStop(0, this.settings.waterColor[0]);
        gradient.addColorStop(1, this.settings.waterColor[1]);

        this.ctx.fillStyle = gradient;
        this.ctx.globalAlpha = this.settings.opacity;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.restore();

        if (this.move) {
            this.waveCurrent += this.waveSpdCur * 1.5;
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

        this.rotateCanvas();

        window.requestAnimationFrame(() => this.draw());
    }

    updateProgress(newPercentage) {
        if (performance.now() - this.lastUpdateTime < this.updateInterval) return;

        this.lastUpdateTime = performance.now();

        let currentPercentage = this.percentage;
        newPercentage = Math.max(0, Math.min(newPercentage, 100));

        if (newPercentage <= currentPercentage) return;

        const difference = newPercentage - currentPercentage;
        let increment = Math.max(1, Math.ceil(difference / 10));

        const interval = setInterval(() => {
            currentPercentage += increment;

            if (currentPercentage >= newPercentage) {
                currentPercentage = newPercentage;
                clearInterval(interval);
            }

            this.percentage = currentPercentage;
            this.targetOffset = this.calculateTargetOffset(currentPercentage);
            this.offsetPrev = this.xOffset;
            this.move = true;
            this.moveCur = 0;
            this.waveCur = 0;
            this.waveDown = false;

            if (this.settings.counterFormat === "percentage" && this.counterElement && this.settings.counterFormat !== "none") {
                this.counterElement.textContent = Math.round(currentPercentage) + "%";
            }
        }, this.settings.stepDuration);
    }

    calculateTargetOffset(percentage) {
        return ((percentage / 100) * (this.canvas.width + 16)) - 8;
    }

    changeProgress(amount) {
        this.updateProgress(Math.min(100, Math.max(0, this.percentage + amount)));
    }

    resetProgress() {
        this.updateProgress(0);
    }

    lerp(a, b, t) {
        return a + t * (b - a);
    }

    rotateCanvas() {
        switch (this.settings.orientation) {
            case "right":
                this.canvas.style.transform = "translate(-50%, -50%) rotate(0deg)";
                break;
            case "left":
                this.canvas.style.transform = "translate(-50%, -50%) rotate(180deg)";
                break;
            case "up":
                this.canvas.style.transform = "translate(-50%, -50%) rotate(90deg)";
                break;
            case "down":
                this.canvas.style.transform = "translate(-50%, -50%) rotate(-90deg)";
                break;
        }
    }
}