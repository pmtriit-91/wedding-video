import React from 'react';
import { Easing, Img, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { FloralDecor } from '../components/FloralDecor';
import { GoldenDust } from '../components/GoldenDust';
import { PhotoFrame } from '../components/PhotoFrame';
import { weddingConfig } from '../config/weddingConfig';

export const Scene12_Outro: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
    const frame = useCurrentFrame();
    const cfg = weddingConfig.scenes.scene12_outro;

    // Fade in ở đầu, và fade out êm đềm ở cuối bài hát
    const opacity = interpolate(frame, [0, 30, durationInFrames - 50, durationInFrames], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
    });

    // Hiệu ứng trôi êm ái cho cụm chữ bên phải
    const textTranslateX = interpolate(frame, [15, 105], [60, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });
    const textOpacity = interpolate(frame, [15, 75], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Hiệu ứng trôi êm và xuất hiện cho khung ảnh bên trái
    const photoTranslateX = interpolate(frame, [20, 110], [-50, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });
    const photoOpacity = interpolate(frame, [20, 80], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Hiệu ứng loáng sáng ánh kim quét qua dòng chữ cảm ơn
    let shimmerProgress = -1;
    if (frame >= 95 && frame <= 155) {
        shimmerProgress = interpolate(frame, [95, 155], [0, 1]);
    } else if (frame >= 280 && frame <= 340) {
        shimmerProgress = interpolate(frame, [280, 340], [0, 1]);
    } else if (frame >= 460 && frame <= 520) {
        shimmerProgress = interpolate(frame, [460, 520], [0, 1]);
    }
    const shineX = interpolate(shimmerProgress, [0, 1], [130, -30]);
    const shineOpacity = shimmerProgress >= 0 ? interpolate(shimmerProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) : 0;

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                opacity,
                zIndex: 20,
                overflow: 'hidden',
            }}
        >
            {/* ========================================================================= */}
            {/* KHUNG ẢNH STUDIO NGHỆ THUẬT BÊN TRÁI (KÍCH THƯỚC VỪA VẶN, CĂN GIỮA DỌC) */}
            {/* ========================================================================= */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: 120,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transform: `translateX(${photoTranslateX}px)`,
                    opacity: photoOpacity,
                    willChange: 'transform, opacity',
                    zIndex: 15,
                    filter: 'drop-shadow(0 30px 70px rgba(35, 20, 10, 0.28)) drop-shadow(0 10px 25px rgba(0, 0, 0, 0.08))',
                }}
            >
                <PhotoFrame
                    src={cfg.photo}
                    durationInFrames={durationInFrames}
                    direction="zoom-out"
                    initialScale={1.08}
                    finalScale={1.02}
                    width={780}
                    height={1170}
                    variant="studio"
                    style={{
                        borderRadius: 24,
                        border: '1.5px solid rgba(255, 255, 255, 0.65)',
                    }}
                />
            </div>

            {/* Ánh sáng vàng dịu phía sau khung ảnh (Golden Ambient Glow) */}
            <div
                style={{
                    position: 'absolute',
                    left: 110,
                    top: '22%',
                    width: 700,
                    height: 800,
                    borderRadius: '50%',
                    background:
                        'radial-gradient(circle, rgba(229, 195, 135, 0.22) 0%, rgba(198, 155, 86, 0.06) 50%, transparent 75%)',
                    filter: 'blur(70px)',
                    pointerEvents: 'none',
                    zIndex: 5,
                }}
            />

            {/* Hạt bụi vàng lơ lửng cinematic */}
            <GoldenDust count={25} zIndex={22} />


            {/* ========================================================================= */}
            {/* CỤM LỜI CẢM ƠN KẾT THÚC BÊN PHẢI (NẰM TRỌN TRONG TRÁI TIM HOA HỒNG) */}
            {/* ========================================================================= */}
            <div
                style={{
                    position: 'absolute',
                    left: 900,
                    right: 180,
                    top: 0,
                    bottom: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    transform: `translateX(${textTranslateX}px)`,
                    opacity: textOpacity,
                    willChange: 'transform, opacity',
                    zIndex: 25,
                }}
            >
                {/* Dòng chữ viết tay nghệ thuật */}
                <div
                    style={{
                        fontFamily: "'Great Vibes', cursive",
                        fontSize: 96,
                        fontWeight: 600,
                        color: '#A87932',
                        marginBottom: 10,
                        letterSpacing: '0.02em',
                        textShadow: '0 2px 14px rgba(255, 255, 255, 0.95), 0 0 20px rgba(255, 255, 255, 0.9)',
                    }}
                >
                    Thank you so much
                </div>

                {/* Tiêu đề chính Chúng Con Xin Cảm Ơn Ạ có lớp loáng sáng vàng */}
                <div style={{ position: 'relative' }}>
                    <h2
                        style={{
                            fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                            fontSize: 78,
                            fontWeight: 700,
                            letterSpacing: '0.05em',
                            color: '#161311',
                            lineHeight: 1.25,
                            margin: 0,
                            textTransform: 'uppercase',
                            textShadow: '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 12px rgba(255, 255, 255, 0.9)',
                        }}
                    >
                        {cfg.thankYouText}
                    </h2>

                    {shimmerProgress >= 0 && (
                        <div
                            style={{
                                position: 'absolute',
                                inset: 0,
                                fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                                fontSize: 78,
                                fontWeight: 700,
                                letterSpacing: '0.05em',
                                lineHeight: 1.25,
                                textTransform: 'uppercase',
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
                            {cfg.thankYouText}
                        </div>
                    )}
                </div>

                {/* Dải phân cách hoàng gia mạ vàng */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 16,
                        margin: '22px 0 26px 0',
                    }}
                >
                    <div
                        style={{
                            width: 70,
                            height: 2.5,
                            background: 'linear-gradient(to right, transparent, #C69B56)',
                        }}
                    />
                    <div
                        style={{
                            width: 140,
                            height: 2.5,
                            backgroundColor: '#C69B56',
                            boxShadow: '0 0 10px rgba(198, 155, 86, 0.4)',
                        }}
                    />
                    <span style={{ color: '#A87932', fontSize: 20, lineHeight: 1 }}>✦</span>
                    <div
                        style={{
                            width: 140,
                            height: 2.5,
                            backgroundColor: '#C69B56',
                            boxShadow: '0 0 10px rgba(198, 155, 86, 0.4)',
                        }}
                    />
                    <div
                        style={{
                            width: 70,
                            height: 2.5,
                            background: 'linear-gradient(to left, transparent, #C69B56)',
                        }}
                    />
                </div>

                {/* Tên cô dâu & chú rể - Phong cách chữ ký hoàng kim ánh kim (Luxury Gold Signature) */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                        fontSize: 66,
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        background:
                            'linear-gradient(135deg, #7A5118 0%, #BA8B40 28%, #E9CB8B 52%, #A2752D 80%, #7A5118 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 1px 2px rgba(255, 255, 255, 0.95))',
                    }}
                >
                    <span>{weddingConfig.brideName}</span>
                    <span
                        style={{
                            fontFamily: "'Great Vibes', cursive",
                            fontSize: 78,
                            fontWeight: 400,
                            color: '#C69B56',
                            WebkitTextFillColor: '#C69B56',
                            margin: '0 18px',
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            transform: 'translateY(-4px)',
                            textTransform: 'none',
                        }}
                    >
                        &
                    </span>
                    <span>{weddingConfig.groomName}</span>
                </div>

                {/* Ngày cưới */}
                <div
                    style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 27,
                        fontWeight: 600,
                        letterSpacing: '0.32em',
                        color: '#A87932',
                        marginTop: 14,
                        textTransform: 'uppercase',
                    }}
                >
                    FOREVER & ALWAYS • {weddingConfig.weddingDate}
                </div>

                {/* Lời nhắn gửi tri ân chân thành */}
                <div
                    style={{
                        fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                        fontStyle: 'italic',
                        fontSize: 42,
                        color: '#4A3F35',
                        lineHeight: 1.6,
                        marginTop: 22,
                        maxWidth: 920,
                        textShadow: '0 1px 2px rgba(255, 255, 255, 0.9)',
                    }}
                >
                    "Cảm ơn vì đã cùng chúng con lưu giữ những khoảnh khắc đẹp nhất và là một phần yêu thương trong ngày
                    trọng đại."
                </div>

                {/* Huy hiệu kỷ niệm mạ vàng */}
                <div
                    style={{
                        marginTop: 26,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 14,
                        padding: '12px 32px',
                        borderRadius: 36,
                        border: '1.5px solid rgba(198, 155, 86, 0.5)',
                        background:
                            'linear-gradient(135deg, rgba(255, 255, 255, 0.85) 0%, rgba(247, 243, 235, 0.65) 100%)',
                        boxShadow: '0 6px 20px rgba(168, 121, 50, 0.12)',
                    }}
                >
                    <span style={{ fontSize: 22, color: '#A87932' }}>💍</span>
                    <span
                        style={{
                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                            fontSize: 21,
                            fontWeight: 700,
                            letterSpacing: '0.24em',
                            color: '#453528',
                            textTransform: 'uppercase',
                        }}
                    >
                        Happy Wedding • 2026
                    </span>
                </div>
            </div>
        </div>
    );
};
