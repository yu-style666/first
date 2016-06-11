// var name = require('name');

    $(function () {
    	 //		简介
    var mySwiper1 = new Swiper('#swiper1', {
        direction: 'vertical',
        onInit: function (swiper) { //Swiper2.x的初始化是onFirstInit
            swiperAnimateCache(swiper); //隐藏动画元素 
            swiperAnimate(swiper); //初始化完成开始动画
        },
        onSlideChangeEnd: function (swiper) {
            swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
        }
    });
        // 点击切换
        $('#swiper1').show().siblings().hide();
        $('#jianj').find('.tab').css('color', 'greenyellow')
        $('#jianj').siblings().find('.tab').css('color', '');

        $('#jianj').on('tap', function () {
            $('#swiper1').show().siblings().hide();
            $('h1').html('个人简介');
            $(this).find('.tab').css('color', 'greenyellow');
            $(this).siblings().find('.tab').css('color', '');
            //		简介
            var mySwiper1 = new Swiper('#swiper1', {
                direction: 'vertical',
                onSlideChangeEnd: function (swiper) {
                    swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画
                }
            });
        })
        $('#me').on('tap', function () {
            $('#swiper2').show().siblings().hide();
            $('h1').html('我');
            $(this).find('.tab').css('color', 'greenyellow');
            $(this).siblings().find('.tab').css('color', '');
            //		我
            var mySwiper2 = new Swiper('#swiper2', {
                effect: 'flip',
                loop: true,
//                autoplay: 2000,
                flip: {
                    slideShadows: true,
                    limitRotation: true,
                },
                prevButton: '.swiper-button-prev',
                nextButton: '.swiper-button-next'
            });
        })
        $('#kj').on('tap', function () {
            $('#frame').show().siblings().hide();
            $('h1').html('技能');
            $(this).find('.tab').css('color', 'greenyellow');
            $(this).siblings().find('.tab').css('color', '');
        })
        $('#gj').on('tap', function () {
            $('#software').show().siblings().hide();
            $('h1').html('常用工具');
            $(this).find('.tab').css('color', 'greenyellow');
            $(this).siblings().find('.tab').css('color', '');
            //     工具
            var myswiper4 = new Swiper('#swiper4', {
                //                autoplay: 2000,
                //                pagination: '.swiper-pagination',
                //                paginationClickable: true
            });
        })
        $('#xm').on('tap', function () {
            $('#object').show().siblings().hide();
            $('h1').html('项目');
            $(this).find('.tab').css('color', 'greenyellow');
            $(this).siblings().find('.tab').css('color', '');
        })

        // 音乐控制
        var key = true;
        $('#audio_btn').on('tap', function () {
                if (key == true) {
                    // $('#media')[0].pause();
                    $(this).removeClass('music');
                    key = false;
                    $('#audio')[0].pause();
                } else {
                    $(this).addClass('music');
                    key = true;
                    $('#audio')[0].play();
                }
            })
            // 分享
        $('.icon-share').on('tap', function () {
            $('#share').toggle();
        })

        // 扫描二维码
//        $('.icon-qrcode').on('tap', function () {
//            $('#qrCode').toggle();
//        })

        //        skill导入数据
        $.post('/api/skill.json', function (res) {
            //            console.log(res);
            var html = '';
            for (var i = 0; i < res.length; i++) {
                html += '<div class="frame">';
                html += '<div class="frame-ctn">';
                html += '<b>' + res[i].level + '</b>：<i>' + res[i].name + '</i> ';
                html += '</div>';
                html += '</div>';
            }
            $('#frame').html(html);
        })
    })

