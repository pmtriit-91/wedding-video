/**
 * Remotion Configuration file
 * Tối ưu chất lượng 2K, H.264, âm thanh 320kbps
 */
import { Config } from "@remotion/cli/config";

// Định dạng video MP4 chuẩn tương thích mọi máy
Config.setVideoImageFormat("jpeg");
Config.setCodec("h264");
Config.setPixelFormat("yuv420p");
Config.setCrf(18); // visually lossless quality
Config.setAudioCodec("aac");
Config.setAudioBitrate("320k");
Config.setConcurrency(null); // tự động dùng 100% CPU cores
