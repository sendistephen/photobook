import { useEffect } from 'react';

interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  imageLoadTime: number;
}

export const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.entryType === 'measure') {
          console.log(`${componentName} - ${entry.name}: ${entry.duration}ms`);
        }
      });
    });

    observer.observe({ entryTypes: ['measure', 'navigation', 'paint'] });

    // Measure component mount time
    performance.mark(`${componentName}-mount-start`);

    return () => {
      const endTime = performance.now();
      performance.mark(`${componentName}-mount-end`);
      performance.measure(
        `${componentName}-mount-duration`,
        `${componentName}-mount-start`,
        `${componentName}-mount-end`
      );
      
      console.log(`${componentName} total mount time: ${endTime - startTime}ms`);
      observer.disconnect();
    };
  }, [componentName]);

  const measureImageLoad = (imageSrc: string) => {
    const startTime = performance.now();
    const img = new Image();
    
    img.onload = () => {
      const loadTime = performance.now() - startTime;
      console.log(`Image load time for ${imageSrc}: ${loadTime}ms`);
    };
    
    img.onerror = () => {
      console.log(`Failed to load image: ${imageSrc}`);
    };
    
    img.src = imageSrc;
  };

  return { measureImageLoad };
};

export const logWebVitals = () => {
  if ('web-vitals' in window) {
    // This would require installing web-vitals package
    // For now, we'll use basic performance APIs
    const paintEntries = performance.getEntriesByType('paint');
    paintEntries.forEach((entry) => {
      console.log(`${entry.name}: ${entry.startTime}ms`);
    });
  }
};