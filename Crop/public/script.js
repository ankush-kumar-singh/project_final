const uploadInput = document.getElementById("imageUpload");
const analyzeBtn = document.getElementById("analyzeBtn");
const previewImg = document.getElementById("previewImg");
const predictionText = document.getElementById("prediction");
const loadingSpinner = document.getElementById("loadingSpinner");

const loadImageBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

uploadInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) {
    previewImg.src = URL.createObjectURL(file);
    previewImg.classList.remove("d-none");
  }
});

analyzeBtn.addEventListener("click", async () => {
  const file = uploadInput.files[0];
  if (!file) {
    alert("Please upload a crop image first!");
    return;
  }

  predictionText.textContent = "Analyzing... please wait.";
  loadingSpinner.classList.remove("d-none");

  const base64Image = await loadImageBase64(file);

  try {
    const response = await fetch("http://localhost:5000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64Image }),
    });

    const result = await response.json();

    loadingSpinner.classList.add("d-none");

    if (result.predictions && result.predictions.length > 0) {
      const pred = result.predictions[0];
      predictionText.textContent = `Detected: ${pred.class} (Confidence: ${(pred.confidence * 100).toFixed(1)}%)`;
      predictionText.classList.remove("text-muted");
      predictionText.classList.add("text-success");
    } else {
      predictionText.textContent = "No disease detected or unclear image.";
      predictionText.classList.add("text-danger");
    }
  } catch (err) {
    loadingSpinner.classList.add("d-none");
    predictionText.textContent = "⚠️ Error analyzing image.";
    predictionText.classList.add("text-danger");
    console.error(err);
  }
});
