# **WaveProgress.js**  

## **Description**  
`WaveProgress.js` is a modular library for creating progress bars with a liquid wave effect in a `<canvas>`. It offers customization options like colors, wave height, speed, and opacity, allowing you to create smooth and dynamic liquid-like progress indicators.

---
[DEMO PAGE](https://jocando21.github.io/WaveProgress/)
---

## **Usage**  

### **1. Include the script**  
Add `waveProgress.js` to your project:  

```html
<script src="waveProgress.js"></script>
```

### **2. Add a `<canvas>` in the HTML**  
```html
<canvas id="myCanvas"></canvas>
<p id="counter">0%</p>
```

### **3. Initialize the progress bar**  
```javascript
const progressBar = new WaveProgress("myCanvas", {
    width: 300,
    height: 100,
    goalAmount: 100,
    waterColor: ["#00aaff", "#004488"],
    opacity: 0.8,
    waveHeight: 6,
    waveSpeed: 0.02,
    counterFormat: "percentage"
});
```

---

## **Customization Options**  

| Option         | Type    | Description |
|---------------|--------|-------------|
| `width`       | `Number` | Canvas width. |
| `height`      | `Number` | Canvas height. |
| `goalAmount`  | `Number` | Target progress value (e.g., 100). |
| `waterColor`  | `Array`  | Wave colors in `["#color1", "#color2"]` format. |
| `opacity`     | `Number` | Wave opacity (0 to 1). |
| `waveHeight`  | `Number` | Wave height in pixels. |
| `waveSpeed`   | `Number` | Wave animation speed. |
| `counterFormat` | `String` | Counter format (currently only `"percentage"`). |

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

## **Complete Example**  

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Wave Progress Bar</title>
    <script src="waveProgress.js" defer></script>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            background-color: #111;
            color: white;
            font-family: Arial, sans-serif;
        }
        canvas {
            border: 2px solid white;
            display: block;
            transition: clip-path 0.5s ease-in-out;
        }
        .controls {
            margin-top: 10px;
            display: flex;
            gap: 10px;
        }
        button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            font-size: 16px;
            border-radius: 5px;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

    <canvas id="myCanvas"></canvas>
    <p id="counter">0%</p>
    <div class="controls">
        <button onclick="progressBar.changeProgress(-10)">-10%</button>
        <button onclick="progressBar.changeProgress(10)">+10%</button>
        <button onclick="progressBar.resetProgress()">Reset</button>
    </div>

    <script>
        const progressBar = new WaveProgress("myCanvas", {
            width: 300,
            height: 100,
            goalAmount: 100,
            waterColor: ["#00aaff", "#004488"],
            opacity: 0.8,
            waveHeight: 6,
            waveSpeed: 0.02,
            counterFormat: "percentage"
        });
    </script>

</body>
</html>
```

---

This provides a fully customizable animated wave progress bar that is easy to use. 🚀

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact

You can follow me on Twitter: [@Jocando_](https://x.com/Jocando_)
