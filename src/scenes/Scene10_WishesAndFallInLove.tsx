import React from 'react';
import { Easing, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { FloralDecor } from '../components/FloralDecor';
import { PhotoFrame } from '../components/PhotoFrame';
import { weddingConfig } from '../config/weddingConfig';

export const Scene10_WishesAndFallInLove: React.FC<{
    durationInFrames: number;
}> = ({ durationInFrames }) => {
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();
    const cfg = weddingConfig.scenes.scene10_wishesAndFallInLove;

    // Tổng thể cảnh: Fade in ban đầu và Fade out cuối cùng
    const overallOpacity = interpolate(frame, [0, 25, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
    });

    // Giai đoạn 1 (Frames 0 -> 360 ~ 6s): Lời chúc phúc & 2 ảnh Dâu Rể
    const phase1Opacity = interpolate(frame, [0, 20, 335, 360], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    });

    const textSpring = spring({
        frame: frame - 10,
        fps,
        config: { damping: 14, mass: 0.8 },
    });

    const photoSpring = spring({
        frame: frame - 14,
        fps,
        config: { damping: 15, mass: 0.9 },
    });

    // Hiệu ứng loáng sáng ánh kim vàng nhẹ nhàng quét qua chữ nội dung
    let shimmerProgress = -1;
    if (frame >= 50 && frame <= 100) {
        shimmerProgress = interpolate(frame, [50, 100], [0, 1]);
    } else if (frame >= 180 && frame <= 230) {
        shimmerProgress = interpolate(frame, [180, 230], [0, 1]);
    }
    const shineX = interpolate(shimmerProgress, [0, 1], [130, -30]);
    const shineOpacity = shimmerProgress >= 0 ? interpolate(shimmerProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) : 0;

    // Giai đoạn 2 (Frames 350 -> 720 ~ 6s): Tri ân khách phương xa & 2 ảnh studio
    const phase2Opacity = interpolate(frame, [350, 375, 695, 720], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    });

    const textSpring2 = spring({
        frame: frame - 355,
        fps,
        config: { damping: 14, mass: 0.8 },
    });

    // Ảnh chính (Hero) trượt thong thả từ trái sang theo góc nghiêng -2.8deg
    const heroTranslateX = interpolate(frame, [355, 485], [-180, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });
    const heroOpacity = interpolate(frame, [355, 385], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    // Ảnh phụ (Inset) trượt thong thả từ phải sang theo góc nghiêng 1deg
    const insetTranslateX = interpolate(frame, [365, 495], [180, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });
    const insetOpacity = interpolate(frame, [365, 395], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    let shimmerProgress2 = -1;
    if (frame >= 390 && frame <= 450) {
        shimmerProgress2 = interpolate(frame, [390, 450], [0, 1]);
    } else if (frame >= 530 && frame <= 590) {
        shimmerProgress2 = interpolate(frame, [530, 590], [0, 1]);
    }
    const shineX2 = interpolate(shimmerProgress2, [0, 1], [130, -30]);
    const shineOpacity2 = shimmerProgress2 >= 0 ? interpolate(shimmerProgress2, [0, 0.2, 0.8, 1], [0, 1, 1, 0]) : 0;

    // Giai đoạn 3 (Frames 710 -> Kết thúc ~ 6s): FALL IN LOVE & Bố cục Editorial Vogue So Le
    const phase3Opacity = interpolate(frame, [710, 735, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
        extrapolateLeft: 'clamp',
    });

    // Chuyển động thong thả, êm dịu cho cụm Editorial Vogue và các đường line
    const phase3LineWidth = interpolate(frame, [715, 765], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });
    const phase3PhotosY = interpolate(frame, [715, 785], [35, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
        easing: Easing.out(Easing.quad),
    });
    const phase3PhotosOpacity = interpolate(frame, [715, 750], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const phase3QuoteOpacity = interpolate(frame, [735, 770], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <div
            style={{
                position: 'absolute',
                inset: 0,
                opacity: overallOpacity,
                zIndex: 20,
            }}
        >
            {/* ========================================================
          GIAI ĐOẠN 1: LỜI CHÚC PHÚC & 2 ẢNH POLAROID DÂU RỂ
      ======================================================== */}
            {phase1Opacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: phase1Opacity,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 75px 0 80px',
                    }}
                >
                    <FloralDecor position="top-right" opacity={0.35} />

                    {/* 2 Khung ảnh cưới Studio Chú rể & Cô dâu - BÊN TRÁI (Tăng x1.5: 855x1200) */}
                    <div
                        style={{
                            display: 'flex',
                            gap: 36,
                            alignItems: 'center',
                            position: 'relative',
                            transform: `translateX(${interpolate(photoSpring, [0, 1], [-40, 0])}px)`,
                            opacity: interpolate(photoSpring, [0, 1], [0, 1]),
                            zIndex: 5,
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <PhotoFrame
                                src={cfg.polaroidPhotos.groom.photo}
                                durationInFrames={360}
                                initialScale={1.28}
                                finalScale={1.42}
                                transformOrigin="50% 32%"
                                direction="zoom-in"
                                width={720}
                                height={1010}
                                variant="studio"
                                style={{ transform: 'rotate(-1.5deg)' }}
                            />
                            <div style={{ marginTop: 15, textAlign: 'center' }}>
                                <div
                                    style={{
                                        fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
                                        fontSize: 44,
                                        fontWeight: 800,
                                        letterSpacing: '0.08em',
                                        color: '#161311',
                                    }}
                                >
                                    {cfg.polaroidPhotos.groom.name}
                                </div>
                                <div
                                    style={{
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontSize: 22,
                                        fontWeight: 800,
                                        letterSpacing: '0.18em',
                                        color: '#9E6D24',
                                        textTransform: 'uppercase',
                                        marginTop: 6,
                                    }}
                                >
                                    {cfg.polaroidPhotos.groom.title}
                                </div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <PhotoFrame
                                src={cfg.polaroidPhotos.bride.photo}
                                durationInFrames={360}
                                direction="zoom-out"
                                initialScale={1.06}
                                finalScale={1.0}
                                transformOrigin="50% 40%"
                                width={720}
                                height={1010}
                                variant="studio"
                                style={{ transform: 'rotate(1.5deg)' }}
                            />
                            <div style={{ marginTop: 15, textAlign: 'center' }}>
                                <div
                                    style={{
                                        fontFamily: "'Playfair Display', 'Cormorant Garamond', serif",
                                        fontSize: 44,
                                        fontWeight: 700,
                                        letterSpacing: '0.08em',
                                        color: '#161311',
                                    }}
                                >
                                    {cfg.polaroidPhotos.bride.name}
                                </div>
                                <div
                                    style={{
                                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                                        fontSize: 22,
                                        fontWeight: 700,
                                        letterSpacing: '0.18em',
                                        color: '#9E6D24',
                                        textTransform: 'uppercase',
                                        marginTop: 6,
                                    }}
                                >
                                    {cfg.polaroidPhotos.bride.title}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Lời chúc phúc BÊN PHẢI */}
                    <div
                        style={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: 720,
                            transform: `translateX(${interpolate(textSpring, [0, 1], [40, 0])}px)`,
                            opacity: interpolate(textSpring, [0, 1], [0, 1]),
                            zIndex: 5,
                        }}
                    >
                        {/* Tiêu đề Blessings & Love có lớp loáng sáng đồng bộ chuẩn Cảnh 5 */}
                        <div style={{ position: 'relative', marginBottom: 18 }}>
                            <div
                                style={{
                                    fontFamily: "'Great Vibes', cursive",
                                    fontSize: 84,
                                    fontWeight: 600,
                                    color: '#A87932',
                                    letterSpacing: '0.02em',
                                    textShadow:
                                        '0 2px 14px rgba(255, 255, 255, 0.95), 0 0 20px rgba(255, 255, 255, 0.9)',
                                }}
                            >
                                {/* Blessings & Love */}
                                Gửi lời yêu thương
                            </div>

                            {shimmerProgress >= 0 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        fontFamily: "'Great Vibes', cursive",
                                        fontSize: 84,
                                        fontWeight: 600,
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
                                    {/* Blessings & Love */}
                                    Gửi lời yêu thương
                                </div>
                            )}
                        </div>

                        {/* Trích dẫn nội dung theo font EB Garamond đồng bộ chuẩn Cảnh 5 */}
                        <div style={{ position: 'relative' }}>
                            <p
                                style={{
                                    fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                                    fontSize: 64,
                                    fontWeight: 700,
                                    lineHeight: 1.38,
                                    color: '#38302A',
                                    letterSpacing: '0.01em',
                                    margin: 0,
                                    textShadow:
                                        '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.8)',
                                }}
                            >
                                {cfg.wishesQuote}
                            </p>

                            {shimmerProgress >= 0 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                                        fontSize: 56,
                                        fontWeight: 700,
                                        lineHeight: 1.38,
                                        letterSpacing: '0.01em',
                                        margin: 0,
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
                                    {cfg.wishesQuote}
                                </div>
                            )}
                        </div>

                        {/* Thanh gạch dưới vàng tinh tế đồng bộ chuẩn Cảnh 9 */}
                        <div
                            style={{
                                marginTop: 32,
                                width: 140,
                                height: 2.5,
                                backgroundColor: '#A87932',
                                boxShadow: '0 0 12px rgba(168, 121, 50, 0.5)',
                            }}
                        />
                    </div>
                </div>
            )}

            {/* ========================================================
          GIAI ĐOẠN 2: TRI ÂN KHÁCH ĐƯỜNG XA & 2 ẢNH STUDIO
      ======================================================== */}
            {phase2Opacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: phase2Opacity,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0 60px 0 110px',
                    }}
                >
                    <FloralDecor position="bottom-left" opacity={0.35} />

                    {/* Lời cảm ơn đường xa bên trái - bố trí dịch trái để nhường trọn không gian cho ảnh */}
                    <div
                        style={{
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            maxWidth: 820,
                            marginLeft: 0,
                            transform: `translateX(${interpolate(textSpring2, [0, 1], [-40, 0])}px)`,
                            opacity: interpolate(textSpring2, [0, 1], [0, 1]),
                            zIndex: 5,
                        }}
                    >
                        {/* Tiêu đề Cảm Ơn viết tay Great Vibes theo chuẩn style Cảnh 5 */}
                        <div style={{ position: 'relative', marginBottom: 18 }}>
                            <div
                                style={{
                                    fontFamily: "'Great Vibes', cursive",
                                    fontSize: 84,
                                    fontWeight: 600,
                                    color: '#A87932',
                                    letterSpacing: '0.02em',
                                    textShadow:
                                        '0 2px 14px rgba(255, 255, 255, 0.95), 0 0 20px rgba(255, 255, 255, 0.9)',
                                }}
                            >
                                {/* Heartfelt Thanks */}
                                Lời tri ân
                            </div>

                            {shimmerProgress2 >= 0 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        fontFamily: "'Great Vibes', cursive",
                                        fontSize: 84,
                                        fontWeight: 600,
                                        letterSpacing: '0.02em',
                                        background:
                                            'linear-gradient(110deg, transparent 20%, rgba(255, 235, 180, 0.7) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 235, 180, 0.7) 60%, transparent 80%)',
                                        backgroundSize: '220% 100%',
                                        backgroundPosition: `${shineX2}% 0`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        pointerEvents: 'none',
                                        opacity: shineOpacity2,
                                        willChange: 'background-position, opacity',
                                    }}
                                >
                                    {/* Heartfelt Thanks */}
                                    Lời tri ân
                                </div>
                            )}
                        </div>

                        {/* Tiêu đề chính Chúng Con Xin Cảm Ơn theo font EB Garamond chuẩn Cảnh 5 */}
                        <div style={{ position: 'relative', marginBottom: 18 }}>
                            <span
                                style={{
                                    fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                                    fontSize: 55,
                                    fontWeight: 700,
                                    color: '#A87932',
                                    letterSpacing: '0.05em',
                                    textTransform: 'uppercase',
                                    textShadow:
                                        '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.8)',
                                }}
                            >
                                CHÚNG CON XIN CẢM ƠN
                            </span>
                        </div>

                        {/* Trích dẫn nội dung theo font EB Garamond cô đọng, to rõ */}
                        <div style={{ position: 'relative' }}>
                            <p
                                style={{
                                    fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                                    fontSize: 64,
                                    fontWeight: 700,
                                    lineHeight: 1.38,
                                    color: '#221E1C',
                                    letterSpacing: '0.01em',
                                    margin: 0,
                                    textShadow:
                                        '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 12px rgba(255, 255, 255, 0.9), 0 0 20px rgba(255, 255, 255, 0.8)',
                                }}
                            >
                                Cảm ơn mọi người không ngại đường sá xa xôi, đã đến chung vui và chúc phúc cho chúng
                                con.
                            </p>

                            {shimmerProgress2 >= 0 && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        inset: 0,
                                        fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                                        fontSize: 64,
                                        fontWeight: 700,
                                        lineHeight: 1.38,
                                        letterSpacing: '0.01em',
                                        margin: 0,
                                        background:
                                            'linear-gradient(110deg, transparent 20%, rgba(255, 235, 180, 0.7) 40%, rgba(255, 255, 255, 1) 50%, rgba(255, 235, 180, 0.7) 60%, transparent 80%)',
                                        backgroundSize: '220% 100%',
                                        backgroundPosition: `${shineX2}% 0`,
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        pointerEvents: 'none',
                                        opacity: shineOpacity2,
                                        willChange: 'background-position, opacity',
                                    }}
                                >
                                    Cảm ơn mọi người không ngại đường sá xa xôi, đã đến chung vui và chúc phúc cho chúng
                                    con.
                                </div>
                            )}
                        </div>

                        {/* Thanh gạch dưới vàng tinh tế đồng bộ chuẩn Cảnh 9 */}
                        <div
                            style={{
                                marginTop: 32,
                                width: 140,
                                height: 2.5,
                                backgroundColor: '#A87932',
                                boxShadow: '0 0 12px rgba(168, 121, 50, 0.5)',
                            }}
                        />
                    </div>

                    {/* 2 Khung ảnh cưới studio tri ân - CÁCH 3: CHÍNH - PHỤ LỒNG GHÉP (HERO & DETAIL INSET) */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            zIndex: 5,
                        }}
                    >
                        {/* Ảnh chính (Hero): Khổ lớn trang trọng, đi từ trái sang theo góc nghiêng -2.8deg */}
                        <div
                            style={{
                                position: 'relative',
                                zIndex: 1,
                                opacity: heroOpacity,
                                transform: `rotate(-2.8deg) translateX(${heroTranslateX}px)`,
                                willChange: 'transform, opacity',
                                filter: 'drop-shadow(0 28px 60px rgba(40, 25, 10, 0.25))',
                            }}
                        >
                            <PhotoFrame
                                src="photos/9/Untitled Session36551.jpg"
                                durationInFrames={510}
                                direction="zoom-in"
                                width={880}
                                height={1180}
                                variant="studio"
                            />
                        </div>

                        {/* Ảnh phụ (Inset): Khổ vừa lồng lệch góc phải, đi từ phải sang theo góc nghiêng 1deg */}
                        <div
                            style={{
                                marginLeft: -55,
                                marginTop: 160,
                                zIndex: 2,
                                position: 'relative',
                                opacity: insetOpacity,
                                transform: `rotate(1deg) translateX(${insetTranslateX}px)`,
                                willChange: 'transform, opacity',
                                filter: 'drop-shadow(0 35px 70px rgba(0, 0, 0, 0.40))',
                            }}
                        >
                            <PhotoFrame
                                src="photos/9/Untitled Session36695.jpg"
                                durationInFrames={510}
                                direction="zoom-out"
                                width={660}
                                height={890}
                                variant="studio"
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* ========================================================
          GIAI ĐOẠN 3: FALL IN LOVE & BỐ CỤC EDITORIAL VOGUE SO LE (CÁCH 1)
      ======================================================== */}
            {phase3Opacity > 0 && (
                <div
                    style={{
                        position: 'absolute',
                        inset: 0,
                        opacity: phase3Opacity,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                    }}
                >
                    <FloralDecor position="top-right" opacity={0.4} />

                    {/* Cụm Editorial Vogue: Trục chỉ vàng kết nối 2 ảnh so le lệch tầng chuẩn clip gốc */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transform: `translateY(${phase3PhotosY}px)`,
                            opacity: phase3PhotosOpacity,
                            willChange: 'transform, opacity',
                        }}
                    >
                        {/* Đường chỉ vàng ngoài cùng bên trái */}
                        <div
                            style={{
                                width: 130 * phase3LineWidth,
                                height: 2.5,
                                background: 'linear-gradient(to right, transparent, #C69B56)',
                            }}
                        />

                        {/* Chữ dọc FALL IN LOVE bên trái */}
                        <div
                            style={{
                                width: 70,
                                height: 600,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <span
                                style={{
                                    position: 'absolute',
                                    transform: 'rotate(-90deg)',
                                    whiteSpace: 'nowrap',
                                    fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                                    fontSize: 56,
                                    fontWeight: 700,
                                    letterSpacing: '0.22em',
                                    color: '#161311',
                                    textTransform: 'uppercase',
                                    textShadow:
                                        '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(255, 255, 255, 0.8)',
                                }}
                            >
                                FALL IN LOVE
                            </span>
                        </div>

                        {/* Đường chỉ vàng nối chữ sang Ảnh 1 */}
                        <div
                            style={{
                                width: 70 * phase3LineWidth,
                                height: 2.5,
                                backgroundColor: '#C69B56',
                            }}
                        />

                        {/* Ảnh 1: Cô dâu giơ cao hoa đỏ (So le lệch cao lên trên) */}
                        <div
                            style={{
                                marginTop: -40,
                                zIndex: 1,
                            }}
                        >
                            <PhotoFrame
                                src={cfg.fallInLovePhotos[0]}
                                durationInFrames={520}
                                direction="zoom-in"
                                initialScale={1.02}
                                finalScale={1.08}
                                width={750}
                                height={1060}
                                variant="studio"
                                style={{
                                    borderRadius: 28,
                                    boxShadow: '0 28px 65px rgba(40, 25, 10, 0.24), 0 10px 25px rgba(0, 0, 0, 0.08)',
                                }}
                            />
                        </div>

                        {/* Đường chỉ vàng nối từ Ảnh 1 sang Chữ giữa */}
                        <div
                            style={{
                                width: 65 * phase3LineWidth,
                                height: 2.5,
                                backgroundColor: '#C69B56',
                            }}
                        />

                        {/* Chữ dọc FALL IN LOVE ở giữa */}
                        <div
                            style={{
                                width: 70,
                                height: 600,
                                position: 'relative',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <span
                                style={{
                                    position: 'absolute',
                                    transform: 'rotate(-90deg)',
                                    whiteSpace: 'nowrap',
                                    fontFamily: "'EB Garamond', 'Cormorant Garamond', serif",
                                    fontSize: 56,
                                    fontWeight: 700,
                                    letterSpacing: '0.22em',
                                    color: '#161311',
                                    textTransform: 'uppercase',
                                    textShadow:
                                        '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(255, 255, 255, 0.8)',
                                }}
                            >
                                FALL IN LOVE
                            </span>
                        </div>

                        {/* Đường chỉ vàng nối từ Chữ giữa sang Ảnh 2 */}
                        <div
                            style={{
                                width: 65 * phase3LineWidth,
                                height: 2.5,
                                backgroundColor: '#C69B56',
                            }}
                        />

                        {/* Ảnh 2: Chú rể ôm cô dâu giữa vườn hoa đỏ (So le lệch thấp xuống dưới) */}
                        <div
                            style={{
                                marginTop: 40,
                                zIndex: 1,
                            }}
                        >
                            <PhotoFrame
                                src={cfg.fallInLovePhotos[1]}
                                durationInFrames={520}
                                direction="zoom-out"
                                initialScale={1.08}
                                finalScale={1.02}
                                width={750}
                                height={1060}
                                variant="studio"
                                style={{
                                    borderRadius: 28,
                                    boxShadow: '0 28px 65px rgba(40, 25, 10, 0.24), 0 10px 25px rgba(0, 0, 0, 0.08)',
                                }}
                            />
                        </div>

                        {/* Đường chỉ vàng ngoài cùng bên phải */}
                        <div
                            style={{
                                width: 130 * phase3LineWidth,
                                height: 2.5,
                                background: 'linear-gradient(to left, transparent, #C69B56)',
                            }}
                        />
                    </div>

                    {/* Lời tri ân ở dưới theo chuẩn Plus Jakarta Sans của Cảnh 5 */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            marginTop: 22,
                            opacity: phase3QuoteOpacity,
                            willChange: 'opacity',
                        }}
                    >
                        <p
                            style={{
                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                fontSize: 38,
                                fontWeight: 600,
                                lineHeight: 1.5,
                                color: '#221D1A',
                                letterSpacing: '0.02em',
                                textAlign: 'center',
                                margin: 0,
                                textShadow: '0 1px 2px rgba(255, 255, 255, 0.95), 0 2px 10px rgba(255, 255, 255, 0.85)',
                            }}
                        >
                            {cfg.fallInLoveQuote}
                        </p>

                        {/* Thanh gạch dưới vàng tinh tế đồng bộ chuẩn Cảnh 9 */}
                        <div
                            style={{
                                marginTop: 14,
                                width: 140,
                                height: 2.5,
                                backgroundColor: '#A87932',
                                boxShadow: '0 0 12px rgba(168, 121, 50, 0.5)',
                            }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};
