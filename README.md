# **WaveProgress.js**

## **Description**  
**WaveProgress.js** is a modular library for creating progress bars with a liquid wave using canvas. It offers customization options like colors, wave height, speed, opacity, outline, border radius, gradient direction, and more, allowing you to create smooth and dynamic liquid-like progress indicators.

---
[DEMO](https://jocando21.github.io/WaveProgress.js/)
---

## **Usage**  

### **1. Include the script**  
Add `waveProgress.js` to your project:  

**FILE**
```html
<script src="waveProgress.js"></script>
```
**CDN**
```html
<script src="https://cdn.jsdelivr.net/gh/Jocando21/WaveProgress.js@v1.0.0/WaveProgress.js"></script>
```
```html
<script src="https://cdn.jsdelivr.net/gh/Jocando21/WaveProgress.js@v1.0.0/WaveProgress.min.js"></script>
```

### **2. Add a `<div>` in the HTML**  
```html
<div class="bar"></div>
<p id="counter">0%</p>
```

### **3. Initialize the progress bar**  
```javascript
window.progressBar = new WaveProgress("bar", {
    width: 600,
    height: 32,
    goalAmount: 100,
    waterColor: ["#7549BC", "#5E2C8F", "#7549BC"],
    gradientAngle: 90,
    opacity: 0.8,
    waveHeight: 6,
    waveSpeed: 0.02,
    counterFormat: "percentage",
    outlineColor: "#ffffff",
    outlineWidth: 2,
    borderRadius: 16,
    orientation: "right",
    inertiaStrength: 0.1
});
```

---

## **Customization Options**   

| Option          | Type    | Description |
|-----------------|---------|-------------|
| `width`         | `Number` | Canvas width (default: `600`). |
| `height`        | `Number` | Canvas height (default: `32`). |
| `goalAmount`    | `Number` | Target progress value (default: `100`). |
| `waterColor`    | `Array`  | Wave colors in `["#color1", "#color2", "#color3"]` format (default: `["#7549BC", "#5E2C8F", "#7549BC"]`). |
| `gradientAngle` | `Number` | Angle for the gradient (in degrees, default: `90`). |
| `opacity`       | `Number` | Wave opacity (0 to 1, default: `0.8`). |
| `waveHeight`    | `Number` | Wave height in pixels (default: `6`). |
| `waveSpeed`     | `Number` | Wave animation speed (default: `0.02`). |
| `counterFormat` | `String` | Counter format (currently only `"percentage"`). |
| `outlineColor`  | `String` | Outline color (default: `"#ffffff"`). |
| `outlineWidth`  | `Number` | Outline width in pixels (default: `2`). |
| `borderRadius`  | `Number` | Border radius in pixels (default: `16`). |
| `orientation`   | `String` | Direction of the progress (`"up"`, `"down"`, `"left"`, `"right"`, default: `"right"`). |
| `inertiaStrength` | `Number` | Strength of the inertia effect (default: `0.1`). |

---

## **Available Methods**  

### **1. `updateProgress(percentage)`**  
Sets the progress to a specific value (0 to 100).  

```javascript
progressBar.updateProgress(50); // Sets progress to 50%
```

### **2. `changeProgress(amount)`**  
Increases or decreases progress by a given amount.  

```javascript
progressBar.changeProgress(10); // Adds 10% progress
progressBar.changeProgress(-10); // Subtracts 10% progress
```

### **3. `resetProgress()`**  
Resets progress to 0%.  

```javascript
progressBar.resetProgress();
```

---

This provides a fully customizable animated wave progress bar that is easy to use. 🚀

## License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/Jocando21/WaveProgress/blob/main/licence) file for more details.
## Contact

You can follow me on Twitter: [@Jocando_](https://x.com/Jocando_)
