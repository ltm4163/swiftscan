# 📰 SwiftScan – Generative-AI News Detector  
*Lightweight browser extension + local API that flags paragraphs likely written by an LLM*

---

## 1 . What SwiftScan does
| Layer | Purpose |
|-------|---------|
| **Chrome / Edge extension** | Injects a *content script* into every page, splits visible text into paragraphs, sends each paragraph to a local REST endpoint (`/predict`), then overlays a yellow–red highlight if the AI probability ≥ **0.60**. |
| **Local FastAPI server** | Loads a **fine‑tuned DistilBERT** classifier (directory `model/`) and returns a probability *P(AI)* for each request in < 30 ms on CPU. |
| **Data/Training utilities** | `util/data.py` → scrapes real‑world news, `util/ai_data.py` → generates GPT‑4o news, `train.py` (upcoming) fine‑tunes DistilBERT. |

---

## 2 . Model at a glance
| Item | Value |
|------|-------|
| Base model | `distilbert-base-uncased` |
| Fine‑tuned on | ~10 k balanced news chunks (AI vs real) |
| Sequence length | 256 tokens |
| Metric (F1) | ≈ 0.88 |
| Files | `model/config.json`, `pytorch_model.bin`, `tokenizer.json` (≈ 45 MB INT8) |

---

## 3 . Quick‑start
```bash
git clone https://github.com/yourname/swiftscan.git
cd swiftscan
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python server.py        # launches API on http://127.0.0.1:5000
```
Load the **extension/** folder in `chrome://extensions` (Developer mode → Load unpacked).

---

## 4 . Configuration knobs
| File | Variable | Meaning | Default |
|------|----------|---------|---------|
| `server.py` | `THRESHOLD` | highlight if prob ≥ | 0.60 |
| `content.js` | `DETECTOR_ENDPOINT` | REST target | `http://127.0.0.1:5000/predict` |

---

## 5 . Data / retraining scripts
| Task | Script |
|------|--------|
| Scrape real news | `util/data.py` |
| Generate AI news | `util/ai_data.py` |
| Fine‑tune model | `train.py` (upcoming) |

---

## 6 . Road‑map
- Bespoke news model
- Popup dashboard
- Image AI detection
- Optional cloud API

---

## 7 . Troubleshooting
| Symptom | Fix |
|---------|-----|
| `OPTIONS /predict 405` | CORS middleware missing |
| `ERR_CONNECTION_REFUSED` | server not running |
| Slow pages | adjust limits in `util/data.py` |

---

© 2025 SwiftScan Project – MIT License
