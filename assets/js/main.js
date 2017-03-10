
    // var slot1 = $("#slot-1");
    var position = {};
    var maxslot = 5;
    var scaleW = 103 * 1; 
    var scaleH = 134 * 1;


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

        TweenMax.to(_slot, 1, {
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
            animateSlotTo(this.value);
        }
        document.querySelector("#slide").oninput = function() {
            animateSlotTo(this.value);
        }
        $("#btn_spin").click(function(e){
            spinslot(0);
        });
    }

    function spinslot(column){
        TweenMax.to( slot0position.slot[0], 1, {
            "top": "-900px",
            "onUpdate": function(self){
                // var _top = Number(self.target.style.top.toString().replace("px", ""));
                // if( _top <= -900 ){
                //     self.target.style.top = "0px";
                // }
            },
            "onUpdateParams": ["{self}"]
        });
    }

    function makePositionObj() {
        for (var i = 0; i < 10; ++i) {
            position["pos" + i] = (scaleH * i) + "px";
        }
    }

    function animateSlotTo(number) {
        var comma = document.querySelector("#slot-comma");
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

            animateOneSlot(x, target[x]);

        }
    }

    init();
    