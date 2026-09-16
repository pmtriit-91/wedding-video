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
    // "fence-only": Chỉ hàng rào gỗ mộc mạc ở góc phải
    const decorLayout = cfg.decorLayout ?? 'fence-and-grass';

    const opacity = interpolate(frame, [0, 25, durationInFrames - 25, durationInFrames], [0, 1, 1, 0], {
        extrapolateRight: 'clamp',
    });

    // Hiệu ứng hoa văn màu nước mọc vươn lên từ đáy màn hình (~1.5s)
    const entryProgress = interpolate(frame, [8, 95], [0, 1], {
        easing: Easing.bezier(0.25, 0.1, 0.25, 1.0),
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const entryGrow = interpolate(entryProgress, [0, 1], [0, 100]);
    const entryOpacity = interpolate(frame, [8, 28], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    const entryTranslateY = interpolate(entryProgress, [0, 1], [45, 0]);

    // Hiệu ứng gió thoảng đung đưa nhè nhẹ tự nhiên (organic gentle breeze)
    const swayActive = interpolate(frame, [60, 110], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    // Hoạt cảnh đung đưa cho khóm cỏ lau mềm mại
    const grassSwayAngle =
        swayActive * (1.5 * Math.sin((frame - 55) * 0.027 + 1.2) + 0.4 * Math.sin((frame - 55) * 0.042 + 2.0));
    const grassSwaySkew = swayActive * (0.5 * Math.sin((frame - 55) * 0.027 + 1.4));
    const grassSwayScaleY = 1 + swayActive * (0.007 * Math.cos((frame - 55) * 0.027));

    // Hoạt cảnh đung đưa nhẹ riêng biệt cho khóm cỏ lau phụ (nhịp so le tự nhiên, không bị trùng lặp)
    const grassSwayAngle2 =
        swayActive * (1.25 * Math.sin((frame - 50) * 0.025 + 2.4) + 0.35 * Math.sin((frame - 50) * 0.038 + 1.1));
    const grassSwaySkew2 = swayActive * (0.4 * Math.sin((frame - 50) * 0.025 + 2.6));

    // Hoạt cảnh đung đưa nhẹ hơn cho hàng rào gỗ mộc (gỗ cắm đất vững chãi hơn)
    const fenceSwayAngle = swayActive * (0.65 * Math.sin((frame - 60) * 0.022 + 0.5));
    const fenceSwaySkew = swayActive * (0.25 * Math.sin((frame - 60) * 0.022 + 0.8));

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
                        height: 165,
                        backgroundColor: '#A87932',
                        borderRadius: 2,
                        marginRight: 28,
                        boxShadow: '0 0 14px rgba(168, 121, 50, 0.45)',
                    }}
                />

                {/* Hộp nội dung trích dẫn ấm áp, thanh lịch */}
                <div
                    style={{
                        background: 'rgba(255, 250, 243, 0.92)',
                        backdropFilter: 'blur(12px)',
                        padding: '26px 40px',
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

            {/* Hoa văn thực vật màu nước đồng bộ (trích xuất từ ảnh hoa văn mới 892064638682012006.jpeg) */}
            {entryOpacity > 0 && (
                <>
                    {/* 1. Dải các khóm cỏ lau màu nước mềm mại nối dài tự nhiên đến sát chân hàng rào gỗ */}
                    {(decorLayout === 'fence-and-grass' || decorLayout === 'grass-only') && (
                        <>
                            {[
                                {
                                    id: 'cluster-left',
                                    bottom: -35,
                                    left: 1100,
                                    width: 340,
                                    opacityMultiplier: 0.78,
                                    flipX: true,
                                    swayAngle: -grassSwayAngle2,
                                    swaySkew: -grassSwaySkew2,
                                    zIndex: 21,
                                    shadow: 'drop-shadow(0 8px 18px rgba(60, 45, 25, 0.18))',
                                },
                                {
                                    id: 'cluster-mid',
                                    bottom: -15,
                                    left: 1330,
                                    width: 440,
                                    opacityMultiplier: 0.92,
                                    flipX: false,
                                    swayAngle: grassSwayAngle,
                                    swaySkew: grassSwaySkew,
                                    zIndex: 22,
                                    shadow: 'drop-shadow(0 10px 24px rgba(60, 45, 25, 0.22))',
                                },
                                {
                                    id: 'cluster-bridge',
                                    bottom: -25,
                                    left: 1580,
                                    width: 390,
                                    opacityMultiplier: 0.88,
                                    flipX: true,
                                    swayAngle: -grassSwayAngle2,
                                    swaySkew: -grassSwaySkew2,
                                    zIndex: 21,
                                    shadow: 'drop-shadow(0 9px 20px rgba(60, 45, 25, 0.20))',
                                },
                                {
                                    id: 'cluster-fence-foot',
                                    bottom: -35,
                                    left: 1775,
                                    width: 310,
                                    opacityMultiplier: 0.82,
                                    flipX: false,
                                    swayAngle: grassSwayAngle,
                                    swaySkew: grassSwaySkew,
                                    zIndex: 23,
                                    shadow: 'drop-shadow(0 8px 18px rgba(60, 45, 25, 0.18))',
                                },
                            ].map((cluster) => {
                                const flipTransform = cluster.flipX ? 'scaleX(-1)' : 'scaleX(1)';
                                return (
                                    <div
                                        key={cluster.id}
                                        style={{
                                            position: 'absolute',
                                            bottom: cluster.bottom,
                                            left: cluster.left,
                                            width: cluster.width,
                                            height: 'auto',
                                            opacity: entryOpacity * cluster.opacityMultiplier,
                                            transformOrigin: '50% 100%',
                                            transform: `translateY(${entryTranslateY}px) ${flipTransform} rotate(${cluster.swayAngle}deg) skewX(${cluster.swaySkew}deg) scaleY(${grassSwayScaleY})`,
                                            WebkitMaskImage:
                                                entryGrow < 100
                                                    ? `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${entryGrow}%, rgba(0,0,0,0) ${Math.min(100, entryGrow + 16)}%)`
                                                    : undefined,
                                            maskImage:
                                                entryGrow < 100
                                                    ? `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${entryGrow}%, rgba(0,0,0,0) ${Math.min(100, entryGrow + 16)}%)`
                                                    : undefined,
                                            pointerEvents: 'none',
                                            willChange: 'transform, opacity',
                                            zIndex: cluster.zIndex,
                                        }}
                                    >
                                        <Img
                                            src={staticFile('decor/decor-rustic-pampas-grass.png')}
                                            style={{
                                                width: '100%',
                                                height: 'auto',
                                                filter: `${cluster.shadow} contrast(102%) brightness(101%)`,
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </>
                    )}

                    {/* 2. Hoa văn góc phải dưới đáy */}
                    {decorLayout === 'grass-only' ? (
                        /* Bụi cỏ lau màu nước mềm mại góc phải (lãng mạn, nhẹ nhàng) */
                        <div
                            style={{
                                position: 'absolute',
                                bottom: -10,
                                right: 10,
                                width: 600,
                                height: 'auto',
                                opacity: entryOpacity,
                                transformOrigin: '50% 100%',
                                transform: `translateY(${entryTranslateY}px) scaleX(-1) rotate(${-grassSwayAngle}deg) skewX(${-grassSwaySkew}deg) scaleY(${grassSwayScaleY})`,
                                WebkitMaskImage:
                                    entryGrow < 100
                                        ? `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${entryGrow}%, rgba(0,0,0,0) ${Math.min(100, entryGrow + 16)}%)`
                                        : undefined,
                                maskImage:
                                    entryGrow < 100
                                        ? `linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,1) ${entryGrow}%, rgba(0,0,0,0) ${Math.min(100, entryGrow + 16)}%)`
                                        : undefined,
                                pointerEvents: 'none',
                                willChange: 'transform, opacity',
                                zIndex: 24,
                            }}
                        >
                            <Img
                                src={staticFile('decor/decor-rustic-pampas-grass.png')}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    filter: 'drop-shadow(0 12px 28px rgba(60, 45, 25, 0.25)) contrast(102%) brightness(101%)',
                                }}
                            />
                        </div>
                    ) : (
                        /* Hàng rào gỗ mộc mạc kèm cỏ lau ở góc phải (tone đồi thông rustic Đà Lạt) */
                        <div
                            style={{
                                position: 'absolute',
                                bottom: decorLayout === 'fence-only' ? -25 : -20,
                                right: decorLayout === 'fence-only' ? -40 : -45,
                                width: decorLayout === 'fence-only' ? 820 : 780,
                                height: 'auto',
                                opacity: entryOpacity,
                                transformOrigin: '75% 100%',
                                transform: `translateY(${entryTranslateY}px) scaleX(-1) rotate(${-fenceSwayAngle}deg) skewX(${-fenceSwaySkew}deg)`,
                                pointerEvents: 'none',
                                willChange: 'transform, opacity',
                                zIndex: 24,
                            }}
                        >
                            <Img
                                src={staticFile('decor/decor-rustic-pampas-fence.png')}
                                style={{
                                    width: '100%',
                                    height: 'auto',
                                    filter: 'drop-shadow(0 14px 32px rgba(50, 35, 20, 0.28)) contrast(102%) brightness(101%)',
                                    scale: 1.18,
                                    translate: '137.6px -19.9px',
                                }}
                            />
                        </div>
                    )}
                </>
            )}

            {/* Bụi sao vàng óng ánh lơ lửng */}
            {stardustOpacity > 0 && (
                <GoldenStardust starCount={16} grainCount={24} opacity={stardustOpacity} zIndex={18} />
            )}
        </div>
    );
};
