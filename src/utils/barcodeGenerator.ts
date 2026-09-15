export function generateBarcodeSvgUri(text: string): string {
  // Generates simple clean SVG barcode lines for the tracking voucher
  const bars = Array.from(text).map((char, i) => {
    const code = char.charCodeAt(0);
    const width = (code % 3) + 1;
    return `<rect x="${i * 7}" y="0" width="${width}" height="40" fill="#0f172a" />`;
  }).join('');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${text.length * 7}" height="40" viewBox="0 0 ${text.length * 7} 40">${bars}</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
