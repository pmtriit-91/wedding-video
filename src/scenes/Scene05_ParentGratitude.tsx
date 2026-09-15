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

    // =========================================================================
    // HIỆU ỨNG 2 HỌA TIẾT HOA VĂN TINH TẾ (KÍCH HOẠT TẠI FRAME 315)
    // =========================================================================

    // 1. Cành hoa xoay ngang ở khoảng trống phía trên nội dung (decor-top-horizontal-branch)
    const topBranchSpring = spring({
        frame: Math.max(0, frame - 315),
        fps,
        config: { damping: 18, mass: 1.15, stiffness: 50 },
    });
    const topBranchGrow = interpolate(topBranchSpring, [0, 1], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const topBranchOpacity = frame >= 315 ? interpolate(topBranchSpring, [0, 0.08, 1], [0, 0.95, 0.95]) : 0;
    const topBranchScale = interpolate(topBranchSpring, [0, 1], [0.92, 1]);
    const topBranchTranslateX = interpolate(topBranchSpring, [0, 1], [-18, 0]);

    // 2. Cành hoa xiên góc 45 độ ở khoảng trống phía dưới nội dung (decor-bottom-diagonal-branch)
    const bottomBranchSpring = spring({
        frame: Math.max(0, frame - 318),
        fps,
        config: { damping: 18, mass: 1.15, stiffness: 48 },
    });
    const bottomBranchGrow = interpolate(bottomBranchSpring, [0, 1], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const bottomBranchOpacity = frame >= 318 ? interpolate(bottomBranchSpring, [0, 0.08, 1], [0, 0.95, 0.95]) : 0;
    const bottomBranchScale = interpolate(bottomBranchSpring, [0, 1], [0.88, 1]);
    const bottomBranchTranslateY = interpolate(bottomBranchSpring, [0, 1], [25, 0]);

    // Bụi sao vàng óng ánh tỏa ra khi hoa bắt đầu bung nở
    const stardustOpacity = interpolate(frame, [315, 345, 575, 600], [0, 0.35, 0.35, 0], {
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
            {/* Họa tiết 1: Cành hoa xoay ngang ở khoảng trống phía trên nội dung (từ 657877458110160694.jpeg) */}
            {topBranchOpacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        left: 110,
                        top: 25,
                        width: 860,
                        height: 'auto',
                        opacity: topBranchOpacity,
                        transform: `scale(${topBranchScale}) translateX(${topBranchTranslateX}px)`,
                        transformOrigin: 'top left',
                        WebkitMaskImage:
                            topBranchGrow < 100
                                ? `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${topBranchGrow}%, rgba(0,0,0,0) ${Math.min(100, topBranchGrow + 15)}%)`
                                : undefined,
                        maskImage:
                            topBranchGrow < 100
                                ? `linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${topBranchGrow}%, rgba(0,0,0,0) ${Math.min(100, topBranchGrow + 15)}%)`
                                : undefined,
                        zIndex: 16,
                        pointerEvents: 'none',
                        willChange: 'transform, opacity',
                    }}
                >
                    <Img
                        src={staticFile('decor/decor-top-horizontal-branch.png')}
                        style={{
                            width: 860,
                            height: 'auto',
                            filter: 'drop-shadow(0 2px 10px rgba(140, 110, 70, 0.15))',
                        }}
                    />
                </div>
            )}

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

                {/* Tiêu đề gõ phím mượt mà - tuyệt đối không giật layout */}
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
                                                backgroundColor: weddingConfig.colors.goldPrimary,
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
                        fontWeight: 400,
                        lineHeight: 1.65,
                        color: '#4A433D',
                        letterSpacing: '0.015em',
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
                                                backgroundColor: weddingConfig.colors.goldPrimary,
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

            {/* Họa tiết 2: Cành hoa xiên góc 45 độ ở khoảng trống phía dưới nội dung (từ 827043919117674755.jpeg) */}
            {bottomBranchOpacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        left: 140,
                        bottom: -15,
                        height: 520,
                        width: 'auto',
                        opacity: bottomBranchOpacity,
                        transform: `scale(${bottomBranchScale}) translateY(${bottomBranchTranslateY}px) rotate(16deg)`,
                        transformOrigin: '75px bottom',
                        WebkitMaskImage:
                            bottomBranchGrow < 100
                                ? `linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${bottomBranchGrow}%, rgba(0,0,0,0) ${Math.min(100, bottomBranchGrow + 16)}%)`
                                : undefined,
                        maskImage:
                            bottomBranchGrow < 100
                                ? `linear-gradient(45deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${bottomBranchGrow}%, rgba(0,0,0,0) ${Math.min(100, bottomBranchGrow + 16)}%)`
                                : undefined,
                        zIndex: 16,
                        pointerEvents: 'none',
                        willChange: 'transform, opacity',
                    }}
                >
                    <Img
                        src={staticFile('decor/decor-bottom-diagonal-branch.png')}
                        style={{
                            height: 520,
                            width: 'auto',
                            filter: 'drop-shadow(0 3px 12px rgba(140, 110, 70, 0.16))',
                        }}
                    />
                </div>
            )}

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


            {/* Bụi sao vàng óng ánh tỏa sáng khi hoa đơm hoa kết trái */}
            {stardustOpacity > 0 && (
                <GoldenStardust starCount={18} grainCount={28} opacity={stardustOpacity} zIndex={18} />
            )}
        </div>
    );
};
