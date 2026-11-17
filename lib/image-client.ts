const MAX_FILE_BYTES = 8 * 1024 * 1024
const MAX_WIDTH = 1600
const COMPRESS_ABOVE_BYTES = 1.5 * 1024 * 1024

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = () => reject(new Error('The image could not be loaded.'))
    img.src = src
  })
}

/**
 * Reads an image file and returns a data URL. Large photos are resized and
 * compressed in the browser so they stay small enough to store with the post.
 */
export async function imageFileToDataUrl(file: File, maxWidth = MAX_WIDTH): Promise<string> {
  if (!file.type.startsWith('image/')) {
    throw new Error('Please choose an image file.')
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error('That image is larger than 8MB. Please choose a smaller one.')
  }

  const original = await new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(new Error('The image could not be read.'))
    reader.readAsDataURL(file)
  })

  if (file.type === 'image/svg+xml' || file.type === 'image/gif') return original

  try {
    const image = await loadImage(original)
    const needsResize = image.width > maxWidth
    if (!needsResize && file.size <= COMPRESS_ABOVE_BYTES) return original

    const scale = Math.min(1, maxWidth / image.width)
    const canvas = document.createElement('canvas')
    canvas.width = Math.round(image.width * scale)
    canvas.height = Math.round(image.height * scale)
    const ctx = canvas.getContext('2d')
    if (!ctx) return original

    // White background keeps transparent PNGs from turning black in JPEG.
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/jpeg', 0.85)
  } catch {
    return original
  }
}
