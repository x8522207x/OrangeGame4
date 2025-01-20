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

    $('.section_hero .video_button').on('click', () => openVideo('AHkz5TEwE-g'));
    $('.section_hero_sec .video_button').on('click', () => openVideo('BjdvG4A2shg'));

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
    let startX4 = -540;
    let startY4 = -1;
    let currentX4 = -540;
    let currentY4 = -1;
    let startX6 = -686;
    let startY6 = -175;
    let currentX6 = -686;
    let currentY6 = -175;
    let startX7 = ($(window).width() - 2637) / 2;
    let startY7 = ($(window).height() - 1483) / 2;
    let currentX7 = ($(window).width() - 2637) / 2;
    let currentY7 = ($(window).height() - 1483) / 2;
    let map4Width = map4[0].offsetWidth; // 父容器的寬度
    let map4Height = map4[0].offsetHeight; // 父容器的高度
    let plate4Width = map4Plate[0].offsetWidth; // 背景容器的寬度
    let plate4Height = map4Plate[0].offsetHeight; // 背景容器的高度
    let map6Width = map6[0].offsetWidth; // 父容器的寬度
    let map6Height = map6[0].offsetHeight; // 父容器的高度
    let plate6Width = map6Plate[0].offsetWidth; // 背景容器的寬度
    let plate6Height = map6Plate[0].offsetHeight; // 背景容器的高度
    let map7Width = map7[0].offsetWidth;
    let map7Height = map7[0].offsetHeight; // 父容器的高度
    let plate7Width = map7Plate[0].offsetWidth; // 背景容器的寬度
    let plate7Height = map7Plate[0].offsetHeight; // 背景容器的高度

    $('.type--fortress').on('click', () => {
        $('.section_story .textbox').addClass('open');
        $('.section_story .dimmed_bg').addClass('show');
        $('.section_story .infoside').addClass('open');
        if ($(window).width() < 769) {
            $('.section_story .content .dimmed_bg.show').on('click', () => {
                $('.section_story .textbox').removeClass('open');
                $('.section_story .dimmed_bg').removeClass('show');
                $('.section_story .infoside').removeClass('open');
            });

            $('.section_story .infoside_wrap').on('touchmove', (e) => {
                e.stopPropagation();
            });
        }
    });

    $('.section_story .close button').on('click', () => {
        $('.section_story .textbox').removeClass('open');
        $('.section_story .dimmed_bg').removeClass('show');
        $('.section_story .infoside').removeClass('open');
    });

    $('.section_place .point').on('click', (e) => {
        if (!e.currentTarget.classList.contains('not')) {
            $('.section_place .infoside_wrap').css('display', 'none');
            $('.section_place .point').addClass('dimmed');
            $('.section_place .dimmed_bg').addClass('show');
            $('.section_place .infoside').addClass('open');
            e.currentTarget.classList.remove('dimmed');
            if (e.currentTarget.classList.contains('type_1')) {
                $('.section_place .infoside_wrap.info_type_1').css('display', 'flex');
            } else if (e.currentTarget.classList.contains('type_2')) {
                $('.section_place .infoside_wrap.info_type_2').css('display', 'flex');
            } else if (e.currentTarget.classList.contains('type_3')) {
                $('.section_place .infoside_wrap.info_type_3').css('display', 'flex');
            }
            if ($(window).width() < 769) {
                $('.section_place .content>.dimmed_bg.show').on('click', () => {
                    $('.section_place .point').removeClass('dimmed');
                    $('.section_place .dimmed_bg').removeClass('show');
                    $('.section_place .infoside').removeClass('open');
                    $('.section_place .infoside_wrap').css('display', 'none');
                    map7.removeClass('mini');
                });

                $('.section_place .infoside_wrap').on('touchmove', (e) => {
                    e.stopPropagation();
                });
            }
        }
    });

    $('.section_place .close button').on('click', () => {
        map7Plate.css('width', '2636.8px');
        map7Plate.css('height', '1483.2px');
        plate7Width = map7Plate[0].offsetWidth; // 背景容器的寬度
        plate7Height = map7Plate[0].offsetHeight; // 背景容器的高度
        map7.removeClass('mini');
        $('.section_place .point').removeClass('dimmed');
        $('.section_place .dimmed_bg').removeClass('show');
        $('.section_place .infoside').removeClass('open');
        $('.section_place .infoside_wrap').css('display', 'none');
        const lightBtn = $('.section_place .map_plate .point:not(.dimmed)');
        if (lightBtn.hasClass('type_1')) {
            startY7 = -182;
            currentY7 = -182;
            if (lightBtn.hasClass('key--1')) {
                startX7 = -551;
                currentX7 = -551;
                map7Plate.css("transform", `translate3d(-551px, -182px, 0)`);
            } else {
                startX7 = -707;
                currentX7 = -707;
                map7Plate.css("transform", `translate3d(-707px, -182px, 0)`);
            }
        } else if (lightBtn.hasClass('type_2')) {
            startY7 = -81;
            currentY7 = -81;
            if (lightBtn.hasClass('key--3')) {
                startX7 = -533;
                currentX7 = -533;
                map7Plate.css("transform", `translate3d(-533px, -81px, 0)`);
            } else {
                startX7 = -725;
                currentX7 = -725;
                map7Plate.css("transform", `translate3d(-725px, -81px, 0)`);
            }
        } else if (lightBtn.hasClass('type_3')) {
            startY7 = -66;
            currentY7 = -66;
            if (lightBtn.hasClass('key--5')) {
                startX7 = -393;
                currentX7 = -393;
                map7Plate.css("transform", `translate3d(-393px, -66px, 0)`);
            } else {
                startX7 = -852;
                currentX7 = -852;
                map7Plate.css("transform", `translate3d(-852px, -66px, 0)`);
            }
        }
    });


    let pcSwiperPage, mobileSwiperPage, heroSwiperPage;

    function tabletTouchMove(swiper) {
        return (e) => handleSmallHeight(swiper, e);
    }

    function pcTouchMove(swiper) {
        return (e) => {
            if ($(window).height() < 911) {
                handleSmallHeight(swiper, e);
            } else {
                swiper.allowTouchMove = true;
            }
        };
    }

    let pcTouchMoveHandler, tabletTouchMoveHandler, pcWheelHandler;

    function pcTouchStart(e) {
        startY = e.touches[0].clientY;
    }

    function pcWheel(swiper) {
        return e => {
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
        };
    }

    const pcSwiper = () => {
        pcSwiperPage = new Swiper('.section-pages', {
            direction: 'vertical',
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
            },
            loop: false,
            freeMode: false,
            // slideActiveClass: 'animated',
            noSwiping: true,
            noSwipingSelector: 'button',
            autoHeight: true,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            allowTouchMove: false,
            on: {
                init: (swiper) => {
                    pcTouchMoveHandler = pcTouchMove(swiper);
                    tabletTouchMoveHandler = tabletTouchMove(swiper);
                    pcWheelHandler = pcWheel(swiper);
                    $('.UNI-footer').clone().appendTo('.section_soon');
                    $('.UNI-footer')[1]?.remove();
                    $('.UNI-footer').css('z-index', 100).css('position', 'absolute').css('width', '100%').css('height', 80);

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
                        if (node.children[0].classList.contains("section_spec")) {
                            if ($(window).width() <= 1280) {
                                node.addEventListener('touchmove', tabletTouchMoveHandler, { passive: true });
                            }
                        }

                        node.addEventListener('wheel', pcWheelHandler, { passive: true });

                        if (!node.children[0].classList.contains("section_spec")) {
                            node.addEventListener('touchmove', pcTouchMoveHandler, { passive: true });
                        }

                        node.addEventListener('touchstart', pcTouchStart, { passive: true });
                    });
                },
                slideChange: (swiper) => {
                    map7.removeClass('mini');
                    $('.section_story .textbox').removeClass('open');
                    $('.section_story .dimmed_bg').removeClass('show');
                    $('.section_story .infoside').removeClass('open');
                    $('.section_place .point').removeClass('dimmed');
                    $('.section_place .dimmed_bg').removeClass('show');
                    $('.section_place .infoside').removeClass('open');
                    $('.section_place .infoside_wrap').css('display', 'none');
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

                    if (swiper.realIndex === 6) {
                        map7Plate.css('width', '2636.8px');
                        map7Plate.css('height', '1483.2px');
                        plate7Width = map7Plate[0].offsetWidth; // 背景容器的寬度
                        plate7Height = map7Plate[0].offsetHeight; // 背景容器的高度
                        startX7 = ($(window).width() - 2637) / 2;
                        startY7 = ($(window).height() - 1483) / 2;
                        currentX7 = ($(window).width() - 2637) / 2;
                        currentY7 = ($(window).height() - 1483) / 2;

                        map7Plate.css("transform", `translate3d(${startX7}px, ${startY7}px, 0)`);
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
        heroSwiperPage = new Swiper('.section-group-pages', {
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
            allowTouchMove: true,
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

                    $('.section_hero .scroll').on('click', () => {
                        swiper.slideTo(1);
                    });

                    $('.section_hero_sec .scroll').on('click', () => {
                        swiper.slideTo(5);
                    });

                    $('.UNI-footer').css('display', 'none');
                },
                slideChange: (swiper) => {
                    $('.section_story .textbox').removeClass('open');
                    $('.section_story .dimmed_bg').removeClass('show');
                    $('.section_story .infoside').removeClass('open');
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

    function pcAddMapEvent() {
        // 當鼠標按下時
        map4.on('mousedown touchstart', (e) => {
            isDragging = true;
            let clientX = 0;
            if (e.clientX !== undefined) {
                clientX = e.clientX;
            } else {
                clientX = e.targetTouches[0].clientX;
            }

            let clientY = 0;
            if (e.clientY !== undefined) {
                clientY = e.clientY;
            } else {
                clientY = e.targetTouches[0].clientY;
            }
            startX4 = clientX - currentX4;
            startY4 = clientY - currentY4;
            map4.css("cursor", "grabbing")
        });

        // 當鼠標移動時
        map4.on('mousemove touchmove', (e) => {
            if (!isDragging) return;
            let clientX = 0;
            if (e.clientX !== undefined) {
                clientX = e.clientX;
            } else {
                clientX = e.targetTouches[0].clientX;
            }

            let clientY = 0;
            if (e.clientY !== undefined) {
                clientY = e.clientY;
            } else {
                clientY = e.targetTouches[0].clientY;
            }
            let newX = clientX - startX4;
            let newY = clientY - startY4;


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

        map6.on('mousedown touchstart', (e) => {
            isDragging = true;
            let clientX = 0;
            if (e.clientX !== undefined) {
                clientX = e.clientX;
            } else {
                clientX = e.targetTouches[0].clientX;
            }

            let clientY = 0;
            if (e.clientY !== undefined) {
                clientY = e.clientY;
            } else {
                clientY = e.targetTouches[0].clientY;
            }

            startX6 = clientX - currentX6;
            startY6 = clientY - currentY6;
            map6.css("cursor", "grabbing")
        });

        // 當鼠標移動時
        map6.on('mousemove touchmove', (e) => {
            if (!isDragging) return;
            let clientX = 0;
            if (e.clientX !== undefined) {
                clientX = e.clientX;
            } else {
                clientX = e.targetTouches[0].clientX;
            }

            let clientY = 0;
            if (e.clientY !== undefined) {
                clientY = e.clientY;
            } else {
                clientY = e.targetTouches[0].clientY;
            }
            let newX = clientX - startX6;
            let newY = clientY - startY6;


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
            let clientX = 0;
            if (e.clientX !== undefined) {
                clientX = e.clientX;
            } else {
                clientX = e.targetTouches[0].clientX;
            }

            let clientY = 0;
            if (e.clientY !== undefined) {
                clientY = e.clientY;
            } else {
                clientY = e.targetTouches[0].clientY;
            }
            startX7 = clientX - currentX7;
            startY7 = clientY - currentY7;
            map7.css("cursor", "grabbing")
        });

        // 當鼠標移動時
        map7.on('mousemove touchmove', (e) => {
            if (!isDragging) return;
            let clientX = 0;
            if (e.clientX !== undefined) {
                clientX = e.clientX;
            } else {
                clientX = e.targetTouches[0].clientX;
            }

            let clientY = 0;
            if (e.clientY !== undefined) {
                clientY = e.clientY;
            } else {
                clientY = e.targetTouches[0].clientY;
            }
            let newX = clientX - startX7;
            let newY = clientY - startY7;


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
            map7Plate.css("transform", `translate3d(${currentX7}px, ${currentY7}px, 0)`);
        });

        // 當鼠標放開時
        map7.on('mouseup touchend', () => {
            isDragging = false;
            map7.css("cursor", "grab")
        });

        $('.section_place button:not(.not)').on('click', (e) => {
            let constrainedX, constrainedY;
            if (e.currentTarget.classList.contains("type_1")) {
                startY7 = -437;
                currentY7 = -437;
                constrainedY = -437;
                if (e.currentTarget.classList.contains("key--1")) {
                    startX7 = -1042;
                    currentX7 = -1042;
                    constrainedX = -1042;
                } else {
                    startX7 = -1259;
                    currentX7 = -1259;
                    constrainedX = -1259;
                }
            } else if (e.currentTarget.classList.contains("type_2")) {
                startY7 = -296;
                currentY7 = -296;
                constrainedY = -296;
                if (e.currentTarget.classList.contains("key--3")) {
                    startX7 = -1016;
                    currentX7 = -1016;
                    constrainedX = -1016;
                } else {
                    startX7 = -1285;
                    currentX7 = -1285;
                    constrainedX = -1285;
                }
            } else if (e.currentTarget.classList.contains("type_3")) {
                startY7 = -275;
                currentY7 = -275;
                constrainedY = -275;
                if (e.currentTarget.classList.contains("key--5")) {
                    constrainedX = -820;
                    startX7 = -820;
                    currentX7 = -820;
                } else {
                    constrainedX = -1462;
                    startX7 = -1462;
                    currentX7 = -1462;
                }
            }
            // 更新背景位置
            if (e.currentTarget.classList.length > 0) {
                map7.addClass('mini');
                map7Plate.css("transform", `translate3d(${constrainedX}px, ${constrainedY}px, 0)`)
                map7Plate.css('width', '3692.52px');
                map7Plate.css('height', '2076.48px');
                plate7Width = map7Plate[0].offsetWidth; // 背景容器的寬度
                plate7Height = map7Plate[0].offsetHeight; // 背景容器的高度
            }
        });
    }

    if ($(window).width() > 768) {
        pcAddMapEvent();
        $('.event_gnb').addClass('type_clear');
        $('.event_gnb').removeClass('type_default');
        pcSwiper();
    } else {
        $('.section_story .map_plate').css('transform', `translate3d(${-1147 + ($(window).width() - 375) / 2}px, ${-234 + ($(window).height() - 675) / 2}px, 0px)`);
        $('.section_map .map_plate').css('width', '1868.8px').css('height', '911.04px');
        $('.section_map .map_plate').css('transform', `translate3d(${-470 + ($(window).width() - 375) / 2}px, -121px, 0px)`);
        $('.section_place button:not(.not)').on('click', (e) => {
            // 更新背景位置
            if (e.currentTarget.classList.length > 0) {
                map7.addClass('mini');
            }
        });
        $('.event_gnb').addClass('type_default');
        $('.event_gnb').removeClass('type_clear');
        mobileSwiper();
    }
    heroTabSwiper();

    let originWindowWidth = $(window).width();
    let originWindowHeight = $(window).height();
    function updateMaxVH() {
        const root = document.documentElement;
        const newMaxVh = window.innerHeight + 'px';
        root.style.setProperty('--maxvh', newMaxVh);
        if (heroSwiperPage) {
            heroSwiperPage.update();
        } else {
            setTimeout(() => heroTabSwiper());
        }
        if ($(window).width() > 768) {
            if (originWindowWidth <= 768) {
                pcAddMapEvent();
            }
            map4Plate.css('width', '2603.8px');
            map4Plate.css('height', '1269px');
            $('.event_gnb').addClass('type_clear');
            $('.event_gnb').removeClass('type_default');
            if (mobileSwiperPage) {
                mobileSwiperPage.destroy(true, true); // 銷毀 Swiper 實例
                mobileSwiperPage = null; // 重置為 null
            }
            if (pcSwiperPage) {
                pcSwiperPage.update();
            } else {
                setTimeout(() => pcSwiper());
            }
            map4Width = map4[0].offsetWidth; // 父容器的寬度
            map4Height = map4[0].offsetHeight; // 父容器的高度
            plate4Width = map4Plate[0].offsetWidth; // 背景容器的寬度
            plate4Height = map4Plate[0].offsetHeight; // 背景容器的高度
            map6Width = map6[0].offsetWidth; // 父容器的寬度
            map6Height = map6[0].offsetHeight; // 父容器的高度
            plate6Width = map6Plate[0].offsetWidth; // 背景容器的寬度
            plate6Height = map6Plate[0].offsetHeight; // 背景容器的高度
            map7Width = map7[0].offsetWidth;
            map7Height = map7[0].offsetHeight; // 父容器的高度
            plate7Width = map7Plate[0].offsetWidth; // 背景容器的寬度
            plate7Height = map7Plate[0].offsetHeight; // 背景容器的高度
            let maxX = 0; // 右边界
            let maxY = 0; // 下边界
            currentX4 += ($(window).width() - originWindowWidth) / 2;
            currentY4 += ($(window).height() - originWindowHeight) / 2;
            currentX6 += ($(window).width() - originWindowWidth) / 2;
            currentY6 += ($(window).height() - originWindowHeight) / 2;
            currentX7 += ($(window).width() - originWindowWidth) / 2;
            currentY7 += ($(window).height() - originWindowHeight) / 2;
            let minX = map4Width - plate4Width; // 左边界
            let minY = map4Height - plate4Height; // 上边界
            currentX4 = Math.max(minX, Math.min(maxX, currentX4));
            currentY4 = Math.max(minY, Math.min(maxY, currentY4));
            map4Plate.css("transform", `translate3d(${currentX4}px, ${currentY4}px, 0)`);
            minX = map6Width - plate6Width;
            minY = map6Height - plate6Height; // 上边界
            currentX6 = Math.max(minX, Math.min(maxX, currentX6));
            currentY6 = Math.max(minY, Math.min(maxY, currentY6));
            map6Plate.css("transform", `translate3d(${currentX6}px, ${currentY6}px, 0)`);
            minY = map7Height - plate7Height; // 上边界
            minX = map7Width - plate7Width;
            currentX7 = Math.max(minX, Math.min(maxX, currentX7));
            currentY7 = Math.max(minY, Math.min(maxY, currentY7));
            map7Plate.css("transform", `translate3d(${currentX7}px, ${currentY7}px, 0)`);
            originWindowWidth = $(window).width();
            originWindowHeight = $(window).height();
        } else {
            if (pcSwiperPage) {
                pcSwiperPage.destroy(true, true); // 銷毀 Swiper 實例
                pcSwiperPage = null; // 重置為 null
                document.querySelectorAll('.swiper-slide-page').forEach(node => {
                    if (node.children[0].classList.contains("section_spec")) {
                        if ($(window).width() <= 1280) {
                            node.removeEventListener('touchmove', tabletTouchMoveHandler, { passive: true });
                        }
                    }

                    node.removeEventListener('wheel', pcWheelHandler, { passive: true });

                    if (!node.children[0].classList.contains("section_spec")) {
                        node.removeEventListener('touchmove', pcTouchMoveHandler, { passive: true });
                    }

                    node.removeEventListener('touchstart', pcTouchStart, { passive: true });
                });
            }
            $('.section_map .map_plate').css('transform', `translate3d(${-470 + ($(window).width() - 375) / 2}px, -121px, 0px)`);
            $('.section_story .map_plate').css('transform', `translate3d(${-1147 + ($(window).width() - 375) / 2}px, ${-234 + ($(window).height() - 675) / 2}px, 0px)`);
            $('.event_gnb').addClass('type_default');
            $('.event_gnb').removeClass('type_clear');
            if (mobileSwiperPage) {
                mobileSwiperPage.update();
            } else {
                setTimeout(() => mobileSwiper());
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

