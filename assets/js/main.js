$(function(){

    // var slot1 = $("#slot-1");
    var position = {};
    var maxslot = 5;
    var scaleW = 103 * 1; 
    var scaleH = 134 * 1;
    var slotTweens = [];
    var comma = document.querySelector("#slot-comma");
    var maxpoint = 25000;
    var onebar = Math.floor(maxpoint / 36);
    var watchInterval;
    var prevWatchPoint;


    var slot0position = {
        "y": "0px",
        "slot": $("#slot-0")
    };
    var slot1position = {
        "y": "0px",
        "slot": $("#slot-1")
    };
    var slot2position = {
        "y": "0px",
        "slot": $("#slot-2")
    };
    var slot3position = {
        "y": "0px",
        "slot": $("#slot-3")
    };
    var slot4position = {
        "y": "0px",
        "slot": $("#slot-4")
    };

    var skin = new Skin( {
        "skinobject": $("#skin img")[0],
        "frame": 2,
        "delay": 200
    } );
    var circle = new Skin( {
        "skinobject": $("#skin-circle img")[0],
        "frame": 5,
        "delay": 100
    } );
    var light = new Skin( {
        "skinobject": $("#skin-light img")[0],
        "frame": 36,
        "delay": 25
    } );





    function Skin( opt ){
        var _opt = opt

        var skin = _opt.skinobject;
        var frame = _opt.frame;
        var currentFrame = 1;
        var width = 760;
        var interval;
        var _this = this;
        var delay = _opt.delay;
        var isPlay = false;
        var loop;

        this.play = function(){
            skin.isPlay = true;
            interval = setInterval(function(){
                _this.nextFrame();
            }, delay);
        }

        this.playWithSet = function( frames ){
            clearInterval(interval);
            loop = (!arguments[1]) ? arguments[1] : true;
            skin.isPlay = true;
            var _runIndex = 0;
            var _max = frames.length;

            interval = setInterval(function(){
                if( loop ){
                    _this.playAtFrame( frames[ _runIndex ] );
                    ++_runIndex;
                    _runIndex = ( _runIndex == _max )? 0 : _runIndex;
                }else{
                    _this.playAtFrame( frames[ _runIndex ] );
                    ++_runIndex;
                    if( _runIndex == _max ){
                        clearInterval(interval);
                    }
                }
            }, delay);
        }

        this.nextFrame = function(){
            if(currentFrame < frame){
                skin.style.left = ((width * -1) * currentFrame) + "px";
                currentFrame += 1;
            }else{
                skin.style.left = '0px';
                currentFrame = 1;
            }
        }

        this.stopAtFrame = function( frame ){
            prevWatchPoint = null;
            skin.isPlay = false;
            clearInterval(interval);
            skin.style.left = ((width * -1) * frame) + "px";
            currentFrame = frame;
        }

        this.getIsPlay = function(){
            return skin.isPlay;
        }

        this.playAtFrame = function( frame ){
            skin.isPlay = true;
            skin.style.left = ((width * -1) * frame) + "px";
            currentFrame = frame;
        }
    }



    function changeScale(w, h){

        $(".slot-item-wrapper").css({
            width: w + 'px',
            height: h + 'px'
        });
        $(".slot").css({
            width: w + 'px'
        });
        $(".slot-wrapper").css({
            height: h + 'px'
        });
        $(".slot.slot-sm").css({
            width: Math.ceil(w*0.58) + 'px'
        });
        $(".slot-sm .slot-item-wrapper").css({
            width: Math.ceil(w*0.58) + 'px'
        });

    }

    function animateOneSlot(_index, value) {
        // alert("_sslot");

        if (_index >= 0) {
            var _slot = eval("slot" + _index + "position");
        } else {
            return false;
        }

        return TweenMax.to(_slot, 1, {
            "y": "-" + position["pos" + value],
            "onUpdateParams": ["{self}"],
            "onUpdate": function(self) {
                self.target.slot.css("top", self.target.y);
            }
        });
    }

    function numberToSlotFormat(digit, number) {
        var result = '';

        if (number.toString().length < digit) {
            max = digit - number.toString().length;
            for (var i = 0; i < max; ++i) {
                result += "0";
            }
        }


        return result;
    }

    function init() {
        changeScale(scaleW, scaleH);
        makePositionObj();
        bindEvent();
    }

    function bindEvent() {
        document.querySelector("#slide").onchange = function() {
            stopWatchDevice();
            stopSlot();
            var value = this.value;
            animateSlotTo(this.value);
            setTimeout(function(){
                stopLightAt(value);
            }, 1000);
        }
        document.querySelector("#slide").oninput = function() {
            stopWatchDevice();
            stopSlot();
            var value = this.value;
            animateSlotTo(this.value);
            setTimeout(function(){
                stopLightAt(value);
            }, 1000);
        }
        document.querySelector("#slide").onmousedown = function() {
            stopWatchDevice();
            skin.stopAtFrame(1);
            skin.play();
        }
        document.querySelector("#stop_number").oninput = function () {
            if (this.value.length > 5) {
                this.value = this.value.slice(0,5); 
            }
        }

        $("#btn_watch_device").click(function(e){
            stopWatchDevice();
            var ip_server = 'http://' + $("#device_ip").val().trim();
            ip_server = 'http://192.168.3.29:8888/dandara/www/test.php';

            if( !ip_server ){
                alert('ใส่ ip server ก่อนใช้งาน');
                return false;
            }

            skin.stopAtFrame(1);
            skin.play();
            circle.stopAtFrame(1);
            circle.play();

            watchInterval = setInterval(
                function(){
                    $.get({
                        url: ip_server,
                        cache: false,
                        dataType: 'json'
                    }).then(function( data ){
                        if( data.point != prevWatchPoint ){
                            // var value = Number( data.point) ;
                            var value = Math.ceil(Math.random()*25000) ;
                            animateSlotTo(value);
                            stopLightAt(value);
                        }
                        // prevWatchPoint = data.point;
                        prevWatchPoint = value;
                    });
                }
            , 1500);
        });

        $("#btn_spin").click(function(e){
            stopWatchDevice();
            skin.stopAtFrame(1);
            circle.stopAtFrame(1);

            if( !skin.getIsPlay() ){
                skin.play();
                circle.play();
                light.playWithSet([
                        1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2
                    ], true);

                setTimeout(function(){
                    slotTweens[0] = spinslot(0);
                }, 0);
                setTimeout(function(){
                    slotTweens[1] = spinslot(1);
                }, 100);
                setTimeout(function(){
                    slotTweens[2] = spinslot(2);
                }, 200);
                setTimeout(function(){
                    slotTweens[3] = spinslot(3);
                }, 300);
                setTimeout(function(){
                    slotTweens[4] = spinslot(4);
                }, 400);
            }
        });
        $("#btn_stop").click(function(e){
            stopWatchDevice();
            stopSlot();
        });
    }

    function stopWatchDevice(){
        clearInterval( watchInterval );
    }

    function spinslot(column){
        var obj = eval("slot" + column + "position");
        obj.y = 0;
        obj.slot.css("top", 0);

        TweenMax.to(comma, 1, {
            "top": "-" + scaleH + "px"
        });

        var t = TweenMax.to( obj, 1, {
            "y": "-" + (scaleH * 9) + "px",
            "repeat": -1,
            "ease": Linear.easeNone,
            "onUpdate": function(self){
                self.target.slot.css("top", self.target.y);
            },
            "onUpdateParams": ["{self}"]
        });
        return t;
    }

    function stopSlot(){
        // for(var i = 0; i < slotTweens.length; ++i){
        //     if( slotTweens[i].target ){
        //         eval("slot" + i + "position").y = slotTweens[i].target.slot.css('top');
        //         slotTweens[i].pause();
        //     }
        // }
        
        // stopSlot();
        var target_number = Number(document.getElementById("stop_number").value)
        animateSlotTo( target_number );
        setTimeout(function(){
            skin.stopAtFrame(1);
            circle.stopAtFrame(4);
            stopLightAt( target_number );
        }, 1000);
    }

    function stopLightAt( target_number ){
        target_number = Number( target_number );
        target_number = ( target_number == maxpoint )? 35 : Math.floor(target_number / onebar) ;


        // light.stopAtFrame( target_number );
        light.playWithSet( makeFrameSet(target_number), false );
    }

    function makeFrameSet( maxFrame ){
        var array = [];
        var max = maxFrame;
        for( var i = 0 ; i < max ; ++i ){
            array.push( i + 1 );
        }
        return array;
    }

    function makePositionObj() {
        for (var i = 0; i < 10; ++i) {
            position["pos" + i] = (scaleH * i) + "px";
        }
    }

    function animateSlotTo(number) {
        if (number.toString().length > 3) {
            TweenMax.to(comma, 1, {
                "top": "-" + scaleH + "px"
            });
        } else {
            TweenMax.to(comma, 1, {
                "top": "0px"
            });
        }

        target = numberToSlotFormat(maxslot, number) + number;

        for (var x = 0; x < target.length; ++x) {

            slotTweens[x] = animateOneSlot(x, target[x]);

        }
    }

    init();


});