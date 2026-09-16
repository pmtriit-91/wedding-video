import React from 'react';
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { GoldenStardust } from '../components/GoldenStardust';
import { PhotoFrame } from '../components/PhotoFrame';
import { weddingConfig } from '../config/weddingConfig';

export const Scene08_GuestWelcome: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const cfg = weddingConfig.scenes.scene08_guestWelcome;

    // Lựa chọn hoa văn bottom-right:
    // "bloom": Hoa thảo mộc lãng mạn (decor-botanical-bloom.png)
    // "berries": Cành lá quả mọng sumi-e minimalist (decor-berries-branch.png)
    // "fern": Bụi dương xỉ cỏ dại thảo mộc (decor-fern-fronds.png)
    // "tropical": Tán lá nhiệt đới góc phải (decor-tropical-leaves.png)
    const decorOption: 'bloom' | 'berries' | 'fern' | 'tropical' = 'tropical';

    const decorConfigs = {
        bloom: {
            src: 'decor/decor-botanical-bloom.png',
            bottom: -20,
            right: 70,
            width: 285,
            filter: 'drop-shadow(0 6px 20px rgba(140, 105, 65, 0.28)) contrast(1.06) saturate(1.05)',
        },
        berries: {
            src: 'decor/decor-berries-branch.png',
            bottom: -15,
            right: 70,
            width: 290,
            filter: 'drop-shadow(0 6px 18px rgba(60, 45, 30, 0.22))',
        },
        fern: {
            src: 'decor/decor-fern-fronds-gold.png',
            bottom: -40,
            right: 50,
            width: 325,
            filter: 'drop-shadow(0 6px 18px rgba(140, 105, 65, 0.28))',
        },
        tropical: {
            src: 'decor/decor-tropical-leaves.png',
            bottom: 0,
            right: 0,
            width: 390,
            filter: 'drop-shadow(0 6px 18px rgba(40, 30, 20, 0.22)) contrast(1.06)',
        },
    };
    const currentDecor = decorConfigs[decorOption];

    const opacity = interpolate(frame, [0, 25, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
    });

    // Hiệu ứng cành hoa thảo mộc mọc từ đáy lên (bottom-right) - chậm rãi, thanh nhã (~2.8s)
    const bloomProgress = interpolate(frame, [8, 95], [0, 1], {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const bloomGrow = interpolate(bloomProgress, [0, 1], [0, 100]);
    const bloomOpacity = interpolate(frame, [8, 26], [0, 0.95], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const bloomTranslateY = interpolate(bloomProgress, [0, 1], [35, 0]);

    // Hiệu ứng cụm trích dẫn chào mừng bên dưới
    const textSpring = spring({
        frame: frame - 12,
        fps,
        config: { damping: 16, mass: 0.9 },
    });
    const textX = interpolate(textSpring, [0, 1], [-35, 0]);
    const textOpacity = interpolate(textSpring, [0, 1], [0, 1]);

    // Hiệu ứng loáng sáng ánh kim vàng trên dòng trích dẫn
    let shimmerProgress = -1;
    if (frame >= 60 && frame <= 120) {
        shimmerProgress = interpolate(frame, [60, 120], [0, 1]);
    } else if (frame >= 250 && frame <= 310) {
        shimmerProgress = interpolate(frame, [250, 310], [0, 1]);
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
                justifyContent: 'flex-start',
                paddingTop: 65,
                zIndex: 20,
            }}
        >
            {/* 3 Khung ảnh Ngoại cảnh đồi thông khổ lớn trung tâm (to rõ đẹp) */}
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
                        frame: frame - 14 - idx * 20,
                        fps,
                        config: { damping: 18, mass: 1.15, stiffness: 50 },
                    });
                    const photoY = interpolate(photoSpring, [0, 1], [40, 0]);
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
                                direction={idx === 2 ? 'zoom-out' : 'pan-up'}
                                width={660}
                                height={900}
                                variant="studio"
                                initialScale={idx === 2 ? 1.10 : 1.08}
                                finalScale={idx === 2 ? 1.0 : undefined}
                                transformOrigin={idx === 2 ? 'center 30%' : 'center 80%'}
                                imgStyle={{
                                    objectPosition: idx === 2 ? 'center 32%' : 'center 88%',
                                }}
                                imageOffsetY={0}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Cụm thông điệp bên dưới (bố cục theo reference ảnh 2) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 100,
                    left: 240,
                    display: 'flex',
                    alignItems: 'center',
                    transform: `translateX(${textX}px)`,
                    opacity: textOpacity,
                    zIndex: 16,
                }}
            >
                {/* Vạch đứng vàng kim sang trọng (kiểu kiến trúc hiện đại như clip gốc) */}
                <div
                    style={{
                        width: 4,
                        height: 140,
                        backgroundColor: weddingConfig.colors.goldPrimary,
                        borderRadius: 2,
                        marginRight: 28,
                        boxShadow: '0 0 14px rgba(198, 155, 86, 0.45)',
                    }}
                />

                {/* Hộp nội dung trích dẫn ấm áp, thanh lịch */}
                <div
                    style={{
                        background: 'rgba(255, 250, 243, 0.88)',
                        backdropFilter: 'blur(12px)',
                        padding: '24px 38px',
                        borderRadius: 14,
                        border: '1px solid rgba(220, 185, 140, 0.45)',
                        boxShadow: '0 12px 35px rgba(140, 100, 60, 0.08)',
                        maxWidth: 1100,
                        position: 'relative',
                    }}
                >
                    <div
                        style={{
                            fontFamily: "'Great Vibes', cursive",
                            fontSize: 34,
                            color: weddingConfig.colors.goldPrimary,
                            marginBottom: 6,
                            letterSpacing: '0.04em',
                        }}
                    >
                        Welcome to Our Guests
                    </div>

                    <p
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            fontSize: 42,
                            fontWeight: 600,
                            fontStyle: 'italic',
                            lineHeight: 1.35,
                            color: weddingConfig.colors.textDark,
                            letterSpacing: '0.02em',
                            margin: 0,
                        }}
                    >
                        Chúng con thật vui và hạnh phúc
                        <br />
                        khi được thấy mọi người ở đây.
                    </p>

                    {/* Ánh kim quét qua dòng chữ trích dẫn */}
                    {shimmerProgress >= 0 && (
                        <div
                            style={{
                                position: 'absolute',
                                left: 38,
                                bottom: 24,
                                right: 38,
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 42,
                                fontWeight: 600,
                                fontStyle: 'italic',
                                lineHeight: 1.35,
                                letterSpacing: '0.02em',
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
                            Chúng con thật vui và hạnh phúc
                            <br />
                            khi được thấy mọi người ở đây.
                        </div>
                    )}
                </div>
            </div>

            {/* Hoa văn cành hoa thảo mộc mọc vươn lên từ bottom góc phải */}
            {bloomOpacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: currentDecor.bottom,
                        right: currentDecor.right,
                        width: currentDecor.width,
                        height: 'auto',
                        opacity: bloomOpacity,
                        transform: `translateY(${bloomTranslateY}px)`,
                        WebkitMaskImage:
                            bloomGrow < 100
                                ? `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${bloomGrow}%, rgba(0,0,0,0) ${Math.min(100, bloomGrow + 15)}%)`
                                : 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 5%, rgba(0,0,0,1) 14%, rgba(0,0,0,1) 100%)',
                        maskImage:
                            bloomGrow < 100
                                ? `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${bloomGrow}%, rgba(0,0,0,0) ${Math.min(100, bloomGrow + 15)}%)`
                                : 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 5%, rgba(0,0,0,1) 14%, rgba(0,0,0,1) 100%)',
                        pointerEvents: 'none',
                        willChange: 'transform, opacity',
                        zIndex: 30,
                    }}
                >
                    <Img
                        src={staticFile(currentDecor.src)}
                        style={{
                            width: '100%',
                            height: 'auto',
                            filter: currentDecor.filter,
                        }}
                    />
                </div>
            )}

            {/* Bụi sao vàng óng ánh lơ lửng */}
            {stardustOpacity > 0 && (
                <GoldenStardust starCount={16} grainCount={24} opacity={stardustOpacity} zIndex={18} />
            )}
        </div>
    );
};
