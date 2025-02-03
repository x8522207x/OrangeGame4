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

    let isDragging = false;
    const mapsConfig = [
        { id: 'map4', section: '.section_map', startX: -270, startY: -1 },
        { id: 'map6', section: '.section_story', startX: -686, startY: -175, canvasWidth: 3240.89, canvasHeight: 1823 },
        {
            id: 'map7', section: '.section_place',
            startX: ($(window).width() - 2637) / 2,
            startY: ($(window).height() - 1483) / 2
        }
    ];

    const maps = {};

    mapsConfig.forEach(({ id, section, startX, startY, canvasWidth, canvasHeight }) => {
        const mapContainer = $(`${section} .map`);
        const canvas = document.getElementById(id);
        const ctx = canvas.getContext('2d');
        const img = new Image();
        const plate = $(`${section} .map_plate`);

        maps[id] = {
            mapContainer,
            canvas,
            ctx,
            img,
            plate,
            startX,
            startY,
            currentX: startX,
            currentY: startY,
            mapWidth: mapContainer[0].offsetWidth,
            mapHeight: mapContainer[0].offsetHeight,
            plateWidth: plate[0].offsetWidth,
            plateHeight: plate[0].offsetHeight,
            canvasWidth: canvasWidth,
            canvasHeight: canvasHeight
        };
    });

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
                    maps['map7'].mapContainer.removeClass('mini');
                });

                $('.section_place .infoside_wrap').on('touchmove', (e) => {
                    e.stopPropagation();
                });
            }
        }
    });

    $('.section_place .close button').on('click', () => {
        maps['map7'].canvasWidth = 2636.8;
        maps['map7'].canvasHeight = 1483.2;
        maps['map7'].plate.css('width', `${maps['map7'].canvasWidth}px`);
        maps['map7'].plate.css('height', `${maps['map7'].canvasHeight}px`);
        maps['map7'].plateWidth = maps['map7'].plate[0].offsetWidth; // 背景容器的寬度
        maps['map7'].plateHeight = maps['map7'].plate[0].offsetHeight; // 背景容器的高度
        maps['map7'].mapContainer.removeClass('mini');
        $('.section_place .point').removeClass('dimmed');
        $('.section_place .dimmed_bg').removeClass('show');
        $('.section_place .infoside').removeClass('open');
        $('.section_place .infoside_wrap').css('display', 'none');
        const lightBtn = $('.section_place .map_plate .point:not(.dimmed)');
        if (lightBtn.hasClass('type_1')) {
            maps['map7'].startY = -182;
            maps['map7'].currentY = -182;
            if (lightBtn.hasClass('key--1')) {
                maps['map7'].startX = -551;
                maps['map7'].currentX = -551;
            } else {
                maps['map7'].startX = -707;
                maps['map7'].currentX = -707;
            }
        } else if (lightBtn.hasClass('type_2')) {
            maps['map7'].startY = -81;
            maps['map7'].currentY = -81;
            if (lightBtn.hasClass('key--3')) {
                maps['map7'].startX = -533;
                maps['map7'].currentX = -533;
            } else {
                maps['map7'].startX = -725;
                maps['map7'].currentX = -725;
            }
        } else if (lightBtn.hasClass('type_3')) {
            maps['map7'].startY = -66;
            maps['map7'].currentY = -66;
            if (lightBtn.hasClass('key--5')) {
                maps['map7'].startX = -393;
                maps['map7'].currentX = -393;
            } else {
                maps['map7'].startX = -852;
                maps['map7'].currentX = -852;
            }
        }
        maps['map7'].plate.css("transform", `translate3d(${maps['map7'].currentX}px, ${maps['map7'].currentY}px, 0)`);
        drawCanvas('map7');
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
                    maps['map7'].mapContainer.removeClass('mini');
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
                        maps['map7'].canvasWidth = 2636.8;
                        maps['map7'].canvasHeight = 1483.2;
                        maps['map7'].plate.css('width', `${maps['map7'].canvasWidth}px`);
                        maps['map7'].plate.css('height', `${maps['map7'].canvasHeight}px`);
                        maps['map7'].plateWidth = maps['map7'].plate[0].offsetWidth; // 背景容器的寬度
                        maps['map7'].plateHeight = maps['map7'].plate[0].offsetHeight; // 背景容器的高度
                        maps['map7'].startX = ($(window).width() - 2637) / 2;
                        maps['map7'].startY = ($(window).height() - 1483) / 2;
                        maps['map7'].currentX = ($(window).width() - 2637) / 2;
                        maps['map7'].currentY = ($(window).height() - 1483) / 2;

                        maps['map7'].plate.css("transform", `translate3d(${maps['map7'].startX}px, ${maps['map7'].startY}px, 0)`);
                        drawCanvas('map7');
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
            on: {
                slideChange: (swiper) => {
                    if ($(window).width() > 768) {
                        if (swiper.realIndex > 0) {
                            swiper.slideTo(0); // 快速回到索引 1
                        }
                    } else {
                        if (swiper.realIndex > 1) {
                            swiper.slideTo(1); // 快速回到索引 1
                        }
                    }
                }
            }
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
            speed: 0,
            passiveListeners: true,
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

    function drawCanvas(mapId) {
        const map = maps[mapId];
        if (!map) return;

        const { ctx, canvas, img, currentX, currentY, canvasWidth, canvasHeight } = map;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, currentX, currentY, canvasWidth, canvasHeight);

        img.onload = () => {
            ctx.drawImage(img, currentX, currentY, canvasWidth, canvasHeight);
        };
    }

    function pcAddMapEvent() {
        maps['map4'].canvasWidth = 2603.8;
        maps['map4'].canvasHeight = 1269;
        maps['map4'].canvas.width = $(window).width();
        maps['map4'].canvas.height = 1268;
        maps['map4'].currentX = -824 + ($(window).width() - 820) / 2;
        maps['map4'].startX = maps['map4'].currentX;
        maps['map4'].plate.css("transform", `translate3d(${maps['map4'].currentX}px, ${maps['map4'].currentY}px, 0)`);
        maps['map6'].canvas.width = $(window).width();
        maps['map6'].canvas.height = $(window).height();
        maps['map6'].currentX = -970 + ($(window).width() - 820) / 2;
        maps['map6'].startX = maps['map6'].currentX;
        maps['map6'].currentY = -42 + ($(window).height() - 1180) / 2;
        maps['map6'].startY = maps['map6'].currentY;
        maps['map6'].plate.css("transform", `translate3d(${maps['map6'].currentX}px, ${maps['map6'].currentY}px, 0)`);
        maps['map7'].canvas.width = $(window).width();
        maps['map7'].canvas.height = $(window).height();
        drawCanvas('map4');
        drawCanvas('map6');
        drawCanvas('map7');

        function attachDragEvents(mapKey) {
            const map = maps[mapKey];

            map.mapContainer.on('mousedown touchstart', (e) => {
                isDragging = true;

                const clientX = e.clientX !== undefined ? e.clientX : e.targetTouches[0].clientX;
                const clientY = e.clientY !== undefined ? e.clientY : e.targetTouches[0].clientY;

                map.startX = clientX - map.currentX;
                map.startY = clientY - map.currentY;
                map.mapContainer.css("cursor", "grabbing");
            });

            map.mapContainer.on('mousemove touchmove', (e) => {
                if (!isDragging) return;

                const clientX = e.clientX !== undefined ? e.clientX : e.targetTouches[0].clientX;
                const clientY = e.clientY !== undefined ? e.clientY : e.targetTouches[0].clientY;

                let newX = clientX - map.startX;
                let newY = clientY - map.startY;

                // 限制 X 轴范围
                if (map.plateWidth > map.mapWidth) {
                    const minX = map.mapWidth - map.plateWidth;
                    const maxX = 0;
                    newX = Math.max(minX, Math.min(maxX, newX));
                } else {
                    newX = 0;
                }

                // 限制 Y 轴范围
                if (map.plateHeight > map.mapHeight) {
                    const minY = map.mapHeight - map.plateHeight;
                    const maxY = 0;
                    newY = Math.max(minY, Math.min(maxY, newY));
                } else {
                    newY = 0;
                }

                // 更新位置
                map.currentX = newX;
                map.currentY = newY;
                map.plate.css("transform", `translate3d(${map.currentX}px, ${map.currentY}px, 0)`);
                drawCanvas(mapKey);
            });

            map.mapContainer.on('mouseup touchend', () => {
                isDragging = false;
                map.mapContainer.css("cursor", "grab");
            });
        }

        ['map4', 'map6', 'map7'].forEach(attachDragEvents);

        $('.section_place button:not(.not)').on('click', (e) => {
            if (e.currentTarget.classList.contains("type_1")) {
                maps['map7'].startY = -437;
                maps['map7'].currentY = -437;
                if (e.currentTarget.classList.contains("key--1")) {
                    maps['map7'].startX = -1042;
                    maps['map7'].currentX = -1042;
                } else {
                    maps['map7'].startX = -1259;
                    maps['map7'].currentX = -1259;
                }
            } else if (e.currentTarget.classList.contains("type_2")) {
                maps['map7'].startY = -296;
                maps['map7'].currentY = -296;
                if (e.currentTarget.classList.contains("key--3")) {
                    maps['map7'].startX = -1016;
                    maps['map7'].currentX = -1016;
                } else {
                    maps['map7'].startX = -1285;
                    maps['map7'].currentX = -1285;
                }
            } else if (e.currentTarget.classList.contains("type_3")) {
                maps['map7'].startY = -275;
                maps['map7'].currentY = -275;
                if (e.currentTarget.classList.contains("key--5")) {
                    maps['map7'].startX = -820;
                    maps['map7'].currentX = -820;
                } else {
                    maps['map7'].startX = -1462;
                    maps['map7'].currentX = -1462;
                }
            }
            // 更新背景位置
            if (e.currentTarget.classList.length > 0) {
                maps['map7'].mapContainer.addClass('mini');
                maps['map7'].plate.css("transform", `translate3d(${maps['map7'].currentX}px, ${maps['map7'].currentY}px, 0)`);
                maps['map7'].canvasWidth = 3692.52;
                maps['map7'].canvasHeight = 2076.48;
                maps['map7'].plate.css('width', `${maps['map7'].canvasWidth}px`);
                maps['map7'].plate.css('height', `${maps['map7'].canvasHeight}px`);
                drawCanvas('map7');
                maps['map7'].plateWidth = maps['map7'].plate[0].offsetWidth; // 背景容器的寬度
                maps['map7'].plateHeight = maps['map7'].plate[0].offsetHeight; // 背景容器的高度
            }
        });
    }

    maps['map4'].img.src = "img/page4/p4_bg.webp";
    if ($(window).width() > 768) {
        maps['map6'].img.src = "img/page6/p6_bg.webp";
        maps['map7'].img.src = "img/page7/p7_bg.webp";
        pcAddMapEvent();
        $('.event_gnb').addClass('type_clear');
        $('.event_gnb').removeClass('type_default');
        pcSwiper();
    } else {
        maps['map4'].currentX = -470 + ($(window).width() - 375) / 2;
        maps['map4'].currentY = -121;
        maps['map4'].canvasWidth = 1868.8;
        maps['map4'].canvasHeight = 911.04;
        maps['map4'].canvas.width = $(window).width();
        maps['map4'].canvas.height = 670;
        maps['map4'].plate.css('width', `${maps['map4'].canvasWidth}px`).css('height', `${maps['map4'].canvasHeight}px`);
        maps['map4'].plate.css('transform', `translate3d(${maps['map4'].currentX}px, ${maps['map4'].currentY}px, 0px)`);
        drawCanvas('map4');
        maps['map6'].currentX = -1147 + ($(window).width() - 375) / 2;
        maps['map6'].currentY = -234 + ($(window).height() - 675) / 2;
        maps['map6'].plate.css('transform', `translate3d(${maps['map6'].currentX}px, ${maps['map6'].currentY}px, 0px)`);
        $('.section_place button:not(.not)').on('click', (e) => {
            // 更新背景位置
            if (e.currentTarget.classList.length > 0) {
                maps['map7'].mapContainer.addClass('mini');
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
            let maxX = 0; // 右边界
            let maxY = 0; // 下边界
            maps['map4'].canvas.width = $(window).width();
            maps['map4'].canvas.height = 1268;
            maps['map4'].canvasWidth = 2603.8;
            maps['map4'].canvasHeight = 1269;
            maps['map4'].plate.css('width', `${maps['map4'].canvasWidth}px`);
            maps['map4'].plate.css('height', `${maps['map4'].canvasHeight}px`);
            maps['map4'].mapWidth = maps['map4'].mapContainer[0].offsetWidth; // 父容器的寬度
            maps['map4'].mapHeight = maps['map4'].mapContainer[0].offsetHeight; // 父容器的高度
            maps['map4'].plateWidth = maps['map4'].plate[0].offsetWidth; // 背景容器的寬度
            maps['map4'].plateHeight = maps['map4'].plate[0].offsetHeight; // 背景容器的高度
            maps['map4'].currentX += ($(window).width() - originWindowWidth) / 2;
            maps['map4'].currentY += ($(window).height() - originWindowHeight) / 2;
            let minX = maps['map4'].mapWidth - maps['map4'].plateWidth; // 左边界
            let minY = maps['map4'].mapHeight - maps['map4'].plateHeight; // 上边界
            maps['map4'].currentX = Math.max(minX, Math.min(maxX, maps['map4'].currentX));
            maps['map4'].currentY = Math.max(minY, Math.min(maxY, maps['map4'].currentY));
            maps['map4'].plate.css("transform", `translate3d(${maps['map4'].currentX}px, ${maps['map4'].currentY}px, 0)`);
            drawCanvas('map4');
            maps['map6'].canvas.width = $(window).width();
            maps['map6'].canvas.height = $(window).height();
            maps['map6'].mapWidth = maps['map6'].mapContainer[0].offsetWidth; // 父容器的寬度
            maps['map6'].mapHeight = maps['map6'].mapContainer[0].offsetHeight; // 父容器的高度
            maps['map6'].plateWidth = maps['map6'].plate[0].offsetWidth; // 背景容器的寬度
            maps['map6'].plateHeight = maps['map6'].plate[0].offsetHeight; // 背景容器的高度
            maps['map6'].currentX += ($(window).width() - originWindowWidth) / 2;
            maps['map6'].currentY += ($(window).height() - originWindowHeight) / 2;
            minX = maps['map6'].mapWidth - maps['map6'].plateWidth;
            minY = maps['map6'].mapHeight - maps['map6'].plateHeight; // 上边界
            maps['map6'].currentX = Math.max(minX, Math.min(maxX, maps['map6'].currentX));
            maps['map6'].currentY = Math.max(minY, Math.min(maxY, maps['map6'].currentY));
            maps['map6'].plate.css("transform", `translate3d(${maps['map6'].currentX}px, ${maps['map6'].currentY}px, 0)`);
            drawCanvas('map6');
            maps['map7'].canvas.width = $(window).width();
            maps['map7'].canvas.height = $(window).height();
            maps['map7'].mapWidth = maps['map7'].mapContainer[0].offsetWidth;
            maps['map7'].mapHeight = maps['map7'].mapContainer[0].offsetHeight; // 父容器的高度
            maps['map7'].plateWidth = maps['map7'].plate[0].offsetWidth; // 背景容器的寬度
            maps['map7'].plateHeight = maps['map7'].plate[0].offsetHeight; // 背景容器的高度
            maps['map7'].currentX += ($(window).width() - originWindowWidth) / 2;
            maps['map7'].currentY += ($(window).height() - originWindowHeight) / 2;
            minY = maps['map7'].mapHeight - maps['map7'].plateHeight; // 上边界
            minX = maps['map7'].mapWidth - maps['map7'].plateWidth;
            maps['map7'].currentX = Math.max(minX, Math.min(maxX, maps['map7'].currentX));
            maps['map7'].currentY = Math.max(minY, Math.min(maxY, maps['map7'].currentY));
            maps['map7'].plate.css("transform", `translate3d(${maps['map7'].currentX}px, ${maps['map7'].currentY}px, 0)`);
            drawCanvas('map7');
            originWindowWidth = $(window).width();
            originWindowHeight = $(window).height();
            if (originWindowWidth <= 768) {
                pcAddMapEvent();
            }
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
            maps['map4'].canvas.width = $(window).width();
            maps['map4'].canvas.height = 670;
            maps['map4'].currentX = -470 + ($(window).width() - 375) / 2;
            maps['map4'].currentY = -121;
            maps['map4'].plate.css('transform', `translate3d(${maps['map4'].currentX}px, ${maps['map4'].currentY}px, 0px)`);
            drawCanvas('map4');
            maps['map6'].currentX = -1147 + ($(window).width() - 375) / 2;
            maps['map6'].currentY = -234 + ($(window).height() - 675) / 2;
            maps['map6'].plate.css('transform', `translate3d(${maps['map6'].currentX}px, ${maps['map6'].currentY}px, 0px)`);
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

