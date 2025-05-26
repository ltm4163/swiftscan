// Runs automatically on every page the user visits
(async function scanPage() {
    // Grab all <p> tags
    const paragraphs = Array.from(document.querySelectorAll("p"));
  
    for (const p of paragraphs) {
      const text = p.innerText.trim();
      if (!text) continue; // skip empty lines
  
      // call our local detector (defined in §3)
      try {
        const res = await fetch("http://127.0.0.1:5000/detect_text", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text })
        });
        const { probability } = await res.json(); // 0-1 float
  
        if (probability > 0.70) {
          p.style.backgroundColor = "rgba(255,0,0,0.25)";
          p.style.transition = "background-color 0.3s ease";
          p.title = `⚠️ ${Math.round(probability * 100)} % chance AI-generated`;
        }
      } catch (err) {
        console.error("Detector API error:", err);
      }
    }
  })();