import React from 'react';
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { FloralDecor } from '../components/FloralDecor';
import { PhotoFrame } from '../components/PhotoFrame';
import { weddingConfig } from '../config/weddingConfig';

export const Scene11_ForeverHappy: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
    const frame = useCurrentFrame();
    const cfg = weddingConfig.scenes.scene11_foreverHappy;

    const opacity = interpolate(frame, [0, 25, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
    });

    // Hiệu ứng xuất hiện lời hứa tình yêu chậm rãi, tiếp nối sau cụm ảnh
    const textTranslateY = interpolate(frame, [110, 190], [30, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });
    const textOpacity = interpolate(frame, [110, 170], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                opacity,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '40px 80px 36px 80px',
                zIndex: 20,
            }}
        >
            <FloralDecor position="top-left" opacity={0.35} />
            <FloralDecor position="top-right" opacity={0.35} />

            {/* 3 Khung ảnh cưới Studio thanh lịch - Kích thước lớn, xuất hiện lần lượt chậm rãi */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 48,
                    flex: 1,
                }}
            >
                {cfg.photos.map((photoSrc, idx) => {
                    // Xuất hiện lần lượt từng ảnh: mỗi ảnh cách nhau 45 frames (~0.75s)
                    const startFrame = 16 + idx * 45;
                    const endFrame = startFrame + 90; // Chuyển động lướt lên thong thả trong 1.5s

                    const photoY = interpolate(frame, [startFrame, endFrame], [85, 0], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                        easing: Easing.out(Easing.quad),
                    });
                    const photoOpacity = interpolate(frame, [startFrame, startFrame + 38], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });

                    return (
                        <div
                            key={idx}
                            style={{
                                transform: `translateY(${photoY}px)`,
                                opacity: photoOpacity,
                                willChange: 'transform, opacity',
                                filter: 'drop-shadow(0 26px 55px rgba(35, 20, 10, 0.22))',
                            }}
                        >
                            <PhotoFrame
                                src={photoSrc}
                                durationInFrames={durationInFrames}
                                direction={idx === 0 ? 'zoom-out' : idx === 1 ? 'pan-up' : 'zoom-out'}
                                width={630}
                                height={945}
                                variant="studio"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Lời hứa tình yêu bên dưới */}
            <div
                style={{
                    textAlign: 'center',
                    transform: `translateY(${textTranslateY}px)`,
                    opacity: textOpacity,
                    marginBottom: 80,
                    willChange: 'transform, opacity',
                }}
            >
                <p
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 52,
                        fontWeight: 800,
                        fontStyle: 'italic',
                        color: weddingConfig.colors.textDark,
                        letterSpacing: '0.04em',
                        margin: 0,
                        textShadow: '0 1px 2px rgba(255, 255, 255, 0.9), 0 2px 10px rgba(255, 255, 255, 0.8)',
                    }}
                >
                    “{cfg.quote}”
                </p>

                {/* Thanh gạch dưới vàng tinh tế */}
                <div
                    style={{
                        margin: '14px auto 0 auto',
                        width: 140,
                        height: 2.5,
                        backgroundColor: '#A87932',
                        boxShadow: '0 0 12px rgba(168, 121, 50, 0.5)',
                    }}
                />
            </div>
        </div>
    );
};
