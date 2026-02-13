# Face Verification Setup Guide

## Step 1: Download Face-api.js Models

Face-api.js ko kaam karne ke liye models download karni padti hain.

### Option A: Direct Download (Recommended)

1. Ye GitHub repository se models download karein:
   https://github.com/justadudewhohacks/face-api.js-models

2. `weights` folder ko download karein

3. `public/models` folder mein ye files copy karein:
   - `tiny_face_detector_model-weights_manifest.json`
   - `tiny_face_detector_model-shard1`
   - `face_landmark_68_model-weights_manifest.json`
   - `face_landmark_68_model-shard1`
   - `face_recognition_model-weights_manifest.json`
   - `face_recognition_model-shard1`

### Option B: Using Git (If you have Git installed)

```bash
cd public
git clone https://github.com/justadudewhohacks/face-api.js-models.git
mv face-api.js-models/models/* models/
rm -rf face-api.js-models
```

### Option C: Manual Download Links

Download these files and place in `public/models/`:

1. **Tiny Face Detector:**
   - https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/models/tiny_face_detector_model-weights_manifest.json
   - https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/models/tiny_face_detector_model-shard1

2. **Face Landmarks 68:**
   - https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/models/face_landmark_68_model-weights_manifest.json
   - https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/models/face_landmark_68_model-shard1

3. **Face Recognition:**
   - https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/models/face_recognition_model-weights_manifest.json
   - https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/models/face_recognition_model-shard1

## Step 2: Verify Models Folder Structure

After downloading, your `public/models/` folder should look like:

```
public/
└── models/
    ├── tiny_face_detector_model-weights_manifest.json
    ├── tiny_face_detector_model-shard1
    ├── face_landmark_68_model-weights_manifest.json
    ├── face_landmark_68_model-shard1
    ├── face_recognition_model-weights_manifest.json
    └── face_recognition_model-shard1
```

## Step 3: Test Face Verification

1. Start dev server: `npm run dev`
2. Login page par face verification test karein
3. Camera permission allow karein
4. Face detect hoga automatically
5. "Capture Selfie" button click karein

## Important Notes

- **HTTPS Required:** Production mein HTTPS chahiye camera access ke liye
- **Browser Support:** Chrome, Firefox, Safari, Edge (modern browsers)
- **Privacy:** Sab processing browser mein hoti hai, data server par nahi jata
- **Performance:** Models load hone mein 2-5 seconds lag sakte hain

## Troubleshooting

### Models load nahi ho rahi?
- Check `public/models/` folder mein files hain ya nahi
- Browser console mein error check karein
- File names exact match karni chahiye

### Camera access nahi mil raha?
- Browser settings mein camera permission check karein
- HTTPS use karein (localhost works without HTTPS)
- Browser console mein error check karein

### Face detect nahi ho raha?
- Lighting check karein (good lighting chahiye)
- Face camera ke center mein hona chahiye
- Background clear hona chahiye
