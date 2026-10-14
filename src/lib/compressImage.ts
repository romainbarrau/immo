// Shrinks property photos before upload so the Supabase storage stays small
// (originals straight from a camera are often 3-20 MB).
const MAX_SIZE = 2400;
const QUALITY = 0.85;

export async function compressImage(file: File): Promise<File> {
  // Leave non-photo formats (svg, gif...) untouched
  if (!/^image\/(jpeg|png|webp|heic|heif)$/i.test(file.type)) return file;

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
    const scale = Math.min(1, MAX_SIZE / Math.max(bitmap.width, bitmap.height));
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return file;
    ctx.fillStyle = '#ffffff'; // transparent PNG areas become white instead of black
    ctx.fillRect(0, 0, width, height);
    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close();

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/jpeg', QUALITY));
    if (!blob || blob.size >= file.size) return file;

    const name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
    return new File([blob], name, { type: 'image/jpeg' });
  } catch (error) {
    console.error('Image compression failed, uploading original:', error);
    return file;
  }
}
