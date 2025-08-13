class ImageCache {
  private cache = new Map<string, Promise<HTMLImageElement>>();
  private loadedImages = new Set<string>();

  async loadImage(src: string): Promise<HTMLImageElement> {
    if (this.loadedImages.has(src)) {
      // Return a resolved promise for already loaded images
      const img = new Image();
      img.src = src;
      return img;
    }

    if (this.cache.has(src)) {
      return this.cache.get(src)!;
    }

    const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.loadedImages.add(src);
        resolve(img);
      };
      
      img.onerror = () => {
        this.cache.delete(src); // Remove failed loads from cache
        reject(new Error(`Failed to load image: ${src}`));
      };

      // Add crossorigin attribute for external images
      if (src.includes('unsplash')) {
        img.crossOrigin = 'anonymous';
      }
      
      img.src = src;
    });

    this.cache.set(src, imagePromise);
    return imagePromise;
  }

  preloadImages(urls: string[]): Promise<HTMLImageElement[]> {
    const promises = urls.map(url => this.loadImage(url).catch(() => null));
    return Promise.all(promises).then(results => 
      results.filter((img): img is HTMLImageElement => img !== null)
    );
  }

  isImageCached(src: string): boolean {
    return this.loadedImages.has(src);
  }

  clearCache(): void {
    this.cache.clear();
    this.loadedImages.clear();
  }

  getCacheSize(): number {
    return this.cache.size;
  }
}

export const imageCache = new ImageCache();