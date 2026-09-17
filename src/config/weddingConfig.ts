/**
 * =========================================================================
 * WEDDING CONFIGURATION - CẤU HÌNH VIDEO ĐÁM CƯỚI
 * =========================================================================
 * Bạn có thể tự do thay đổi câu chữ, tên, ngày cưới hoặc đường dẫn ảnh ở đây.
 * Sau khi sửa và lưu file này, màn hình Preview sẽ tự động cập nhật ngay lập tức!
 */

export interface ScenePhoto {
    src: string;
    caption?: string;
}

export interface WeddingConfig {
    // Thông tin chung
    groomName: string;
    groomTitle: string;
    brideName: string;
    brideTitle: string;
    weddingDate: string; // VD: 27.09.2026
    welcomeText: string;

    // Bảng màu sang trọng
    colors: {
        goldPrimary: string;
        goldAccent: string;
        ivoryBg: string;
        textDark: string;
        textMuted: string;
        white: string;
    };

    // Cấu hình từng phân cảnh (12 phân cảnh tương ứng 12 thư mục photos)
    scenes: {
        // 1. Phân cảnh mở đầu (00:00 - 00:06)
        scene01_welcome: {
            title: string;
            subtitle: string;
            photos: string[];
        };

        // 2. Save the date (00:06 - 00:14)
        scene02_saveTheDate: {
            badgeText: string;
            dateHighlight: string;
            photos: string[];
        };

        // 3. Giới thiệu Cô dâu (00:14 - 00:20)
        scene03_brideIntro: {
            roleText: string;
            name: string;
            photo: string;
        };

        // 4. Giới thiệu Chú rể (00:20 - 00:28)
        scene04_groomIntro: {
            roleText: string;
            name: string;
            photo: string;
        };

        // 5. Tri ân Bố Mẹ hai bên (00:28 - 00:37)
        scene05_parentGratitude: {
            title: string;
            message: string;
            vowBookPhoto: string;
            outdoorPhotos: string[];
        };

        // 6. Quãng thời gian tìm hiểu (00:38 - 00:46)
        scene06_datingMemories: {
            intro?: string;
            quote: string;
            photos: string[];
        };

        // 7. Ngày trọng đại nhất (00:46 - 00:54)
        scene07_theBigDay: {
            line1: string;
            line2: string;
            photos: string[];
        };

        // 8. Chào đón quan khách (00:54 - 01:02)
        scene08_guestWelcome: {
            quote: string;
            photos: string[];
            decorLayout?: 'fence-and-grass' | 'grass-only' | 'fence-only';
        };

        // 9. Cùng chung vui & Giây phút hạnh phúc (01:03 - 01:11)
        scene09_ceremonyJoy: {
            quote: string;
            photo: string;
        };

        // 10. Lời chúc phúc & Fall in Love (01:11 - 01:36)
        scene10_wishesAndFallInLove: {
            wishesQuote: string;
            distanceThankQuote: string;
            fallInLoveQuote: string;
            polaroidPhotos: {
                groom: { photo: string; name: string; title: string };
                bride: { photo: string; name: string; title: string };
            };
            foreheadPhoto: string;
            fallInLovePhotos: string[];
        };

        // 11. Mãi mãi bắt đầu từ hôm nay (01:37 - 01:44)
        scene11_foreverHappy: {
            quote: string;
            username: string;
            photos: string[];
        };

        // 12. Lời cảm ơn kết thúc (01:45 - 01:56)
        scene12_outro: {
            thankYouText: string;
            photo: string;
        };
    };
}

export const weddingConfig: WeddingConfig = {
    groomName: 'MINH TRÍ',
    groomTitle: 'Chú rể',
    brideName: 'CẨM HƯƠNG',
    brideTitle: 'Cô dâu',
    weddingDate: '27.09.2026',
    welcomeText: 'WELCOME TO OUR WEDDING',

    colors: {
        goldPrimary: '#C69B56', // Vàng sâm banh ánh kim
        goldAccent: '#E5C387', // Vàng nhạt tỏa sáng
        ivoryBg: '#FDFBF7', // Trắng kem ấm
        textDark: '#22201E', // Đen than đậm sang trọng
        textMuted: '#6E675F', // Nâu xám trang nhã
        white: '#FFFFFF',
    },

    scenes: {
        // SCENE 1: Welcome
        scene01_welcome: {
            title: 'CẨM HƯƠNG & MINH TRÍ',
            subtitle: 'WELCOME TO OUR WEDDING',
            photos: [
                'photos/1/Untitled Session36096.jpg',
                'photos/1/Untitled Session36147.jpg',
                'photos/1/Untitled Session36519.jpg',
            ],
        },

        // SCENE 2: Save The Date
        scene02_saveTheDate: {
            badgeText: 'SAVE the DATE',
            dateHighlight: '27 09 26',
            photos: ['photos/2/DSC_0609.jpg', 'photos/2/DSC_0638.jpg', 'photos/2/MAY_0981.jpg'],
        },

        // SCENE 3: Cô dâu Cẩm Hương
        scene03_brideIntro: {
            roleText: 'CON LÀ CÔ DÂU',
            name: 'CẨM HƯƠNG',
            photo: 'photos/3/Untitled Session35877.jpg',
        },

        // SCENE 4: Chú rể Minh Trí
        scene04_groomIntro: {
            roleText: 'CON LÀ CHÚ RỂ',
            name: 'MINH TRÍ',
            photo: 'photos/3/Untitled Session36651.jpg',
        },

        // SCENE 5: Tri ân Bố Mẹ
        scene05_parentGratitude: {
            title: 'Gửi hàng triệu lời cảm ơn và tất cả yêu thương từ sâu thẳm trái tim.',
            message: 'Chúng con cảm ơn Ba Mẹ hai bên đã chấp thuận và vun đắp.',
            vowBookPhoto: 'photos/4/DSC_0605.jpg',
            outdoorPhotos: ['photos/4/MAY_0534.jpg', 'photos/4/MAY_0559.jpg'],
        },

        // SCENE 6: Kỷ niệm tìm hiểu
        scene06_datingMemories: {
            intro: '10 năm quen nhau,',
            quote: 'Bọn con đã có quãng thời gian tìm hiểu và được sự đón nhận của Ba Mẹ hai bên.',
            photos: ['photos/5/1.JPG', 'photos/5/2.JPG', 'photos/5/3.JPG'],
        },

        // SCENE 7: Ngày quan trọng nhất
        scene07_theBigDay: {
            line1: 'Và ngày hôm nay,',
            line2: 'là ngày quan trọng nhất của cuộc đời vợ chồng chúng con.',
            photos: [
                'photos/6/Untitled Session36179.jpg',
                'photos/6/Untitled Session36834.jpg',
                'photos/6/Untitled Session36864.jpg',
                'photos/6/Untitled Session36899.jpg',
            ],
        },

        // SCENE 8: Chào đón quan khách
        scene08_guestWelcome: {
            quote: 'Chúng con thật vui và hạnh phúc khi được thấy mọi người ở đây.',
            photos: ['photos/7/MAY_0805.jpg', 'photos/7/MAY_0355.jpg', 'photos/7/DSC_9953.jpg'],
            // Tuỳ chọn bố cục hoa văn thực vật màu nước: 'fence-and-grass' | 'grass-only' | 'fence-only'
            decorLayout: 'fence-and-grass' as 'fence-and-grass' | 'grass-only' | 'fence-only',
        },

        // SCENE 9: Cùng chung vui
        scene09_ceremonyJoy: {
            quote: 'Cùng chung vui và chứng kiến giây phút hạnh phúc này.',
            photo: 'photos/8/Untitled Session36756.jpg',
        },

        // SCENE 10: Lời chúc phúc & Fall in Love
        scene10_wishesAndFallInLove: {
            wishesQuote:
                'Lời chúc phúc của mọi người là niềm tin để chúng con bước tiếp trên con đường phía trước của cả hai.',
            distanceThankQuote:
                'Chúng con xin cảm ơn tất cả mọi người đã sắp xếp công việc và thời gian, không ngại đường sá xa xôi để đến chung vui và chúc phúc cho chúng con.',
            fallInLoveQuote: 'Hơn bao giờ hết chúng con muốn nói lời cảm ơn thật nhiều.',
            polaroidPhotos: {
                groom: {
                    photo: 'photos/8/Untitled Session36657.jpg',
                    name: 'MINH TRÍ',
                    title: 'Chú rể',
                },
                bride: {
                    photo: 'photos/8/Untitled Session36491.jpg',
                    name: 'CẨM HƯƠNG',
                    title: 'Cô dâu',
                },
            },
            foreheadPhoto: 'photos/10/Untitled Session36155.jpg',
            fallInLovePhotos: ['photos/10/Untitled Session36155.jpg', 'photos/10/Untitled Session36331.jpg'],
        },

        // SCENE 11: Mãi mãi bắt đầu từ hôm nay
        scene11_foreverHappy: {
            quote: 'Mãi mãi bắt đầu từ hôm nay, chúng con sẽ luôn luôn hạnh phúc.',
            username: 'camhuong_minhtri',
            photos: ['photos/11/DSC_0120.jpg', 'photos/11/DSC_0553.jpg', 'photos/11/DSC_1167.jpg'],
        },

        // SCENE 12: Lời kết
        scene12_outro: {
            thankYouText: 'CHÚNG CON XIN CẢM ƠN!',
            photo: 'photos/12/Untitled Session36269.jpg',
        },
    },
};
