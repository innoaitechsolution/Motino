import html2canvas from 'html2canvas';

const EXPORT_WIDTH = 1080;
const EXPORT_HEIGHT = 1920;

/**
 * Renders the given element to a PNG and triggers a browser download.
 * @param {HTMLElement} element — root of the quote card (fixed story dimensions)
 * @returns {Promise<void>}
 */
export async function downloadQuoteCardPng(element) {
  if (typeof document === 'undefined') return;

  await document.fonts.ready;

  const canvas = await html2canvas(element, {
    width: EXPORT_WIDTH,
    height: EXPORT_HEIGHT,
    scale: 1,
    useCORS: true,
    logging: false,
    scrollX: 0,
    scrollY: 0,
    windowWidth: EXPORT_WIDTH,
    windowHeight: EXPORT_HEIGHT,
  });

  await new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Could not create image'));
          return;
        }
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'motino-quote-card.png';
        a.rel = 'noopener';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
        resolve();
      },
      'image/png',
      1
    );
  });
}
