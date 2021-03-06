/**
 * Created by Lidia Khmylko on 2/27/17.
 */

"use strict";

var puzzle = (function(){
    var puzzle;

    function Puzzle(options) {
        var elem = options.elem;

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

        // placeholder for tile design
        var placeholder = "0";

        var tiles = elem.children;
        init(tiles);

        // placeholder li element for layout
        function createEmpty(){
            var emptyLi = document.createElement("li");
            emptyLi.setAttribute("class", "tile empty");
            emptyLi.innerHTML = placeholder;
            elem.appendChild(emptyLi);
        }

        // init the tiles with data-xy attribute for swap calculations later
        function init(tiles){
            createEmpty();
            for (var i = 0; i < tiles.length; i++){
                tiles[i].setAttribute("data-xy", indexXY[i]);
                //console.log(tiles[i]);
            }
        }

        function shuffle(){
            //console.log("Shuffling...");
            var shuffled = shuffle_array(Object.keys(indexXY));
            //console.log(shuffled);
            for (var i = 0; i < tiles.length; i++){
                var n = +shuffled[i];
                if (n === 0){
                    tiles[i].setAttribute("class", "tile empty");
                    tiles[i].innerHTML = placeholder;
                } else {
                    tiles[i].setAttribute("class", "tile");
                    tiles[i].innerHTML = n;
                }
            }
        }

        // A tile can swap into the empty space if they are 1 or 10 apart in merged XY-coordinates
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
                var empty = getEmptyTile();
                var num = tile.innerHTML;
                //console.log("swapping " + num);
                tile.setAttribute("class", "tile empty");
                empty.setAttribute("class", "tile");
                empty.innerHTML = num;
                tile.innerHTML = placeholder;
            }
        }

        this.shuffle = shuffle;
    }

    function ready(){
        puzzle = new Puzzle({
            elem: document.querySelector(".sliding-puzzle")
        });
    }

    // shuffling an array in-place
    function shuffle_array(array) {
        var m = array.length, temp, i;

        // While there remain elements to shuffle
        while (m) {

            // Pick a remaining element
            i = Math.floor(Math.random() * m--);

            // And swap it with the current element.
            temp = array[m];
            array[m] = array[i];
            array[i] = temp;
        }

        return array;
    }

    document.addEventListener("DOMContentLoaded", ready);

    // Exposed shuffle function
    // Usage: puzzle.shuffle()
    return {
        shuffle: function() {
            puzzle.shuffle();
        }
    }
})();