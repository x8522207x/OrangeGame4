let startY = 0;

$(document).ready(() => {
    window.addEventListener('resize', updateMaxVH);

    $('.modal_wrap').css('display', 'none');
    setTimeout(() => {
        $('.loading').remove();
        $('.modal').toggleClass('hide');
        $('.modal_wrap').css('display', '');
    }, 1000);

    ['.event_banner', '.event_gnb_menu'].forEach(ele => $(ele).on('click', () => {
        $('.event_banner').toggleClass('-open');
    }));

    $('.event_gnb_gamestart').on('click', () => {
        window.open("https://galaxy.beanfun.com/webapi/view/login/twp?redirect_url=https://warsofprasia.beanfun.com/Main");
    });

    $('.modal_close').on('click', () => {
        $('.plate_modal').toggleClass('-active');
        $('.modal.type--youtube').toggleClass('hide');
        $('.modal_box_veil').toggleClass('-hide');
        $('.modal').css('opacity', '0');
        $('.youtube--2').remove();
    });

    $('.section_spec .content .sub_content .video .sourcebox .video_button').on('click', () => {
        const video = document.querySelector('.section_spec .content .sub_content .video video');
        if (video.paused) {
            video.play();
            $('.section_spec .content .sub_content .video').addClass('play');
        } else {
            video.pause();
        }
    });

    $('.type--fortress').on('click', () => {
        $('.section_story .textbox').addClass('open');
        $('.section_story .dimmed').addClass('show');
        $('.section_story .infoside').addClass('open');
    });

    $('.section_story .close button').on('click', () => {
        $('.section_story .textbox').removeClass('open');
        $('.section_story .dimmed').removeClass('show');
        $('.section_story .infoside').removeClass('open');
    });

    $('.section_place .point').on('click', (e) => {
        if (!e.currentTarget.classList.contains('not')) {
            $('.section_place .point').addClass('dimmed');
            $('.section_place .dimmed').addClass('show');
            $('.section_place .infoside').addClass('open');
            e.currentTarget.classList.remove('dimmed');
            $('.section_place .infoside .infoside_wrap .sourcebox').empty();
            const img = document.createElement('img');
            if (e.currentTarget.classList.contains('type_1')) {
                $('.section_place .infoside .infoside_wrap .detail .name').text("裝甲架橋車");
                $('.section_place .infoside .infoside_wrap .detail .description').text(`召喚裝甲架橋車進行移動的旅團，可以事先摧毀沙漠之瞳及城堡內的主要建築，從而開闢迂迴路線。`);
                img.src = `img/page7/p7_thumb_1.png`;
            } else if (e.currentTarget.classList.contains('type_2')) {
                $('.section_place .infoside .infoside_wrap .detail .name').text("沙漠之瞳");
                $('.section_place .infoside .infoside_wrap .detail .description').text(`配置於暗月要塞內部的專用防禦塔
                    當敵人接近防禦塔周圍時，會在周圍生成流沙漩渦。`);
                img.src = `img/page7/p7_thumb_2.png`;
            } else if (e.currentTarget.classList.contains('type_3')) {
                $('.section_place .infoside .infoside_wrap .detail .name').text("烽火台");
                $('.section_place .infoside .infoside_wrap .detail .description').text(`在主要路徑上施加緩速減益效果。
                為了縮短通往祭壇的動線，必須將其清除。`);
                img.src = `img/page7/p7_thumb_3.png`;
            }
            $('.section_place .infoside .infoside_wrap .sourcebox').append(img);
        }
    });

    $('.section_place .close button').on('click', () => {
        $('.section_place .point').removeClass('dimmed');
        $('.section_place .dimmed').removeClass('show');
        $('.section_place .infoside').removeClass('open');
    });

    $('.toggle').on('click', (e) => {
        if ($(e.target).parent().parent().hasClass('open')) {
            $(e.target).parent().parent().removeClass('open');
        } else {
            $(e.target).parent().parent().addClass('open');
        }
        $(e.target).parent().parent().siblings().removeClass('open');
    });

    const canvas = document.getElementById('firstCanvas');
    const ctx = canvas.getContext('2d');

    // 初始位移
    let offsetX = 0; // 只更新 X 軸
    let offsetY = 0; // 固定 Y 軸

    // 拖曳相關變數
    let isDragging = false;
    let startX;

    // 背景圖
    const background = new Image();
    background.src = 'img/page4/p4_bg.png'; // 替換成背景圖片

    // 等待圖片加載完成後開始繪製
    background.onload = () => {
        drawMap();
    };

    function drawMap() {
        // 清空畫布
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 繪製背景圖
        ctx.drawImage(background, offsetX, offsetY, canvas.width, canvas.height);

        // 繪製其他元素（如雲層、標記等）
        drawClouds();
        drawPoints();
    }

    function drawClouds() {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fillRect(100 + offsetX, 50 + offsetY, 200, 50); // 模擬雲層
    }

    function drawPoints() {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(600 + offsetX, 300 + offsetY, 10, 0, Math.PI * 2); // 模擬標記點
        ctx.fill();
    }

    // 拖曳開始
    canvas.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
    });

    // 拖曳過程
    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        // 計算 X 軸移動量
        const dx = e.clientX - startX;

        // 更新位移量
        offsetX += dx;

        // 更新 .clouds 和 .point 元素的位置
        updateElementsPosition();

        // 重新繪製地圖
        drawMap();

        // 更新起始 X 座標
        startX = e.clientX;
    });

    // 拖曳結束
    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    // 更新 .clouds 和 .point 元素的位置
    function updateElementsPosition() {
        const clouds = document.querySelector('.clouds');
        const point = document.querySelector('.point');

        // 更新 .clouds 和 .point 的位置
        clouds.style.transform = `translateX(${offsetX}px)`;
        point.style.transform = `translate3d(${offsetX - 50}%, -50%, 0)`; // 這裡的 -50% 調整標記點相對位置
    }


    let pcSwiperPage, mobileSwiperPage;

    const pcSwiper = () => {
        pcSwiperPage = new Swiper('.section-pages', {
            direction: 'vertical',
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
            },
            loop: false,
            slideActiveClass: 'animated',
            noSwiping: true,
            noSwipingSelector: 'button',
            autoHeight: true,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: false,
            on: {
                init: (swiper) => {
                    $('.UNI-footer').clone().appendTo('.section_soon');
                    $('.UNI-footer')[1]?.remove();
                    $('.UNI-footer').css('z-index', 100).css('bottom', 0).css('position', 'absolute').css('width', '100%').css('height', 80);

                    $('.gotop').on('click', () => {
                        swiper.slideTo(0);
                        swiper.slides.forEach(slide => {
                            slide.scrollTop = 0;
                        })
                    });
                    $('.UNI-footer').css('display', 'none');

                    $('.section_hero .scroll').on('click', () => {
                        swiper.slideTo(1);
                    });

                    $('.section_hero_sec .scroll').on('click', () => {
                        swiper.slideTo(5);
                    });

                    document.querySelectorAll('.swiper-slide-page').forEach(node => {
                        node.addEventListener('wheel', e => {
                            e.stopPropagation();
                            const currentSlide = swiper.slides[swiper.activeIndex];
                            const slideScrollTop = currentSlide.scrollTop;
                            const scrollHeight = currentSlide.scrollHeight;
                            const clientHeight = currentSlide.clientHeight;
                            const isAtTop = slideScrollTop === 0;
                            const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);
                            if (swiper.realIndex === 0) {
                                if (isAtBottom && e.deltaY > 0) {
                                    swiper.slideTo(swiper.realIndex + 1);
                                }
                            } else if ([1, 2, 3, 4, 5, 6].includes(swiper.realIndex)) {
                                if (isAtTop && e.deltaY < 0) {
                                    swiper.slideTo(swiper.realIndex - 1);
                                } else if (isAtBottom && e.deltaY > 0) {
                                    swiper.slideTo(swiper.realIndex + 1);
                                }
                            } else {
                                if (isAtTop && e.deltaY < 0) {
                                    swiper.slideTo(swiper.realIndex - 1);
                                }
                            }
                        }, { passive: true });

                        node.addEventListener('touchmove', function (e) {
                            if ($(window).height() < 911) {
                                handleSmallHeight(swiper, e);
                            } else {
                                swiper.allowTouchMove = true;
                            }
                        }, { passive: true });

                        node.addEventListener('touchstart', function (e) {
                            startY = e.touches[0].clientY;
                        }, { passive: true });
                    });
                },
                slideChange: (swiper) => {
                    $('.section_story .textbox').removeClass('open');
                    $('.section_story .dimmed').removeClass('show');
                    $('.section_story .infoside').removeClass('open');
                    $('.section_place .point').removeClass('dimmed');
                    $('.section_place .dimmed').removeClass('show');
                    $('.section_place .infoside').removeClass('open');
                    ['active', 'point'].forEach(cl => ['.depth_1', '.depth_2'].forEach(ele => $(ele).removeClass(cl)));
                    $('.swiper-slide-page').off('scroll');
                    $('.swiper-slide-page').removeClass('scrollable');
                    $('.gotop').removeClass('show');
                    $('.UNI-footer').css('display', 'none');
                    $('.swiper-slide-page')[swiper.realIndex].classList.add('scrollable');
                    $('.depth_1')[swiper.realIndex].classList.add('active');
                    $('.depth_1')[swiper.realIndex].classList.add('point');
                    if (swiper.realIndex !== 0) {
                        $('.gotop').addClass('show');
                    }

                    if (swiper.realIndex === 7) {
                        $('.UNI-footer').css('display', 'block');
                    }
                },
            }
        });

        $('.swiper-slide-page')[0].classList.add('scrollable');
        pcSwiperPage.slideTo(0);
        $('.depth_1')[0].classList.add('active');
        $('.depth_1')[0].classList.add('point');

        for (let i = 0; i < 8; i++) {
            addPageClick(i, pcSwiperPage);
        }
    };

    const heroTabSwiper = () => {
        pcSwiperPage = new Swiper('.section-group-pages', {
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
            },
            loop: false,
            slideActiveClass: 'animated',
            noSwiping: true,
            noSwipingSelector: 'button',
            autoHeight: true,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: false,
        });
    };

    const mobileSwiper = () => {
        mobileSwiperPage = new Swiper('.section-pages', {
            direction: 'vertical',
            slidesPerView: "auto",
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
                enabled: false,
            },
            loop: false,
            freeMode: {
                enabled: true,
                sticky: false,
                momentumBounce: false,
            },
            autoHeight: true,
            speed: 1000,
            passiveListeners: false,
            allowTouchMove: true,
            on: {
                init: (swiper) => {
                    $('.gotop').on('click', () => {
                        swiper.slideTo(0);
                    });

                    $('.scroll').on('click', () => {
                        swiper.slideTo(1);
                    });
                    $('.UNI-footer').css('display', 'none');
                },
                slideChange: (swiper) => {
                    $('.gotop').removeClass('show');
                    $('.UNI-footer').css('display', 'none');
                    if (swiper.realIndex !== 0) {
                        $('.gotop').addClass('show');
                    }

                    if (swiper.realIndex === 7) {
                        $('.UNI-footer').css('display', 'block');
                    }
                }
            }
        });
    };

    if ($(window).width() > 768) {
        $('.event_gnb').addClass('type_clear');
        $('.event_gnb').removeClass('type_default');
        pcSwiper();
    } else {
        $('.event_gnb').addClass('type_default');
        $('.event_gnb').removeClass('type_clear');
        mobileSwiper();
    }
    heroTabSwiper();

    function updateMaxVH() {
        const root = document.documentElement;
        const newMaxVh = window.innerHeight + 'px';
        root.style.setProperty('--maxvh', newMaxVh);
        if ($(window).width() > 768) {
            $('.event_gnb').addClass('type_clear');
            $('.event_gnb').removeClass('type_default');
            if (pcSwiperPage) {
                setTimeout(() => { pcSwiperPage.update(); }, 100);
            } else {
                pcSwiper();
            }
        } else {
            $('.event_gnb').addClass('type_default');
            $('.event_gnb').removeClass('type_clear');
            if (mobileSwiperPage) {
                mobileSwiperPage.update();
            } else {
                mobileSwiper();
            }
        }
    }
});

const handleSmallHeight = (swiper, event) => {
    swiper.allowTouchMove = true;
    event.stopPropagation();

    const currentY = event.touches[0].clientY;
    let direction = '';
    if (currentY > startY) {
        direction = 'down';  // 向下移动
    } else if (currentY < startY) {
        direction = 'up';    // 向上移动
    }

    const currentSlide = swiper.slides[swiper.activeIndex];
    const slideScrollTop = currentSlide.scrollTop;
    const scrollHeight = currentSlide.scrollHeight;
    const clientHeight = currentSlide.clientHeight;
    const isAtTop = slideScrollTop === 0;
    const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);

    if (isAtTop) {
        if (swiper.realIndex !== 0) {
            if (direction === 'down') {
                swiper.slideTo(swiper.realIndex - 1);
            }
        }
    } else if (isAtBottom) {
        if (direction === 'up') {
            swiper.slideTo(swiper.realIndex + 1);
        }
    }
};

const addPageClick = (index, swiper) => {
    $(`.page_p${index + 1}`).on('click', () => {
        swiper.slideTo(index);
    });
};

const addAnimateClass = (arr) => {
    arr.forEach(ele => $(ele).addClass('animate'));
};

const openVideo = (video, path) => {
    $('.plate_modal').toggleClass('-active');
    $('.modal').css('opacity', '1').css('visibility', 'inherit');
    $('.modal.type--youtube').toggleClass('hide');
    $('.modal_box_veil').toggleClass('-hide');
    if (video) {
        $('.modal_source').append(
            `<iframe width="auto" height="auto" class="modal_youtube youtube--2"
        src="https://www.youtube.com/embed/${video}?si=1_stAmmA1RL7LFrt"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>`);
    } else if (path) {
        $('.modal_source').append(
            `<video class="modal_youtube youtube--2" loop autoplay playsinline controls controlslist="nodownload" preload="metadata"><source src=${path} type="video/mp4"></video>`);
    }
};

