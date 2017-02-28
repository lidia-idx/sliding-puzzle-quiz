/**
 * Created by Lidia Khmylko on 2/27/17.
 */

"use strict";

(function(){

    function Puzzle(options) {
        var elem = options.elem;
        console.log(elem.className);

        //TODO: move to init function
        var emptyLi = document.createElement("li");
        emptyLi.setAttribute("class", "tile empty");
        emptyLi.innerHTML = "0";
        elem.appendChild(emptyLi);

        // the keys are the ordinal index of the tile and
        // the value is the merged (x,y)-coordinate in the 3x3 space
        // merged for the sake of easier calculations of canSwap()
        // as the tile can only swap to the empty space if the difference of the values is 1 or 10
        var indexXY = {
            0: "00",
            1: "01",
            2: "02",
            3: "10",
            4: "11",
            5: "12",
            6: "20",
            7: "21",
            8: "22"
        };

        var tiles = elem.children;
        init(tiles);

        function init(tiles){
            for (var i = 0; i < tiles.length; i++){
                tiles[i].setAttribute("data-xy", indexXY[i]);
                console.log(tiles[i]);
            }
        }

        function canSwap(tile){
            var empty = getEmptyTile();
            var emptyXY = empty.getAttribute("data-xy");
            var tileXY = tile.getAttribute(("data-xy"));
            var diff = Math.abs(emptyXY - tileXY);
            return ((diff === 1 ) || (diff === 10));
        }

        // return tile or null if no tile has been clicked
        function getClickedTile(e){
            var clickedElem = e.target;
            if(!(clickedElem.className === "tile" || clickedElem.className === "empty")){
                return null;
            }
            if (clickedElem.className === "empty"){
                return null;
            }
            return clickedElem;
        }

        function getEmptyTile(){
            return document.querySelector(".empty");
        }

        elem.addEventListener("click", function(event) {
            console.log("click: " + event.target.className);

            var tile = getClickedTile(event);
            if (tile === null){
                return;
            }
            swap(tile);
        });

        // swaps tile with empty element
        function swap(tile){
            if (canSwap(tile)){
                event.target.style = "border-color: blue"; // debug
                var empty = getEmptyTile();
                var num = tile.innerHTML;
                console.log("swapping " + num);
                tile.setAttribute("class", "tile empty");
                empty.setAttribute("class", "tile");
                empty.innerHTML = num;
                tile.innerHTML = "0";
            } else {
                event.target.style = "border-color: violet"; // debug
            }
        }

    }
    function ready(){
        var puzzle = new Puzzle({
            elem: document.querySelector(".sliding-puzzle")
        });

    }

    document.addEventListener("DOMContentLoaded", ready);
})();


