import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { FloralDecor } from '../components/FloralDecor';
import { PhotoFrame } from '../components/PhotoFrame';
import { weddingConfig } from '../config/weddingConfig';

export const Scene05_ParentGratitude: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const cfg = weddingConfig.scenes.scene05_parentGratitude;

    const opacity = interpolate(frame, [0, 25, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
    });

    const textSpring = spring({
        frame: Math.max(0, frame - 6),
        fps,
        config: { damping: 16, mass: 0.85 },
    });
    const textOpacity = interpolate(frame, [6, 26], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const textX = interpolate(textSpring, [0, 1], [-30, 0]);

    const photosSpring = spring({
        frame: Math.max(0, frame - 2),
        fps,
        config: { damping: 18, mass: 0.9 },
    });
    const photosOpacity = interpolate(frame, [0, 22], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const photosX = interpolate(photosSpring, [0, 1], [30, 0]);

    // Hiệu ứng loáng sáng ánh kim quét qua chữ "Thank you Parents"
    let shimmerProgress = -1;
    if (frame >= 45 && frame <= 100) {
        shimmerProgress = interpolate(frame, [45, 100], [0, 1]);
    } else if (frame >= 240 && frame <= 295) {
        shimmerProgress = interpolate(frame, [240, 295], [0, 1]);
    } else if (frame >= 420 && frame <= 475) {
        shimmerProgress = interpolate(frame, [420, 475], [0, 1]);
    }

    const shineX = interpolate(shimmerProgress, [0, 1], [130, -30]);
    const shineOpacity = shimmerProgress >= 0 ? interpolate(shimmerProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) : 0;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                opacity,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 110px',
                zIndex: 20,
            }}
        >
            <FloralDecor position="top-left" opacity={0.4} />
            <FloralDecor position="bottom-left" opacity={0.4} />

            {/* Cụm lời tri ân Bố Mẹ bên trái */}
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 1040,
                    transform: `translateX(${textX}px)`,
                    opacity: textOpacity,
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        display: 'inline-block',
                        width: 'fit-content',
                        marginBottom: 20,
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'Great Vibes', cursive",
                            fontSize: 72,
                            color: weddingConfig.colors.goldPrimary,
                            letterSpacing: '0.02em',
                            textShadow: '0 2px 8px rgba(198, 155, 86, 0.15)',
                        }}
                    >
                        Thank you Parents
                    </div>

                    {/* Lớp loáng sáng ánh kim vàng quét qua chữ Thank you Parents */}
                    {shimmerProgress >= 0 && (
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                fontFamily: "'Great Vibes', cursive",
                                fontSize: 72,
                                letterSpacing: '0.02em',
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
                            Thank you Parents
                        </div>
                    )}
                </div>

                <p
                    style={{
                        fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                        fontSize: 64,
                        fontWeight: 600,
                        lineHeight: 1.35,
                        color: weddingConfig.colors.textDark,
                        marginBottom: 28,
                        letterSpacing: '0.01em',
                    }}
                >
                    {cfg.title}
                </p>

                <p
                    style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 38,
                        fontWeight: 400,
                        lineHeight: 1.65,
                        color: '#4A433D',
                        letterSpacing: '0.015em',
                    }}
                >
                    {cfg.message}
                </p>

                <div
                    style={{
                        marginTop: 40,
                        width: 140,
                        height: 3,
                        background: 'linear-gradient(to right, #C69B56, rgba(198, 155, 86, 0.2))',
                        borderRadius: 2,
                    }}
                />
            </div>

            {/* Cụm ảnh bên phải: Bố cục 2 cột chuẩn tỉ lệ ảnh gốc 2:3 (giữ trọn vẹn 100% hình ảnh không bị cắt) */}
            <div
                style={{
                    display: 'flex',
                    gap: 24,
                    alignItems: 'center',
                    transform: `translateX(${photosX}px)`,
                    opacity: photosOpacity,
                }}
            >
                {/* Cột 1: 2 ảnh chi tiết xếp dọc (Chuẩn tỉ lệ ảnh dọc 2:3: 364 x 545) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Ảnh sổ thề nguyện To my husband / To my wife - dịch sang trái để lấy trọn vẹn thiệp cô dâu */}
                    <PhotoFrame
                        src={cfg.vowBookPhoto}
                        durationInFrames={durationInFrames}
                        direction="zoom-in"
                        initialScale={1.5}
                        finalScale={1.25}
                        transformOrigin="80% 28%"
                        width={364}
                        height={545}
                        variant="studio"
                    />

                    {/* Ảnh ngoại cảnh chú rể & cô dâu ngắm hoa */}
                    <PhotoFrame
                        src={cfg.outdoorPhotos[0]}
                        durationInFrames={durationInFrames}
                        direction="pan-right"
                        width={364}
                        height={545}
                        variant="studio"
                    />
                </div>

                {/* Cột 2: Ảnh chân dung lớn trung tâm (Chuẩn tỉ lệ ảnh dọc 2:3: 740 x 1110) */}
                <PhotoFrame
                    src={cfg.outdoorPhotos[1]}
                    durationInFrames={durationInFrames}
                    direction="zoom-in"
                    initialScale={1.0}
                    finalScale={1.05}
                    width={740}
                    height={1110}
                    variant="studio"
                />
            </div>
        </div>
    );
};
