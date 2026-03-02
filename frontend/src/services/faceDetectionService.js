import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";

let faceDetector = null;
let initPromise = null;

/**
 * Initialize MediaPipe Face Detector (singleton).
 * Safe to call multiple times — subsequent calls return the same promise.
 */
export const initFaceDetector = () => {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const vision = await FilesetResolver.forVisionTasks(
      "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
    );
    faceDetector = await FaceDetector.createFromOptions(vision, {
      baseOptions: {
        modelAssetPath:
          "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite",
      },
      runningMode: "IMAGE",
    });
    return faceDetector;
  })();

  return initPromise;
};

/**
 * Detect faces in an HTMLImageElement.
 * Returns array of bounding boxes in CSS pixel coordinates matching
 * FaceRecognition.js expectations: { leftCol, topRow, rightCol, bottomRow }.
 *
 * @param {HTMLImageElement} imageElement - Fully loaded image element
 * @returns {Promise<Array<{leftCol: number, topRow: number, rightCol: number, bottomRow: number}>>}
 */
export const detectFaces = async (imageElement) => {
  if (!faceDetector) {
    await initFaceDetector();
  }

  const result = faceDetector.detect(imageElement);

  // MediaPipe returns pixel coords relative to natural image dimensions.
  // Scale to displayed dimensions for CSS positioning.
  const displayedWidth = imageElement.width;
  const displayedHeight = imageElement.height;
  const naturalWidth = imageElement.naturalWidth;
  const naturalHeight = imageElement.naturalHeight;

  const scaleX = displayedWidth / naturalWidth;
  const scaleY = displayedHeight / naturalHeight;

  return result.detections.map((detection) => {
    const { originX, originY, width, height } = detection.boundingBox;

    // Convert to CSS positioning values:
    // leftCol = distance from left edge
    // topRow = distance from top edge
    // rightCol = distance from RIGHT edge (not right coordinate)
    // bottomRow = distance from BOTTOM edge (not bottom coordinate)
    return {
      leftCol: originX * scaleX,
      topRow: originY * scaleY,
      rightCol: displayedWidth - (originX + width) * scaleX,
      bottomRow: displayedHeight - (originY + height) * scaleY,
    };
  });
};

export const isDetectorReady = () => faceDetector !== null;
