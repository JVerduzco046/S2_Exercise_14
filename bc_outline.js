"use strict";

/*
   New Perspectives on HTML5, CSS3 and JavaScript 6th Edition
   Tutorial 12
   Tutorial Case

   Author: Juan Verduzco
   Date:   03.29.19

   Filename: bc_outline.js


   Function List
   =============

   makeOutline()
      Generates the text of the table of contents
      as a nested list

   createList(source, TOCList, headings)
      Creates an outline based on the source document,
      list items are appended to TOCList,
      the list items are based on the element names
      specified in the headings array
*/
//Generate an outline
window.addEventListener("load", makeOutline);

function makeOutline() {
      // location of the document outline
      var outline = document.getElementById("outline");
      //Source document for outline
      var source = document.getElementById("doc");
      //Creating new elements via java
      var mainHeading = document.createElement("h1")

      var outlineList = document.createElement("ol");

      var headingText = document.createTextNode("Outline");


      //Append the text node to page element//Append the text node to page element
      mainHeading.appendChild(headingText);

      outline.appendChild(mainHeading);

      outline.appendChild(outlineList);

      createList(source, outlineList);
}


function createList(source, outlineList) {
      //headins 4 ouline
      var headings = ["H1", "H2", "H3", "H4", "H5", "H6"];
      // previouse levels of headinf
      var prevLevel = 0;
      // running total of the article headings
      var headNum = 0;
      //loop through all child nodes
      for (var n = source.firstChild; n !== null; n = n.nextSibling) {
            //examine only artical headings
            var headLevel = headings.indexOf(n.nodeName);

            if (headLevel !== -1) {

                  headNum++;

                  if (n.hasAttribute("id") === false) {
                        n.setAttribute("id", "head" + headNum);
                  }

                  var listElem = document.createElement("li");
                  //creete links to the docuemnt heads
                  var linkElem = document.createElement("a");

                  linkElem.setAttribute("href", "#" + n.id)
                  // append the link to the list item 
                  listElem.appendChild(linkElem);

                  linkElem.innerHTML = n.innerHTML;

                  if (headLevel === prevLevel) {
                        //append the list tiem to the current value
                        outlineList.appendChild(listElem);

                  } else if (headLevel > prevLevel) {
                        //start a new the list item to the currnet list' 
                        var nestedList = document.createElement("ol");

                        nestedList.appendChild(listElem);

                        outlineList.lastChild.appendChild(nestedList);

                        outlineList = nestedList;

                  } else {
                        //append the list item to a higher list 
                        var levelUp = prevLevel - headLevel;

                        for (let i = 1; i <= levelUp; i++) {
                              outlineList = outlineList.parentNode.parentNode;
                        }

                        outlineList.appendChild(listElem)

                  }
                  // update value of prevLevel
                  prevLevel = headLevel
            }
      };
}