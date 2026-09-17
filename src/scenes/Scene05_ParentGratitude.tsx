import React from 'react';
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { GoldenStardust } from '../components/GoldenStardust';
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

    // ========================================================
    // Hiệu ứng di chuyển chậm rãi, tinh tế cho cụm 3 ảnh ghép:
    // - Ảnh 1 (trên cùng cột trái): trượt từ trên top xuống (-140px -> 0px)
    // - Ảnh 2 (dưới cùng cột trái): trượt từ dưới bottom lên (140px -> 0px)
    // - Ảnh 3 (ảnh chính cột phải): trượt từ phải sang trái (170px -> 0px)
    // Thời lượng 150 - 160 frames (~2.5s - 2.67s) êm dịu tương tự Cảnh 10
    // ========================================================
    // 1. Ảnh 1: Sổ thề nguyện (Top)
    const photo1Y = interpolate(frame, [8, 158], [-140, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });
    const photo1Opacity = interpolate(frame, [8, 45], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 2. Ảnh 2: Ngoại cảnh ngắm hoa (Bottom)
    const photo2Y = interpolate(frame, [14, 164], [140, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });
    const photo2Opacity = interpolate(frame, [14, 51], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // 3. Ảnh 3: Ảnh chính lớn (Right)
    const photo3X = interpolate(frame, [10, 170], [170, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });
    const photo3Opacity = interpolate(frame, [10, 48], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

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

    // Hiệu ứng gõ chữ (Typewriter) mượt mà không giật layout - tốc độ từ tốn, thư thái
    // 1. Tiêu đề (cfg.title: 68 ký tự): gõ từ tốn từ frame 20 đến 130 (~1.8s)
    const titleCharsCount = Array.from(cfg.title).length;
    const titleProgress = interpolate(frame, [20, 130], [0, titleCharsCount], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const titleChars = Math.floor(titleProgress);
    const isTitleTyping = frame >= 20 && frame <= 150;

    // 2. Lời nhắn tri ân (cfg.message: 56 ký tự): gõ nối tiếp chậm rãi từ frame 155 đến 315 (~2.7s)
    // Đúng frame 315 (giây thứ 5.25), chữ "vun đắp." gõ xong trọn vẹn
    const messageCharsCount = Array.from(cfg.message).length;
    const messageProgress = interpolate(frame, [155, 315], [0, messageCharsCount], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const messageChars = Math.floor(messageProgress);
    const isMessageTyping = frame >= 155 && frame <= 365;

    // Con trỏ nhấp nháy ánh kim vàng
    const cursorBlink = Math.sin((frame / 8) * Math.PI) > 0 ? 1 : 0;
    const cursorFade = interpolate(frame, [325, 365], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Đường gạch vàng chân chữ mở rộng ra ngay khi hoàn tất chữ "vun đắp."
    const lineProgress = interpolate(frame, [315, 355], [0, 140], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });

    // Bụi sao vàng óng ánh tỏa sáng nhẹ nhàng
    const stardustOpacity = interpolate(frame, [25, 60, durationInFrames - 30, durationInFrames], [0, 0.3, 0.3, 0], {
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
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 110px',
                zIndex: 20,
            }}
        >
            {/* Lớp nền ảnh thiệp cảm ơn Bố Mẹ phủ full màn hình bên trái với mép chuyển nhòe mượt mà */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    width: 1450,
                    overflow: 'hidden',
                    pointerEvents: 'none',
                    zIndex: 1,
                    WebkitMaskImage:
                        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)',
                    maskImage:
                        'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 48%, rgba(0,0,0,0.5) 75%, rgba(0,0,0,0) 100%)',
                }}
            >
                <Img
                    src={staticFile('decor/camonbame.png')}
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'left center',
                        opacity: 0.78,
                        filter: 'brightness(102%) contrast(102%)',
                    }}
                />

                {/* Lớp phủ chuyển tiếp lụa ấm áp để hòa quyện êm dịu với tone màu satin chung */}
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        background:
                            'linear-gradient(to right, rgba(247, 243, 235, 0.35) 0%, rgba(247, 243, 235, 0.55) 40%, rgba(247, 243, 235, 0.88) 75%, #F7F3EB 100%)',
                    }}
                />
            </div>

            {/* Cụm lời tri ân Bố Mẹ bên trái */}
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    flexDirection: 'column',
                    maxWidth: 1040,
                    transform: `translateX(${textX}px)`,
                    opacity: textOpacity,
                    zIndex: 5,
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
                            fontWeight: 600,
                            color: '#A87932',
                            letterSpacing: '0.02em',
                            textShadow: '0 2px 14px rgba(255, 255, 255, 0.95), 0 0 20px rgba(255, 255, 255, 0.9)',
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
                                fontWeight: 600,
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

                {/* Tiêu đề gõ phím mượt mà - tuyệt đối không giật layout */}
                <p
                    style={{
                        fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                        fontSize: 64,
                        fontWeight: 700,
                        lineHeight: 1.35,
                        color: '#161311',
                        marginBottom: 28,
                        letterSpacing: '0.01em',
                        textShadow:
                            '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.8)',
                    }}
                >
                    {frame < 20 ? (
                        <span style={{ opacity: 0 }}>{cfg.title}</span>
                    ) : (
                        Array.from(cfg.title).map((char, index) => {
                            const isVisible = index < titleChars;
                            const isCurrent = index === titleChars - 1;
                            const isCursorHere = (isCurrent || (titleChars === 0 && index === 0)) && isTitleTyping;
                            const showCursor = isCursorHere && (titleChars >= titleCharsCount ? cursorBlink : 1);
                            return (
                                <span
                                    key={index}
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        position: isCursorHere ? 'relative' : undefined,
                                    }}
                                >
                                    {char}
                                    {showCursor && (
                                        <span
                                            style={{
                                                position: 'absolute',
                                                left: titleChars === 0 && index === 0 ? 0 : '100%',
                                                top: '12%',
                                                width: 3,
                                                height: '76%',
                                                backgroundColor: '#A87932',
                                                marginLeft: titleChars === 0 && index === 0 ? 0 : 3,
                                                borderRadius: 1,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    )}
                                </span>
                            );
                        })
                    )}
                </p>

                {/* Lời nhắn tri ân gõ nối tiếp cho đến chữ 'vun đắp.' - tuyệt đối không giật layout */}
                <p
                    style={{
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: 38,
                        fontWeight: 600,
                        lineHeight: 1.65,
                        color: '#1E1A17',
                        letterSpacing: '0.015em',
                        textShadow: '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(255, 255, 255, 0.85)',
                    }}
                >
                    {frame < 155 ? (
                        <span style={{ opacity: 0 }}>{cfg.message}</span>
                    ) : (
                        Array.from(cfg.message).map((char, index) => {
                            const isVisible = index < messageChars;
                            const isCurrent = index === messageChars - 1;
                            const isCursorHere = (isCurrent || (messageChars === 0 && index === 0)) && isMessageTyping;
                            const cursorOpacity = messageChars >= messageCharsCount ? cursorBlink * cursorFade : 1;
                            const showCursor = isCursorHere && cursorOpacity > 0;
                            return (
                                <span
                                    key={index}
                                    style={{
                                        opacity: isVisible ? 1 : 0,
                                        position: isCursorHere ? 'relative' : undefined,
                                    }}
                                >
                                    {char}
                                    {showCursor && (
                                        <span
                                            style={{
                                                position: 'absolute',
                                                left: messageChars === 0 && index === 0 ? 0 : '100%',
                                                top: '14%',
                                                width: 2.5,
                                                height: '74%',
                                                backgroundColor: '#A87932',
                                                marginLeft: messageChars === 0 && index === 0 ? 0 : 2.5,
                                                borderRadius: 1,
                                                opacity: cursorOpacity,
                                                pointerEvents: 'none',
                                            }}
                                        />
                                    )}
                                </span>
                            );
                        })
                    )}
                </p>

                {/* Đường chỉ vàng chân chữ mở rộng ra ngay khi hoàn thành chữ 'vun đắp.' */}
                <div style={{ position: 'relative' }}>
                    <div
                        style={{
                            marginTop: 40,
                            width: lineProgress,
                            height: 3,
                            background: 'linear-gradient(to right, #C69B56, rgba(198, 155, 86, 0.2))',
                            borderRadius: 2,
                        }}
                    />
                </div>
            </div>

            {/* Cụm ảnh bên phải: Bố cục 2 cột chuẩn tỉ lệ ảnh gốc 2:3 (giữ trọn vẹn 100% hình ảnh không bị cắt) */}
            <div
                style={{
                    position: 'relative',
                    display: 'flex',
                    gap: 24,
                    alignItems: 'center',
                    zIndex: 5,
                }}
            >
                {/* Cột 1: 2 ảnh chi tiết xếp dọc khổ rộng thoáng đạt (580 x 545) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                    {/* Ảnh 1: Sổ thề nguyện To my husband / To my wife - trượt từ trên top xuống */}
                    <div
                        style={{
                            transform: `translateY(${photo1Y}px)`,
                            opacity: photo1Opacity,
                            willChange: 'transform, opacity',
                        }}
                    >
                        <PhotoFrame
                            src={cfg.vowBookPhoto}
                            durationInFrames={durationInFrames}
                            direction="zoom-in"
                            initialScale={1.02}
                            finalScale={1.08}
                            transformOrigin="50% 42%"
                            imageOffsetX={-40}
                            imageOffsetY={100}
                            width={580}
                            height={545}
                            variant="studio"
                        />
                    </div>

                    {/* Ảnh 2: Ảnh ngoại cảnh chú rể & cô dâu ngắm hoa - trượt từ dưới bottom lên */}
                    <div
                        style={{
                            transform: `translateY(${photo2Y}px)`,
                            opacity: photo2Opacity,
                            willChange: 'transform, opacity',
                        }}
                    >
                        <PhotoFrame
                            src={cfg.outdoorPhotos[0]}
                            durationInFrames={durationInFrames}
                            direction="zoom-in"
                            initialScale={1.0}
                            finalScale={1.06}
                            transformOrigin="50% 62%"
                            imageOffsetY={-30}
                            width={580}
                            height={545}
                            variant="studio"
                        />
                    </div>
                </div>

                {/* Cột 2: Ảnh chân dung lớn trung tâm - trượt từ phải sang trái */}
                <div
                    style={{
                        transform: `translateX(${photo3X}px)`,
                        opacity: photo3Opacity,
                        willChange: 'transform, opacity',
                    }}
                >
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

            {/* Bụi sao vàng óng ánh tỏa sáng khi hoa đơm hoa kết trái */}
            {stardustOpacity > 0 && (
                <GoldenStardust starCount={18} grainCount={28} opacity={stardustOpacity} zIndex={18} />
            )}
        </div>
    );
};
