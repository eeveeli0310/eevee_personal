import { ShareImage, shareAlt, shareContentType, shareSize } from "@/lib/share-image";

export const alt = shareAlt;
export const size = shareSize;
export const contentType = shareContentType;

export default function OpenGraphImage() {
  return ShareImage();
}
