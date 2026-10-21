/** Final designer centerline. #sig then #underline. Stroke is 32 in the 1560×1541 viewBox. */
export const signatureViewBox = "0 0 1560 1541";
export const SIGNATURE_STROKE = 32;
/** Home mark is min(58vw, 76vh). 23 user units paint about 9px at a 1024px-wide viewport. */
export const SIGNATURE_STROKE_HOME = 23;

export const signatureSig = "M553.41,357.71C537.67,345.10 523.16,349.80 508.40,361.49C399.50,447.74 324.11,679.35 353.67,813.95C360.27,844.00 400.41,928.39 396.58,938.88C391.18,953.66 328.88,965.37 310.10,974.95C259.55,1000.75 40.92,1157.36 53.29,1214.99C60.45,1248.39 137.53,1194.33 150.50,1185.34C213.23,1141.88 566.93,785.77 574.99,734.90C564.52,803.12 461.79,1044.19 426.64,1110.71C489.81,991.13 629.58,863.02 693.57,748.61C671.86,786.93 663.98,838.77 647.12,883.03C581.81,1054.47 837.94,730.90 850.34,713.68C844.64,730.62 810.83,862.15 831.31,865.96C914.38,881.41 1479.42,123.36 1358.13,52.20C1336.20,39.34 1290.02,79.52 1274.63,93.79C1151.62,207.82 1073.14,360.57 1009.67,513.64C973.11,601.82 871.70,966.32 822.04,1000.19C916.20,935.31 1036.48,837.65 1143.15,793.89";

export const signatureUnderline = "M297.12,1493.52C681.61,1210.95 1082.24,945.34 1505.28,723.64";

/** Fraction of #sig drawn at 121 even times across 2.6s. Slower through the curves. */
export const signaturePen = [0, 0.00237, 0.00492, 0.0078, 0.01119, 0.01509, 0.01967, 0.02476, 0.03036, 0.0363, 0.0424, 0.04868, 0.05529, 0.06191, 0.06869, 0.07564, 0.08243, 0.08938, 0.09634, 0.10329, 0.10957, 0.11499, 0.12025, 0.12636, 0.13348, 0.14162, 0.15061, 0.15994, 0.1691, 0.17775, 0.18487, 0.19064, 0.19556, 0.20115, 0.20862, 0.21777, 0.22812, 0.23898, 0.25, 0.26119, 0.27256, 0.28392, 0.29528, 0.30597, 0.31564, 0.32531, 0.33633, 0.34803, 0.35991, 0.37178, 0.38348, 0.39484, 0.40655, 0.41859, 0.4308, 0.44284, 0.45455, 0.46557, 0.47642, 0.48609, 0.49305, 0.49932, 0.50746, 0.51849, 0.53036, 0.54189, 0.55224, 0.56208, 0.56971, 0.57615, 0.58345, 0.59328, 0.60465, 0.61652, 0.62822, 0.63993, 0.65163, 0.66316, 0.67469, 0.68606, 0.69725, 0.70828, 0.71879, 0.72829, 0.73592, 0.74203, 0.74763, 0.7539, 0.7617, 0.77086, 0.78036, 0.79003, 0.79953, 0.80885, 0.81818, 0.82751, 0.83667, 0.84566, 0.85431, 0.86313, 0.87178, 0.88043, 0.88874, 0.89688, 0.90485, 0.91231, 0.91961, 0.92605, 0.93216, 0.93792, 0.94403, 0.95047, 0.95692, 0.9632, 0.96913, 0.9749, 0.98033, 0.98558, 0.99067, 0.99542, 1] as const;

export const SIGNATURE_SIG_S = 2.6;
export const SIGNATURE_PAUSE_S = 0.15;
export const SIGNATURE_UNDERLINE_S = 0.35;
export const SIGNATURE_TOTAL_S = SIGNATURE_SIG_S + SIGNATURE_PAUSE_S + SIGNATURE_UNDERLINE_S;

function penAt(unit: number) {
  const x = Math.min(1, Math.max(0, unit)) * (signaturePen.length - 1);
  const i = Math.floor(x);
  const r = x - i;
  if (i >= signaturePen.length - 1) return 1;
  return signaturePen[i] * (1 - r) + signaturePen[i + 1] * r;
}

/** Scroll and timed playback share this clock. 0 is blank, 1 is the held finished stroke. */
export function signatureFractions(progress: number): [number, number] {
  const t = Math.min(1, Math.max(0, progress)) * SIGNATURE_TOTAL_S;
  const sig = t <= 0 ? 0 : penAt(t / SIGNATURE_SIG_S);
  const underlineT = (t - SIGNATURE_SIG_S - SIGNATURE_PAUSE_S) / SIGNATURE_UNDERLINE_S;
  const underline = underlineT <= 0 ? 0 : 1 - (1 - Math.min(1, underlineT)) ** 3;
  return [sig, underline];
}
