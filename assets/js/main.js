$(function(){

    // var slot1 = $("#slot-1");
    var position = {};
    var maxslot = 5;
    var scaleW = 103 * 1; 
    var scaleH = 134 * 1;
    var slotTweens = [];
    var comma = document.querySelector("#slot-comma");


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

    var skin = new Skin();


    function Skin(){

        var skin = $(".slot-skin img")[0];
        var frame = 2;
        var currentFrame = 1;
        var width = 760;
        var interval;
        var _this = this;
        var delay = 200;
        var isPlay = false;

        this.play = function(){
            interval = setInterval(function(){
                _this.nextFrame();
            }, delay);
        }

        this.nextFrame = function(){
            if(currentFrame < 2){
                skin.style.left = (-760 * currentFrame) + "px";
                currentFrame += 1;
            }else{
                skin.style.left = '0px';
                currentFrame = 1;
            }
        }

        this.stopAtFrame = function( frame ){
            clearInterval(interval);
            skin.style.left = (-760 * frame) + "px";
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
            stopSlot();
            animateSlotTo(this.value);
        }
        document.querySelector("#slide").oninput = function() {
            stopSlot();
            animateSlotTo(this.value);
        }
        document.querySelector("#slide").onmousedown = function() {
            skin.stopAtFrame(1);
            skin.play();
        }
        document.querySelector("#stop_number").oninput = function () {
            if (this.value.length > 5) {
                this.value = this.value.slice(0,5); 
            }
        }
        $("#btn_spin").click(function(e){
            if( !skin.isPlay ){
                skin.play();
                skin.isPlay = true;
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
            stopSlot();
        });
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
        skin.isPlay = false;
        // for(var i = 0; i < slotTweens.length; ++i){
        //     if( slotTweens[i].target ){
        //         eval("slot" + i + "position").y = slotTweens[i].target.slot.css('top');
        //         slotTweens[i].pause();
        //     }
        // }
        
        // stopSlot();
        animateSlotTo( Number(document.getElementById("stop_number").value) );
        setTimeout(function(){
            skin.stopAtFrame(1);
        }, 1000);
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