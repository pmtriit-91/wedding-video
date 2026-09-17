import React from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
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

    // 3 ảnh tiêu biểu ngày trọng đại: bố cục đối xứng hài hòa (chân dung 2 bên, cận cảnh lãng mạn ở giữa)
    const displayPhotos = [cfg.photos[1] || cfg.photos[0], cfg.photos[0], cfg.photos[2] || cfg.photos[1]];

    // Đẩy ảnh xuống phía dưới (dương) để giữ nguyên trọn vẹn phần đầu tóc không bị crop
    const photoOffsetsY = [80, 70, 80];

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
                padding: '40px 100px 0 100px',
                zIndex: 20,
            }}
        >
            {/* Cụm thông điệp Ngày trọng đại ở góc trên bên trái (căn thẳng mép trái với dải ảnh) */}
            <div
                style={{
                    width: 2344,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    textAlign: 'left',
                    paddingLeft: 10,
                    transform: `translateX(${textX}px)`,
                    opacity: textOpacity,
                    zIndex: 16,
                    marginTop: 0,
                }}
            >
                {/* Dòng 1: Dẫn dắt cảm xúc (Cormorant Garamond nghiêng 76px) */}
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

                    {/* Lớp ánh kim loáng sáng quét qua dòng tiêu đề chính */}
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

                {/* Dòng 2: Lời khẳng định quan trọng (Plus Jakarta Sans 45px) */}
                <p
                    style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 45,
                        fontWeight: 600,
                        lineHeight: 1.5,
                        color: '#1E1A17',
                        marginTop: 12,
                        letterSpacing: '0.015em',
                        textShadow: '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(255, 255, 255, 0.85)',
                    }}
                >
                    {cfg.line2}
                </p>
            </div>

            {/* 3 Khung ảnh ngày trọng đại khổ lớn (kích thước đồng nhất với Cảnh 6: 760x1040) */}
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 32,
                    marginTop: 50,
                    zIndex: 16,
                }}
            >
                {displayPhotos.map((photoSrc, idx) => {
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
                                width={760}
                                height={1040}
                                variant="studio"
                            />
                        </div>
                    );
                })}
            </div>

            {/* Bụi sao vàng óng ánh lơ lửng */}
            {/* {stardustOpacity > 0 && (
                <GoldenStardust starCount={16} grainCount={24} opacity={stardustOpacity} zIndex={18} />
            )} */}
        </div>
    );
};
