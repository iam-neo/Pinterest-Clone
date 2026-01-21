# Pinterest-Style React Gallery

A premium, responsive masonry image gallery built with React and Vite. This project mimics the aesthetics and functionality of Pinterest, sourcing images directly from the local `public/images` directory.

## 📚 Documentation
**Full documentation is available locally.**
Open `Documentation/index.html` in your browser to view the comprehensive guide on:
- Managing images
- Code structure
- Deployment steps
- Customization

## ✨ Features

- **Masonry Layout**: True pinterest-style vertical staggering using a custom hook.
- **Responsive Design**: 
    - **Mobile**: Optimised 2-column layout (Pinterest style).
    - **Desktop**: Adapts up to 5 columns.
- **Local Image Sourcing**: Automatically indexes images from the `public/images` folder.
- **Premium UI**: 
  - Clean grid view (no text clutter).
  - Interactive modal with full metadata (Title, Description, User).
  - Smooth hover effects and animations.
- **Search Filtering**: Filter images by tags or titles in real-time.

## 🛠️ Project Structure

- `public/images/`: Store your raw image files here.
- `src/utils/customImages.js`: Configuration file mapping public images to the gallery state.
- `src/components/`: Reusable UI components (Header, MasonryGrid, ImageCard, Modal).
- `Documentation/`: Standalone HTML documentation site.

## 🚀 Detailed Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Run the development server**:
    ```bash
    npm run dev
    ```

3.  **Build for production**:
    ```bash
    npm run build
    ```

## 🌍 Netlify Deployment

This project is optimized for Netlify.

- **Build Command**: `npm run build`
- **Publish Directory**: `dist`

### Troubleshooting
If you see a "Page Not Found" or blank screen:
1.  Ensure you are deploying the `dist` folder, not `public` or `src`.
2.  The `netlify.toml` and `public/_redirects` files handle routing.
3.  If dragging & dropping manually, run `npm run build` locally first, then drag the **`dist`** folder to Netlify.

## 💻 Technologies

- React 18
- Vite
- CSS Modules / Vanilla CSS
- React Icons

---

