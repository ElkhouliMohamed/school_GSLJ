import imageCompression from 'browser-image-compression';

/**
 * Compresses an image file.
 * 
 * @param {File} file - The original image file.
 * @param {Object} options - Compression options.
 * @returns {Promise<File>} - The compressed image file.
 */
export const compressImage = async (file, options = {}) => {
    const defaultOptions = {
        maxSizeMB: 1,          // Max size in MB
        maxWidthOrHeight: 1920, // Max width/height
        useWebWorker: true,
        fileType: file.type,    // Preserve original file type
        initialQuality: 0.8,    // Start with 80% quality
        ...options
    };

    try {
        if (!file.type.startsWith('image/')) {
            return file; // Return original if not an image
        }

        console.log(`Original size: ${(file.size / 1024 / 1024).toFixed(2)} MB`);
        const compressedFile = await imageCompression(file, defaultOptions);
        console.log(`Compressed size: ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`);

        return compressedFile;
    } catch (error) {
        console.error('Image compression failed:', error);
        return file; // Fallback to original
    }
};
