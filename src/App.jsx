import { useState } from 'react'
import Header from './components/Header'
import MasonryGrid from './components/MasonryGrid'
import LightboxModal from './components/Modal'

import { customImages } from './utils/customImages'

function App() {
    // Use only custom images from the public/images folder
    const [images] = useState(customImages)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedImage, setSelectedImage] = useState(null)

    const filteredImages = images.filter(img =>
        img.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        img.user.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="app-container">
            <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

            <main className="main-content">
                <MasonryGrid
                    items={filteredImages}
                    onImageClick={setSelectedImage}
                />
            </main>

            {selectedImage && (
                <LightboxModal
                    image={selectedImage}
                    onClose={() => setSelectedImage(null)}
                />
            )}
        </div>
    )
}

export default App
