import React from 'react';
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { GoldenStardust } from '../components/GoldenStardust';
import { PhotoFrame } from '../components/PhotoFrame';
import { weddingConfig } from '../config/weddingConfig';

export const Scene06_DatingMemories: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const cfg = weddingConfig.scenes.scene06_datingMemories;

    const opacity = interpolate(frame, [0, 25, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
    });

    // Hiệu ứng cành lá vươn mọc từ trái sang phải ở khoảng trống top - chậm rãi, thanh lịch
    const vineProgress = interpolate(frame, [4, 90], [0, 1], {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const vineGrow = interpolate(vineProgress, [0, 1], [0, 100]);
    const vineOpacity = interpolate(frame, [4, 22], [0, 0.92], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const vineTranslateX = interpolate(vineProgress, [0, 1], [-25, 0]);

    // Hiệu ứng dòng chữ trích dẫn xuất hiện
    const textSpring = spring({
        frame: frame - 12,
        fps,
        config: { damping: 15, mass: 0.85 },
    });
    const textY = interpolate(textSpring, [0, 1], [25, 0]);
    const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

    // Hiệu ứng loáng sáng ánh kim vàng nhẹ nhàng quét qua dòng trích dẫn
    let shimmerProgress = -1;
    if (frame >= 60 && frame <= 120) {
        shimmerProgress = interpolate(frame, [60, 120], [0, 1]);
    } else if (frame >= 260 && frame <= 320) {
        shimmerProgress = interpolate(frame, [260, 320], [0, 1]);
    }
    const shineX = interpolate(shimmerProgress, [0, 1], [130, -30]);
    const shineOpacity = shimmerProgress >= 0 ? interpolate(shimmerProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) : 0;

    // Bụi sao vàng óng ánh
    const stardustOpacity = interpolate(frame, [15, 45, durationInFrames - 30, durationInFrames], [0, 0.35, 0.35, 0], {
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
                justifyContent: 'flex-end',
                paddingBottom: 115,
                zIndex: 20,
            }}
        >
            {/* Cành hoa văn lá cành xoay ngang mọc từ trái sang phải ở khoảng trống phía trên top */}
            {vineOpacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        top: 35,
                        left: '50%',
                        width: 1220,
                        height: 'auto',
                        opacity: vineOpacity,
                        transform: `translateX(calc(-50% + ${vineTranslateX}px))`,
                        WebkitMaskImage:
                            vineGrow < 100
                                ? `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${vineGrow}%, rgba(0,0,0,0) ${Math.min(100, vineGrow + 15)}%)`
                                : undefined,
                        maskImage:
                            vineGrow < 100
                                ? `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${vineGrow}%, rgba(0,0,0,0) ${Math.min(100, vineGrow + 15)}%)`
                                : undefined,
                        pointerEvents: 'none',
                        willChange: 'transform, opacity',
                        zIndex: 15,
                    }}
                >
                    <Img
                        src={staticFile('decor/decor-vine-dots-garland.png')}
                        style={{
                            width: '100%',
                            height: 'auto',
                            filter: 'drop-shadow(0 2px 10px rgba(140, 110, 70, 0.15))',
                        }}
                    />
                </div>
            )}

            {/* Dòng trích dẫn kỷ niệm ở trên cụm ảnh */}
            <div
                style={{
                    position: 'relative',
                    textAlign: 'center',
                    maxWidth: 1800,
                    marginBottom: 36,
                    transform: `translateY(${textY}px)`,
                    opacity: textOpacity,
                    zIndex: 16,
                }}
            >
                <p
                    style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 50,
                        fontWeight: 600,
                        fontStyle: 'italic',
                        lineHeight: 1.4,
                        color: weddingConfig.colors.textDark,
                        letterSpacing: '0.025em',
                    }}
                >
                    “{cfg.quote}”
                </p>

                {/* Lớp ánh kim loáng sáng quét qua dòng trích dẫn */}
                {shimmerProgress >= 0 && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 50,
                            fontWeight: 600,
                            fontStyle: 'italic',
                            lineHeight: 1.4,
                            letterSpacing: '0.025em',
                            whiteSpace: 'nowrap',
                            background:
                                'linear-gradient(110deg, transparent 20%, rgba(255, 235, 180, 0.7) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 235, 180, 0.7) 60%, transparent 80%)',
                            backgroundSize: '220% 100%',
                            backgroundPosition: `${shineX}% 0`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            pointerEvents: 'none',
                            opacity: shineOpacity,
                            willChange: 'background-position, opacity',
                        }}
                    >
                        “{cfg.quote}”
                    </div>
                )}
            </div>

            {/* 3 Khung ảnh kỷ niệm hẹn hò khổ lớn (kéo sát khung bottom) */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 36,
                    zIndex: 16,
                }}
            >
                {cfg.photos.map((photoSrc, idx) => {
                    const photoSpring = spring({
                        frame: frame - 16 - idx * 8,
                        fps,
                        config: { damping: 16, mass: 0.9 },
                    });
                    const photoY = interpolate(photoSpring, [0, 1], [35, 0]);
                    const photoOpacity = interpolate(photoSpring, [0, 1], [0, 1]);

                    return (
                        <div
                            key={idx}
                            style={{
                                transform: `translateY(${photoY}px)`,
                                opacity: photoOpacity,
                            }}
                        >
                            <PhotoFrame
                                src={photoSrc}
                                durationInFrames={durationInFrames}
                                direction={idx === 0 ? 'pan-right' : idx === 1 ? 'zoom-in' : 'pan-left'}
                                width={640}
                                height={870}
                                variant="studio"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Bụi sao vàng óng ánh lơ lửng */}
            {stardustOpacity > 0 && (
                <GoldenStardust starCount={16} grainCount={24} opacity={stardustOpacity} zIndex={18} />
            )}
        </div>
    );
};
