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
                padding: '50px 100px 160px 100px',
                zIndex: 20,
            }}
        >
            {/* Bố cục Tạp chí Cưới Editorial Vogue: Nhịp LỚN - NHỎ tương phản hoàn hảo */}
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    height: '100%',
                    zIndex: 16,
                }}
            >
                {/* Cụm bên trái: Thông điệp Ngày trọng đại & 2 ảnh chi tiết cảm xúc */}
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        maxWidth: 1140,
                        transform: `translateX(${textX}px)`,
                        opacity: textOpacity,
                    }}
                >
                    {/* Khối Text tiêu đề */}
                    <div style={{ marginBottom: 36 }}>
                        <div style={{ position: 'relative' }}>
                            <span
                                style={{
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: 76,
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
                                        fontSize: 76,
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
                                display: 'block',
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: 40,
                                fontWeight: 600,
                                color: '#1E1A17',
                                marginTop: 14,
                                lineHeight: 1.5,
                                letterSpacing: '0.015em',
                                textShadow: '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(255, 255, 255, 0.85)',
                            }}
                        >
                            {cfg.line2}
                        </span>

                        {/* Thanh chỉ vàng nối tiếp */}
                        <div
                            style={{
                                marginTop: 24,
                                width: 160,
                                height: 3,
                                background: 'linear-gradient(to right, #C69B56, rgba(198, 155, 86, 0.2))',
                                borderRadius: 2,
                            }}
                        />
                    </div>

                    {/* 2 Ảnh chi tiết cảm xúc xếp song song cân đối */}
                    <div style={{ display: 'flex', gap: 26, alignItems: 'center' }}>
                        {[cfg.photos[1], cfg.photos[2] || cfg.photos[3]].map((photoSrc, idx) => {
                            const subSpring = spring({
                                frame: frame - 28 - idx * 24,
                                fps,
                                config: { damping: 18, mass: 1.1 },
                            });
                            const subY = interpolate(subSpring, [0, 1], [50, 0]);
                            const subOpacity = interpolate(subSpring, [0, 1], [0, 1]);

                            return (
                                <div
                                    key={idx}
                                    style={{
                                        transform: `translateY(${subY}px)`,
                                        opacity: subOpacity,
                                    }}
                                >
                                    <PhotoFrame
                                        src={photoSrc}
                                        durationInFrames={durationInFrames}
                                        direction={idx === 0 ? 'zoom-in' : 'pan-up'}
                                        initialScale={1.02}
                                        finalScale={1.08}
                                        width={540}
                                        height={680}
                                        variant="studio"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Cụm bên phải: 1 Ảnh HERO KHỔ LỚN tạo điểm nhấn thị giác hoành tráng */}
                <div
                    style={{
                        transform: `translateX(${interpolate(
                            spring({ frame: frame - 16, fps, config: { damping: 18, mass: 1.2 } }),
                            [0, 1],
                            [60, 0]
                        )}px)`,
                        opacity: interpolate(
                            spring({ frame: frame - 16, fps, config: { damping: 18, mass: 1.2 } }),
                            [0, 1],
                            [0, 1]
                        ),
                    }}
                >
                    <PhotoFrame
                        src={cfg.photos[0]}
                        durationInFrames={durationInFrames}
                        direction="zoom-out"
                        initialScale={1.12}
                        finalScale={1.02}
                        width={1060}
                        height={1220}
                        variant="studio"
                    />
                </div>
            </div>

            {/* Bụi sao vàng óng ánh lơ lửng */}
            {stardustOpacity > 0 && (
                <GoldenStardust starCount={16} grainCount={24} opacity={stardustOpacity} zIndex={18} />
            )}
        </div>
    );
};
