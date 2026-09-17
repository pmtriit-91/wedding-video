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

    // Hiệu ứng dòng chữ trích dẫn xuất hiện từ bên phải
    const textSpring = spring({
        frame: frame - 10,
        fps,
        config: { damping: 15, mass: 0.85 },
    });
    const textX = interpolate(textSpring, [0, 1], [35, 0]);
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
                justifyContent: 'flex-start',
                padding: '50px 100px 0 100px',
                zIndex: 20,
            }}
        >
            {/* Vùng góc trái: Giàn hoa vàng nghệ thuật (ton-sur-ton với váy vàng cô dâu ở ảnh 1) */}
            <div
                style={{
                    position: 'absolute',
                    top: -20,
                    left: -20,
                    width: 900,
                    height: 1220,
                    pointerEvents: 'none',
                    zIndex: 5,
                    overflow: 'hidden',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 90% 85% at 10% 10%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0) 100%)',
                    maskImage:
                        'radial-gradient(ellipse 90% 85% at 10% 10%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.85) 65%, rgba(0,0,0,0) 100%)',
                }}
            >
            </div>

            {/* Vùng góc phải: Vòm cổng hoa hồng phấn nguyên bản (ton-sur-ton với áo dài hồng cô dâu ở ảnh 3) */}
            <div
                style={{
                    position: 'absolute',
                    top: -40,
                    right: -70,
                    width: 760,
                    height: 1400,
                    pointerEvents: 'none',
                    zIndex: 5,
                    overflow: 'hidden',
                    WebkitMaskImage:
                        'radial-gradient(ellipse 95% 85% at 95% 10%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 65%, rgba(0,0,0,0) 100%)',
                    maskImage:
                        'radial-gradient(ellipse 95% 85% at 95% 10%, rgba(0,0,0,1) 40%, rgba(0,0,0,0.8) 65%, rgba(0,0,0,0) 100%)',
                }}
            >
            </div>

            {/* Cụm thông điệp Kỷ niệm ở góc trên bên phải (đối xứng với Cảnh 7, căn thẳng mép phải với dải ảnh) */}
            <div
                style={{
                    width: 1992,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    textAlign: 'right',
                    paddingRight: 30,
                    transform: `translateX(${textX}px)`,
                    opacity: textOpacity,
                    zIndex: 16,
                    marginTop: 10,
                }}
            >
                {/* Dòng 1: Dẫn dắt bay bổng (Cormorant Garamond nghiêng 68px) */}
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
                        {cfg.intro || 'Những ngày đầu,'}
                    </span>

                    {/* Lớp ánh kim loáng sáng quét qua dòng tiêu đề chính */}
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
                            {cfg.intro || '10 năm quen nhau,'}
                        </div>
                    )}
                </div>

                {/* Dòng 2: Lời bộc bạch tâm sự (Plus Jakarta Sans 38px) */}
                <p
                    style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 38,
                        fontWeight: 600,
                        lineHeight: 1.5,
                        color: '#221E1C',
                        marginTop: 12,
                        letterSpacing: '0.015em',
                        textShadow: '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(255, 255, 255, 0.85)',
                    }}
                >
                    {cfg.quote}
                </p>
            </div>

            {/* 3 Khung ảnh kỷ niệm hẹn hò khổ lớn (kéo sát khung bottom) */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 36,
                    marginTop: 155,
                    zIndex: 16,
                }}
            >
                {cfg.photos.map((photoSrc, idx) => {
                    // Thời điểm xuất hiện lần lượt từng ảnh: mỗi ảnh cách nhau 45 frames (~0.75s)
                    const startFrame = 16 + idx * 45;
                    const endFrame = startFrame + 100; // Thời lượng chuyển động 100 frames (~1.67s)

                    // Hiệu ứng trượt từ dưới lên chậm rãi, êm dịu
                    const photoY = interpolate(frame, [startFrame, endFrame], [80, 0], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                        easing: Easing.out(Easing.quad),
                    });
                    const photoOpacity = interpolate(frame, [startFrame, startFrame + 35], [0, 1], {
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp',
                    });

                    // Độ dịch vị trí ảnh lên phía trên (top) trong khung chứa của từng ảnh
                    const photoOffsetsY = [-60, -105, -60];

                    return (
                        <div
                            key={idx}
                            style={{
                                transform: `translateY(${photoY}px)`,
                                opacity: photoOpacity,
                                willChange: 'transform, opacity',
                            }}
                        >
                            <PhotoFrame
                                src={photoSrc}
                                durationInFrames={durationInFrames}
                                direction={idx === 0 ? 'pan-right' : idx === 1 ? 'zoom-out' : 'pan-left'}
                                imageOffsetY={photoOffsetsY[idx]}
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
