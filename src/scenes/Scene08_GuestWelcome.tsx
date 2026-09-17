import React from 'react';
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { GoldenStardust } from '../components/GoldenStardust';
import { PhotoFrame } from '../components/PhotoFrame';
import { weddingConfig } from '../config/weddingConfig';

export const Scene08_GuestWelcome: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const cfg = weddingConfig.scenes.scene08_guestWelcome;

    // Lựa chọn bố cục hoa văn màu nước thống nhất (trích xuất từ tranh màu nước mới do người dùng cung cấp):
    // "fence-and-grass": Hàng rào gỗ mộc mạc góc phải + khóm cỏ lau màu nước mềm mại ở giữa (tone mộc Dalat ấm cúng)
    // "grass-only": Chỉ dùng các bụi cỏ lau màu nước (thanh nhã, bay bổng, lãng mạn)

    const opacity = interpolate(frame, [0, 25, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
    });


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
                paddingTop: 42,
                zIndex: 20,
            }}
        >
            {/* 3 Khung ảnh Ngoại cảnh đồi thông khổ lớn trung tâm (to rõ đẹp) */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 32,
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
                                width={760}
                                height={1040}
                                variant="studio"
                                initialScale={idx === 2 ? 1.1 : 1.08}
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

            {/* Cụm thông điệp bên dưới (hạ sát bottom, nhường trọn không gian cho ảnh) */}
            <div
                style={{
                    position: 'absolute',
                    bottom: 40,
                    left: 108,
                    display: 'flex',
                    alignItems: 'center',
                    transform: `translateX(${textX}px)`,
                    opacity: textOpacity,
                    zIndex: 25,
                }}
            >
                {/* Vạch đứng vàng kim sang trọng */}
                <div
                    style={{
                        width: 4,
                        height: 145,
                        backgroundColor: '#A87932',
                        borderRadius: 2,
                        marginRight: 24,
                        boxShadow: '0 0 14px rgba(168, 121, 50, 0.45)',
                    }}
                />

                {/* Hộp nội dung trích dẫn ấm áp, thanh lịch */}
                <div
                    style={{
                        background: 'rgba(255, 250, 243, 0.92)',
                        backdropFilter: 'blur(12px)',
                        padding: '20px 36px',
                        borderRadius: 14,
                        border: '1px solid rgba(220, 185, 140, 0.5)',
                        boxShadow: '0 12px 35px rgba(140, 100, 60, 0.12)',
                        maxWidth: 1100,
                        position: 'relative',
                    }}
                >
                    <div style={{ position: 'relative', marginBottom: 8 }}>
                        <div
                            style={{
                                fontFamily: "'Great Vibes', cursive",
                                fontSize: 48,
                                fontWeight: 600,
                                color: '#A87932',
                                letterSpacing: '0.04em',
                                textShadow: '0 1px 12px rgba(255, 255, 255, 0.95), 0 0 16px rgba(255, 255, 255, 0.9)',
                            }}
                        >
                            Welcome to Our Guests
                        </div>

                        {shimmerProgress >= 0 && (
                            <div
                                style={{
                                    position: 'absolute',
                                    inset: 0,
                                    fontFamily: "'Great Vibes', cursive",
                                    fontSize: 48,
                                    fontWeight: 600,
                                    letterSpacing: '0.04em',
                                    background:
                                        'linear-gradient(110deg, transparent 20%, rgba(255, 245, 200, 0.85) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 245, 200, 0.85) 60%, transparent 80%)',
                                    backgroundSize: '220% 100%',
                                    backgroundPosition: `${shineX}% 0`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    pointerEvents: 'none',
                                    opacity: shineOpacity,
                                    willChange: 'background-position, opacity',
                                }}
                            >
                                Welcome to Our Guests
                            </div>
                        )}
                    </div>

                    <div style={{ position: 'relative' }}>
                        <p
                            style={{
                                fontFamily: "'Cormorant Garamond', serif",
                                fontSize: 48,
                                fontWeight: 700,
                                fontStyle: 'italic',
                                lineHeight: 1.4,
                                color: '#161311',
                                letterSpacing: '0.015em',
                                margin: 0,
                                textShadow: '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(255, 255, 255, 0.85)',
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
                                    inset: 0,
                                    fontFamily: "'Cormorant Garamond', serif",
                                    fontSize: 48,
                                    fontWeight: 700,
                                    fontStyle: 'italic',
                                    lineHeight: 1.4,
                                    letterSpacing: '0.015em',
                                    margin: 0,
                                    background:
                                        'linear-gradient(110deg, transparent 20%, rgba(255, 235, 180, 0.85) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 235, 180, 0.85) 60%, transparent 80%)',
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
            </div>


            {/* Bụi sao vàng óng ánh lơ lửng */}
            {stardustOpacity > 0 && (
                <GoldenStardust starCount={16} grainCount={24} opacity={stardustOpacity} zIndex={18} />
            )}
        </div>
    );
};
