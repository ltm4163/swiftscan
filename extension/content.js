// Runs automatically on every page the user visits
// Endpoint of local AI‑detector REST API
const DETECTOR_ENDPOINT = "http://127.0.0.1:5000/predict"; // matches server.py
(async function scanPage() {
    // Grab all <p> tags
    const paragraphs = Array.from(document.querySelectorAll("p"));
  
    for (const p of paragraphs) {
      const text = p.innerText.trim();
      if (!text) continue; // skip empty lines
  
      // call our local detector (defined in §3)
      try {
        const res = await fetch(DETECTOR_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text })
        });
        const { probability } = await res.json(); // 0-1 float
  
        if (probability > 0.50) {
          p.style.backgroundColor = "rgba(255,0,0,0.25)";
          p.style.transition = "background-color 0.3s ease";
          p.title = `⚠️ ${Math.round(probability * 100)} % chance AI-generated`;
        }
      } catch (err) {
        console.error("Detector API error:", err);
      }
    }
  })();