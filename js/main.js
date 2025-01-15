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
            map7Plate.css('width', '3691.52px');
            map7Plate.css('width', '2076.48px');
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
        map7Plate.css('width', '2636.8px');
        map7Plate.css('width', '1483.2px');
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

    const map4 = $('.section_map .map'); // 取得背景圖容器
    const map6 = $('.section_story .map');
    const map7 = $('.section_place .map');
    const map4Plate = $('.section_map .map_plate');
    const map6Plate = $('.section_story .map_plate');
    const map7Plate = $('.section_place .map_plate');
    let isDragging = false;
    let startX4 = 0;
    let startY4 = 0;
    let currentX4 = 0;
    let currentY4 = 0;
    let startX6 = 0;
    let startY6 = 0;
    let currentX6 = 0;
    let currentY6 = 0;
    let startX7 = 0;
    let startY7 = 0;
    let currentX7 = 0;
    let currentY7 = 0;
    const map4Width = map4[0].offsetWidth; // 父容器的寬度
    const map4Height = map4[0].offsetHeight; // 父容器的高度
    const plate4Width = map4Plate[0].offsetWidth; // 背景容器的寬度
    const plate4Height = map4Plate[0].offsetHeight; // 背景容器的高度
    const map6Width = map6[0].offsetWidth; // 父容器的寬度
    const map6Height = map6[0].offsetHeight; // 父容器的高度
    const plate6Width = map6Plate[0].offsetWidth; // 背景容器的寬度
    const plate6Height = map6Plate[0].offsetHeight; // 背景容器的高度
    const map7Width = map7[0].offsetWidth; // 父容器的寬度
    const map7Height = map7[0].offsetHeight; // 父容器的高度
    const plate7Width = map7Plate[0].offsetWidth; // 背景容器的寬度
    const plate7Height = map7Plate[0].offsetHeight; // 背景容器的高度

    // 當鼠標按下時
    map4.on('mousedown touchstart', (e) => {
        isDragging = true;
        startX4 = e.clientX - currentX4;
        startY4 = e.clientY - currentY4;
        map4.css("cursor", "grabbing")
    });

    // 當鼠標移動時
    map4.on('mousemove touchmove', (e) => {
        if (!isDragging) return;
        let newX = e.clientX - startX4;
        let newY = e.clientY - startY4;


        // 限制 X 軸範圍
        if (plate4Width > map4Width) {
            const minX = map4Width - plate4Width; // 左边界
            const maxX = 0; // 右边界
            newX = Math.max(minX, Math.min(maxX, newX)); // 限制 newX 在 minX 和 maxX 范围内
        } else {
            newX = 0; // 如果子容器比父容器小，则保持水平居中
        }

        if (plate4Height > map4Height) {
            const minY = map4Height - plate4Height; // 上边界
            const maxY = 0; // 下边界
            newY = Math.max(minY, Math.min(maxY, newY)); // 限制 newY 在 minY 和 maxY 范围内
        } else {
            newY = 0; // 如果子容器比父容器小，则保持垂直居中
        }

        // 更新位置
        currentX4 = newX;
        currentY4 = newY;

        // 設置 transform，更新位置
        map4Plate.css("transform", `translate3d(${currentX4}px, ${currentY4}px, 0)`)
    });

    // 當鼠標放開時
    map4.on('mouseup touchend', () => {
        isDragging = false;
        map4.css("cursor", "grab")
    });

    const buttons = document.querySelectorAll('.section_place button:not(.not)');
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonRect = button.getBoundingClientRect();

            // 计算按钮在背景上的相对中心位置
            const buttonX = buttonRect.left + buttonRect.width / 2;
            const buttonY = buttonRect.top + buttonRect.height / 2;

            // 获取背景的当前偏移量
            const mapRect = map7[0].getBoundingClientRect();
            const relativeX = buttonX - mapRect.left;
            const relativeY = buttonY - mapRect.top;

            // 计算新的背景位置
            const newX = -(relativeX - map7Width / 2);
            const newY = -(relativeY - map7Height / 2);

            // 限制边界
            const maxX = 0;
            const minX = map7Width - map7Plate[0].offsetWidth;
            const maxY = 0;
            const minY = map7Height - map7Plate[0].offsetHeight;

            const constrainedX = Math.max(minX, Math.min(maxX, newX));
            const constrainedY = Math.max(minY, Math.min(maxY, newY));


            // 更新背景位置
            map7Plate.css("transform", `translate3d(${constrainedX}px, ${constrainedY}px, 0)`)
        });
    });

    map6.on('mousedown touchstart', (e) => {
        isDragging = true;
        startX6 = e.clientX - currentX6;
        startY6 = e.clientY - currentY6;
        map6.css("cursor", "grabbing")
    });

    // 當鼠標移動時
    map6.on('mousemove touchmove', (e) => {
        if (!isDragging) return;
        let newX = e.clientX - startX6;
        let newY = e.clientY - startY6;


        // 限制 X 軸範圍
        if (plate6Width > map6Width) {
            const minX = map6Width - plate6Width; // 左边界
            const maxX = 0; // 右边界
            newX = Math.max(minX, Math.min(maxX, newX)); // 限制 newX 在 minX 和 maxX 范围内
        } else {
            newX = 0; // 如果子容器比父容器小，则保持水平居中
        }

        if (plate6Height > map6Height) {
            const minY = map6Height - plate6Height; // 上边界
            const maxY = 0; // 下边界
            newY = Math.max(minY, Math.min(maxY, newY)); // 限制 newY 在 minY 和 maxY 范围内
        } else {
            newY = 0; // 如果子容器比父容器小，则保持垂直居中
        }

        // 更新位置
        currentX6 = newX;
        currentY6 = newY;

        // 設置 transform，更新位置
        map6Plate.css("transform", `translate3d(${currentX6}px, ${currentY6}px, 0)`)
    });

    // 當鼠標放開時
    map6.on('mouseup touchend', () => {
        isDragging = false;
        map6.css("cursor", "grab")
    });

    map7.on('mousedown touchstart', (e) => {
        isDragging = true;
        startX7 = e.clientX - currentX7;
        startY7 = e.clientY - currentY7;
        map7.css("cursor", "grabbing")
    });

    // 當鼠標移動時
    map7.on('mousemove touchmove', (e) => {
        if (!isDragging) return;
        let newX = e.clientX - startX7;
        let newY = e.clientY - startY7;


        // 限制 X 軸範圍
        if (plate7Width > map7Width) {
            const minX = map7Width - plate7Width; // 左边界
            const maxX = 0; // 右边界
            newX = Math.max(minX, Math.min(maxX, newX)); // 限制 newX 在 minX 和 maxX 范围内
        } else {
            newX = 0; // 如果子容器比父容器小，则保持水平居中
        }

        if (plate7Height > map7Height) {
            const minY = map7Height - plate7Height; // 上边界
            const maxY = 0; // 下边界
            newY = Math.max(minY, Math.min(maxY, newY)); // 限制 newY 在 minY 和 maxY 范围内
        } else {
            newY = 0; // 如果子容器比父容器小，则保持垂直居中
        }

        // 更新位置
        currentX7 = newX;
        currentY7 = newY;

        // 設置 transform，更新位置
        map7Plate.css("transform", `translate3d(${currentX7}px, ${currentY7}px, 0)`)
    });

    // 當鼠標放開時
    map7.on('mouseup touchend', () => {
        isDragging = false;
        map7.css("cursor", "grab")
    });


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

