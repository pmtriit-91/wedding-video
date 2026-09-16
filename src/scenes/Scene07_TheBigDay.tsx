import React from 'react';
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { GoldenStardust } from '../components/GoldenStardust';
import { PhotoFrame } from '../components/PhotoFrame';
import { weddingConfig } from '../config/weddingConfig';

export const Scene07_TheBigDay: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const cfg = weddingConfig.scenes.scene07_theBigDay;

    const opacity = interpolate(frame, [0, 25, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
    });

    // Hiệu ứng ảnh nền phụ hoa văn nghệ thuật xuất hiện êm ái
    const bgArtOpacity = interpolate(frame, [4, 25], [0, 0.88], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Hiệu ứng dòng chữ thông điệp xuất hiện từ bên trái
    const textSpring = spring({
        frame: frame - 10,
        fps,
        config: { damping: 15, mass: 0.85 },
    });
    const textX = interpolate(textSpring, [0, 1], [-35, 0]);
    const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

    // Hiệu ứng loáng sáng ánh kim vàng nhẹ nhàng quét qua dòng chữ tiêu đề
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
                justifyContent: 'space-between',
                padding: '50px 100px 100px 100px',
                zIndex: 20,
            }}
        >
            {/* Ảnh hoa văn nền phụ nghệ thuật ở góc trên bên phải (thay thế cành lá cũ) */}
            {bgArtOpacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        top: -30,
                        right: -40,
                        width: 820,
                        height: 1150,
                        pointerEvents: 'none',
                        zIndex: 5,
                        overflow: 'hidden',
                        opacity: bgArtOpacity,
                        WebkitMaskImage:
                            'radial-gradient(ellipse 95% 85% at 85% 15%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,0) 100%)',
                        maskImage:
                            'radial-gradient(ellipse 95% 85% at 85% 15%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.75) 65%, rgba(0,0,0,0) 100%)',
                    }}
                >
                    <Img
                        src={staticFile('decor/scene07-bg-sub.jpeg')}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            mixBlendMode: 'multiply',
                            transform: `scale(${interpolate(frame, [0, durationInFrames], [1, 1.04], { extrapolateRight: 'clamp' })})`,
                            transformOrigin: 'top right',
                            filter: 'contrast(1.03) saturate(1.05) brightness(1.02)',
                        }}
                    />
                </div>
            )}

            {/* Cụm thông điệp Ngày trọng đại ở góc trên bên trái */}
            <div
                style={{
                    width: '100%',
                    maxWidth: 2360,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    transform: `translateX(${textX}px)`,
                    opacity: textOpacity,
                    zIndex: 16,
                    marginTop: 10,
                }}
            >
                <div style={{ position: 'relative' }}>
                    <span
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 68,
                            fontWeight: 700,
                            fontStyle: 'italic',
                            color: weddingConfig.colors.textDark,
                            letterSpacing: '0.03em',
                            lineHeight: 1.2,
                        }}
                    >
                        {cfg.line1}
                    </span>

                    {/* Lớp ánh kim quét qua dòng tiêu đề chính */}
                    {shimmerProgress >= 0 && (
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 68,
                                fontWeight: 700,
                                fontStyle: 'italic',
                                letterSpacing: '0.03em',
                                lineHeight: 1.2,
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
                            {cfg.line1}
                        </div>
                    )}
                </div>

                <span
                    style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 38,
                        fontWeight: 600,
                        color: '#221E1C',
                        marginTop: 12,
                        lineHeight: 1.5,
                        letterSpacing: '0.015em',
                        textShadow: '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(255, 255, 255, 0.85)',
                    }}
                >
                    {cfg.line2}
                </span>
            </div>

            {/* Dải 4 Khung ảnh Studio khổ lớn hạnh phúc */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 26,
                    width: '100%',
                    zIndex: 16,
                    marginBottom: 30,
                }}
            >
                {cfg.photos.map((photoSrc, idx) => {
                    const photoSpring = spring({
                        frame: frame - 18 - idx * 22,
                        fps,
                        config: { damping: 20, mass: 1.25, stiffness: 50 },
                    });
                    const photoY = interpolate(photoSpring, [0, 1], [45, 0]);
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
                                direction={idx === 0 ? 'zoom-out' : idx % 2 === 0 ? 'zoom-in' : 'pan-up'}
                                initialScale={idx === 0 ? 1.15 : undefined}
                                finalScale={idx === 0 ? 1.0 : undefined}
                                imageOffsetY={0}
                                width={560}
                                height={840}
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
