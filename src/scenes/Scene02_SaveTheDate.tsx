import React from 'react';
import { Easing, interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { GoldenStardust } from '../components/GoldenStardust';
import { KenBurnsImage } from '../components/KenBurnsImage';
import { weddingConfig } from '../config/weddingConfig';

export const Scene02_SaveTheDate: React.FC<{ durationInFrames: number }> = ({ durationInFrames }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const cfg = weddingConfig.scenes.scene02_saveTheDate;

    // Hiệu ứng Fade in / out toàn cảnh
    const opacity = interpolate(frame, [0, 25, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
    });

    // Hiệu ứng xuất hiện của Thẻ trắng cao cấp (White Card Entrance)
    const cardSpring = spring({
        frame: frame - 4,
        fps,
        config: { damping: 18, mass: 0.95 },
    });
    const cardScale = interpolate(cardSpring, [0, 1], [0.97, 1]);
    const cardOpacity = interpolate(cardSpring, [0, 1], [0, 1]);

    // Tiêu đề SAVE the DATE xuất hiện nhẹ nhàng
    const titleSpring = spring({
        frame: frame - 10,
        fps,
        config: { damping: 16, mass: 0.9 },
    });
    const titleY = interpolate(titleSpring, [0, 1], [20, 0]);
    const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

    // Hiệu ứng ánh sáng loáng nhẹ qua các con số 27 - 09 - 26 (từ frame 130 -> 190)
    let shimmerProgress = -1;
    if (frame >= 130 && frame <= 190) {
        shimmerProgress = interpolate(frame, [130, 190], [0, 1]);
    }
    const shineX = interpolate(shimmerProgress, [0, 1], [140, -40]);

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                opacity,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 20,
            }}
        >
            {/* Hiệu ứng sao rơi & bụi vàng tiên cảnh trôi chéo qua khung hình */}
            <GoldenStardust starCount={24} grainCount={32} speed={0.85} showSunbeam={true} zIndex={30} />

            {/* Thẻ Card Trắng Bo Góc Thanh Lịch Chuẩn Clip Gốc (White Luxury Card) */}
            <div
                style={{
                    width: 2190,
                    height: 1120,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 36,
                    boxShadow: '0 35px 90px rgba(0, 0, 0, 0.14), 0 12px 32px rgba(180, 150, 100, 0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '36px 60px 52px 60px',
                    transform: `scale(${cardScale})`,
                    opacity: cardOpacity,
                    position: 'relative',
                    zIndex: 10,
                }}
            >
                {/* Header: SAVE the DATE chuẩn typography Didone thanh lịch của clip gốc */}
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'baseline',
                        justifyContent: 'center',
                        transform: `translate3d(0, ${titleY}px, 0)`,
                        opacity: titleOpacity,
                        zIndex: 2,
                        marginTop: 4,
                    }}
                >
                    <span
                        style={{
                            fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
                            fontSize: 88,
                            fontWeight: 600,
                            letterSpacing: '0.14em',
                            color: '#1A1A1A',
                        }}
                    >
                        SAVE
                    </span>
                    <span
                        style={{
                            fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
                            fontStyle: 'italic',
                            fontSize: 82,
                            fontWeight: 400,
                            color: '#1A1A1A',
                            margin: '0 22px',
                            transform: 'translateY(-4px)',
                        }}
                    >
                        the
                    </span>
                    <span
                        style={{
                            fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
                            fontSize: 88,
                            fontWeight: 600,
                            letterSpacing: '0.14em',
                            color: '#1A1A1A',
                        }}
                    >
                        DATE
                    </span>
                </div>

                {/* 3 Khung ảnh Đồi thông với Con số Ngày cưới To Trắng ở Đáy Ảnh */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        gap: 26,
                        width: '100%',
                    }}
                >
                    {cfg.photos.map((photoSrc, idx) => {
                        // Hiệu ứng xuất hiện tuần tự thong thả, chậm rãi từ trái sang phải
                        const photoStart = 16 + idx * 36;
                        const photoProgress = interpolate(frame, [photoStart, photoStart + 52], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                            easing: Easing.out(Easing.cubic),
                        });

                        const photoOpacity = interpolate(frame, [photoStart, photoStart + 52], [0, 1], {
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp',
                            easing: Easing.out(Easing.quad),
                        });

                        const photoY = interpolate(photoProgress, [0, 1], [30, 0]);
                        const photoScale = interpolate(photoProgress, [0, 1], [0.98, 1]);

                        // Dữ liệu số ngày cưới to bản ở đáy ảnh
                        const numText = idx === 0 ? '27' : idx === 1 ? '09' : '26';

                        return (
                            <div
                                key={idx}
                                style={{
                                    width: 650,
                                    height: 875,
                                    position: 'relative',
                                    transform: `translate3d(0, ${photoY}px, 0) scale(${photoScale})`,
                                    opacity: photoOpacity,
                                    borderRadius: 10,
                                    overflow: 'hidden',
                                    isolation: 'isolate',
                                    WebkitMaskImage: '-webkit-radial-gradient(white, black)',
                                    boxShadow: '0 14px 32px rgba(0, 0, 0, 0.15)',
                                    willChange: 'transform, opacity',
                                    backgroundColor: '#2C2C2C',
                                }}
                            >
                                <KenBurnsImage
                                    src={photoSrc}
                                    durationInFrames={durationInFrames}
                                    direction={idx === 0 ? 'zoom-in' : idx === 1 ? 'pan-up' : 'zoom-out'}
                                />

                                {/* Con số ngày cưới to bản màu trắng tinh khôi đặt góc dưới bên phải - NẰM TRỌN TRONG KHUNG ẢNH */}
                                <div
                                    style={{
                                        position: 'absolute',
                                        bottom: 24,
                                        right: 20,
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-end',
                                        pointerEvents: 'none',
                                        zIndex: 10,
                                        lineHeight: 1,
                                    }}
                                >
                                    {/* Trường hợp ảnh 2: Số 09 có nét cắt chéo nghệ thuật ở chữ số 0 (nghiêng thuận / như clip gốc) */}
                                    {numText === '09' ? (
                                        <div
                                            style={{
                                                position: 'relative',
                                                display: 'flex',
                                                alignItems: 'flex-end',
                                                justifyContent: 'flex-end',
                                                fontFamily: "'Bodoni Moda', 'Playfair Display', serif",
                                                fontSize: 350,
                                                fontWeight: 700,
                                                lineHeight: 0.85,
                                                color: '#FFFFFF',
                                                letterSpacing: '-0.04em',
                                                textShadow:
                                                    '0 8px 32px rgba(0, 0, 0, 0.55), 0 2px 10px rgba(0, 0, 0, 0.4)',
                                            }}
                                        >
                                            {/* Chữ số 0 có nét cắt chéo nghệ thuật nghiêng theo chiều / */}
                                            <span
                                                style={{
                                                    position: 'relative',
                                                    display: 'inline-block',
                                                }}
                                            >
                                                0
                                                <span
                                                    style={{
                                                        position: 'absolute',
                                                        top: '50%',
                                                        left: '50%',
                                                        width: 5,
                                                        height: '82%',
                                                        backgroundColor: '#FFFFFF',
                                                        transform: 'translate(-50%, -50%) rotate(34deg)',
                                                        borderRadius: 3,
                                                        boxShadow: '0 3px 10px rgba(0, 0, 0, 0.45)',
                                                    }}
                                                />
                                            </span>
                                            <span>9</span>
                                        </div>
                                    ) : (
                                        <div
                                            style={{
                                                position: 'relative',
                                                fontFamily: "'Bodoni Moda', 'Playfair Display', serif",
                                                fontSize: 350,
                                                fontWeight: 700,
                                                lineHeight: 0.85,
                                                color: '#FFFFFF',
                                                letterSpacing: '-0.04em',
                                                textShadow:
                                                    '0 8px 32px rgba(0, 0, 0, 0.55), 0 2px 10px rgba(0, 0, 0, 0.4)',
                                            }}
                                        >
                                            {numText}
                                        </div>
                                    )}

                                    {/* Vệt ánh sáng kim cương loáng nhẹ quét qua con số */}
                                    {shimmerProgress >= 0 && (
                                        <div
                                            style={{
                                                position: 'absolute',
                                                inset: 0,
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                alignItems: 'flex-end',
                                                fontFamily: "'Bodoni Moda', 'Playfair Display', serif",
                                                fontSize: 350,
                                                fontWeight: 700,
                                                lineHeight: 0.85,
                                                letterSpacing: '-0.04em',
                                                background:
                                                    'linear-gradient(110deg, transparent 20%, rgba(255, 255, 255, 0.85) 45%, #FFFFFF 55%, transparent 80%)',
                                                backgroundSize: '220% 100%',
                                                backgroundPosition: `${shineX}% 0`,
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                pointerEvents: 'none',
                                                willChange: 'background-position',
                                            }}
                                        >
                                            {numText}
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
