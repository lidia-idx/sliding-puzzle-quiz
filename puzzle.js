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

        var tiles = elem.children;
        console.log(tiles[0]);


        function canSwap(elem){
            return true; //TODO
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
            event.target.style = "border-color: blue";

            var tile = getClickedTile(event);
            if (tile === null){
                return;
            }
            swap(tile);
        });

        // swaps tile with empty element
        function swap(tile){
            if (canSwap(tile)){
                console.log("swapping");
                //TODO
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


