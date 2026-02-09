primaryButtons = [
    "space",
    "obfuscate",
    "scale",
    "alignment",
    "gradient"
];

spaceButtons = [
    "slow",
    "pause",
    "funnel",
    "split"
];
obfuscateButtons = [
    "age",
    "censor",
    "forget",
    "hide"
];
scaleButtons =[
    "decay",
    "notice",
    "lost",
    "focus"
];
alignmentButtons = [
    "indent",
    "cycle",
    "orphan",
    "sequence"
];
gradientButtons = [
    "dawn",
    "shadow",
    "seek",
    "reincarnate"
];

storedPoem = `<div class = "poemLine">I met a traveller from an antique land,</div>
<div class = "poemLine">Who said—“Two vast and trunkless legs of stone</div>
<div class = "poemLine">Stand in the desert. . . . Near them, on the sand,</div>
<div class = "poemLine">Half sunk a shattered visage lies, whose frown,</div>
<div class = "poemLine">And wrinkled lip, and sneer of cold command,</div>
<div class = "poemLine">Tell that its sculptor well those passions read</div>
<div class = "poemLine">Which yet survive, stamped on these lifeless things,</div>
<div class = "poemLine">The hand that mocked them, and the heart that fed;</div>
<div class = "poemLine">And on the pedestal, these words appear:</div>
<div class = "poemLine">My name is Ozymandias, King of Kings;</div>
<div class = "poemLine">Look on my Works, ye Mighty, and despair!</div>
<div class = "poemLine">Nothing beside remains. Round the decay</div>
<div class = "poemLine">Of that colossal Wreck, boundless and bare</div>
<div class = "poemLine">The lone and level sands stretch far away.</div>`;

// menu and global logic

let poemLines;
let originalLineHTML;

let timeouts = [];
let activeButton = "space";
let mouseMoveHandler = null;

let activeList = spaceButtons; // start out as spaceButtons
let currentCategory = "space"; // track which category is active

function rightButtonActivate(activeButton) {
    leftButtonActivate(currentCategory, activeButton);
};

function leftButtonActivate(activeButton, activeRightButton = null) {
    
    currentCategory = activeButton; // store category that has been activated

    // switching activeList
    if (activeButton === "space") {
        activeList = spaceButtons;
    } else if (activeButton === "obfuscate") {
        activeList = obfuscateButtons;
    } else if (activeButton === "scale") {
        activeList = scaleButtons;
    } else if (activeButton === "alignment") {
        activeList = alignmentButtons;
    } else if (activeButton === "gradient") {
        activeList = gradientButtons;
    }

    // filling in left links
    document.getElementById("leftlinks").innerHTML = ""; 

    for (let i = 0; i < primaryButtons.length; i++) {
        if (primaryButtons[i].toLowerCase() === currentCategory) {  // Compare to currentCategory instead
            document.getElementById("leftlinks").innerHTML += ("<button>" + primaryButtons[i] + "</button>" + "<br>");
        } else {
            document.getElementById("leftlinks").innerHTML += ("<button class='inactive'>" + primaryButtons[i] + "</button>" + "<br>");
        }
    }

    // filling in right links
    document.getElementById("rightlinks").innerHTML = "";
    
    // determine which right button should be active
    const activeRight = activeRightButton || activeList[0];
    
    for (let i = 0; i < activeList.length; i++) {
        if (activeList[i] === activeRight) {
            document.getElementById("rightlinks").innerHTML += ("<button>" + activeList[i] + "</button>" + "<br>");
        } else {
            document.getElementById("rightlinks").innerHTML += ("<button class='inactive'>" + activeList[i] + "</button>" + "<br>");
        }
    }

    if (!activeRightButton) {
        const firstButton = document.querySelector("#rightlinks button");
        if (firstButton) {
            firstButton.click();
        }
    }

};

addEventListener("load", (event) => {
    const poemContainer = document.querySelector('.poemContainer');
    consistentContainer = poemContainer;
    const poem = document.querySelector('.poem');
    consistentPoem = poem;
    poemLines = poemContainer.querySelectorAll('.poemLine');
    originalLineHTML = Array.from(poemLines).map(line => line.innerHTML);
});

addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON" && event.target.parentElement.id === "leftlinks") {
        leftButtonActivate(event.target.innerText.toLowerCase());
    } else if (event.target.tagName === "BUTTON" && event.target.parentElement.id === "rightlinks") {
        rightButtonActivate(event.target.innerText);
    }
    
});

//
//
//

addEventListener("click", (event) => {
    
    let stop = false;

    function resetStyles() {

        poemContainer = consistentContainer;
        poem = consistentPoem;

        // timeout stuff
        stop = true;
        timeouts.forEach(id => clearTimeout(id));
        timeouts = [];

        // removing glow circle
        if (mouseMoveHandler) {
            document.removeEventListener('mousemove', mouseMoveHandler);
            mouseMoveHandler = null;
        }
        const glowy = document.getElementById('glow');
        if (glowy) {
            glowy.style.opacity = '0';
        }

        // reverting styles
        poem.style = "revert";
        poem.id = "";
        poemContainer.id = "";
        poemContainer.style = "revert";

        // reset HTML
        poemLines.forEach((line, index) => {
            if (line.querySelector('span')) {
                line.innerHTML = originalLineHTML[index];
            }
            if (line.querySelector('mark')) {
                line.innerHTML = originalLineHTML[index];
            }
            line.innerHTML = originalLineHTML[index];
            line.style.cssText = '';
            line.className = 'poemLine';
        });
    }
    

    // MENU

    if (event.target.tagName === "BUTTON" && event.target.innerText === "Ozymandias") {
        resetStyles();
    }

    //
    // 
    // SPACE
    // 
    // 
    

    // SLOW
    if (event.target.tagName === "BUTTON" && event.target.innerText === "slow") {
        
        resetStyles();
        lineNumber = .75;

        poemLines.forEach((line, index) => {
            
            line.style.lineHeight = (lineNumber) + '';
            lineNumber += 0.25;

        });

    }

    // PAUSE
    if (event.target.tagName === "BUTTON" && event.target.innerText === "pause") {
        
        resetStyles();
        lineNumber = 1;

        poemLines.forEach((line, index) => {
            
            line.style.wordSpacing = (lineNumber) + 'em';
            lineNumber += 0.4;

        });
    }

    // FUNNEL
    if (event.target.tagName === "BUTTON" && event.target.innerText === "funnel") {
        
        resetStyles();
        lineNumber = 3.5;

        poemContainer.style.alignItems = "center";

        poemLines.forEach((line, index) => {

            line.style.wordSpacing = (lineNumber) + 'em';
            lineNumber -= 0.4;
        }
        );
    }

    // SPLIT
    if (event.target.tagName === "BUTTON" && event.target.innerText === "split") {
        
        resetStyles();

        poemLines.forEach((line, index) => {
            
            line.style.lineHeight = 0.5;

        });

        poemLines[11].style.lineHeight = 5;
        poemLines[12].style.lineHeight = 8;
        poemLines[13].style.lineHeight = 16;

    }

    //
    // 
    // OBFUSCATE
    // 
    // 

    // AGE
    if (event.target.tagName === "BUTTON" && event.target.innerText === "age") {
        resetStyles();
        stop = false;

        poemLines.forEach((line, index) => {
                const timeoutId = setTimeout(() => {
                    if (!stop) {
                        line.style.opacity = 0;
                        line.style.transition = "opacity 1s ease-in-out";
                    }
                }, 2000 * index + 5);
                
                timeouts.push(timeoutId);
            });
    }
    
    // CENSOR
    if (event.target.tagName === "BUTTON" && event.target.innerText === "censor") {
        resetStyles();


        for (let i = 0; i < poemLines.length; i++) {
            if (i === 11) {
                break; // Exits the loop entirely
            }
            poemLines[i].innerHTML = `<span style="background-color: white">${poemLines[i].textContent}</span>`;
        }
    }

    // FORGET *** NEEDS TO RESET HTML
    if (event.target.tagName === "BUTTON" && event.target.innerText === "forget") {
        resetStyles();
        poemLines.forEach((line, index) => {
            marks = line.querySelectorAll('mark')
            marks.forEach((mark, index) => {
                mark.style.backgroundColor = 'white';
                mark.style.color = 'white';
            })
        });
    }

    // HIDE
    if (event.target.tagName === "BUTTON" && event.target.innerText === "hide") {
        resetStyles();
        poemLines.forEach((line, index) => {
            line.style.color = "black";
            marks = line.querySelectorAll('mark')
            marks.forEach((mark, index) => {
                mark.style.color = "black";
            })
        });
    }

    //
    // 
    // SCALE
    // 
    // 

    // DECAY
    if (event.target.tagName === "BUTTON" && event.target.innerText === "decay") {
        resetStyles();
        lineNumber = 3;

        poemLines.forEach((line, index) => {
            marks = line.querySelectorAll('mark')
            marks.forEach((mark, index) => {
                mark.style.fontSize = (lineNumber) + 'px';
            })
            line.style.fontSize = (lineNumber) + 'px';
            lineNumber += 1.5;
            
        });
    }

    // NOTICE
    if (event.target.tagName === "BUTTON" && event.target.innerText === "notice") {
        resetStyles();
        lineNumber = 1;
        poemLines.forEach((line, index) => {

            marks = line.querySelectorAll('mark')
            marks.forEach((mark, number) => {
                if (index === 5 || index === 6 || index === 7) {
                    mark.style.fontSize = 14 + 'px';
                } else if (index === 11 || index === 13) {
                    mark.style.fontSize = 34 + 'px';
                } else {
                    mark.style.fontSize = 6 + 'px';
                }
            })


            if (index === 5 || index === 6 || index === 7) {
                line.style.fontSize = 14 + 'px';
            } else if (index === 11 || index === 13) {
                line.style.fontSize = 34 + 'px';
            } else {
                line.style.fontSize = 6 + 'px';
            }

        }
        );  
    }

    // LOST
    if (event.target.tagName === "BUTTON" && event.target.innerText === "lost") {
        resetStyles();
        lineNumber = 0;
        poemLines.forEach((line, index) => {
            line.style.fontSize = 4 + 'px';
            marks = line.querySelectorAll('mark')
            marks.forEach((mark, number) => {
                mark.style.fontSize = 4 + 'px';
        }
    )
}
    );
    }

    // FOCUS
    if (event.target.tagName === "BUTTON" && event.target.innerText === "focus") {
        resetStyles();
        lineNumber = 0;
        poem.style.overflow = "hidden";
        poem.style.alignItems = "flex-start";
        poemContainer.style.justifyContent = "flex-end";
        poemContainer.style.overflow = "visible";
        poemLines.forEach((line, index) => {
            line.style.textWrap = "nowrap";
            line.style.lineHeight = 1 + 'em';
            line.style.fontSize = 54 + 'px';
            marks = line.querySelectorAll('mark')
                marks.forEach((mark, number) => {
                    mark.style.textWrap = "nowrap";
                    mark.style.lineHeight = 1 + 'em';
                    mark.style.fontSize = 54 + 'px';
                }
            )
        }
    )
}

    //
    //
    // ALIGNMENT
    //
    //

    // INDENT
    if (event.target.tagName === "BUTTON" && event.target.innerText === "indent") {
        resetStyles();
        lineNumber = 1;
        poem.style.alignItems = "flex-start";
        poemLines.forEach((line, index) => {
            line.style.textIndent = (lineNumber) + 'em';
            lineNumber = (lineNumber*1.3);
        }
    )
    }

    // CYCLE
    if (event.target.tagName === "BUTTON" && event.target.innerText === "cycle") {
        resetStyles();
        let toggle = false;
        poem.style.alignItems = "stretch";
        poemLines.forEach((line, index) => {
            line.style.flex = "1";
            if (toggle === false) {
                line.style.textAlign = "left";
                toggle = true;
            } else if (toggle === true) {
                line.style.textAlign = "right";
                toggle = false;
            } 
        });

    }
    
    // ORPHAN
    if (event.target.tagName === "BUTTON" && event.target.innerText === "orphan") {
        resetStyles();
        poem.style.alignItems = "stretch";
        poemLines.forEach(line => {
            const words = line.textContent.trim().split(' ');
            const lastWord = words.pop();
            const restOfWords = words.join(' ');
            
            line.innerHTML = `<span>${restOfWords}</span><span>${lastWord}</span>`;
            line.style.display = 'flex';
            line.style.justifyContent = 'space-between';
        });
    }

    // SEQUENCE
    if (event.target.tagName === "BUTTON" && event.target.innerText === "sequence") {
        resetStyles();

        poemContainer.style.flexDirection = "row";
        poemContainer.style.alignItems = "center";
    }

    //
    //
    // GRADIENT
    //
    //

    // DAWN
    if (event.target.tagName === "BUTTON" && event.target.innerText === "dawn") {
        resetStyles();
        poemContainer.id =  "gradientText";
    }

    // SHADOW
    if (event.target.tagName === "BUTTON" && event.target.innerText === "shadow") {
        resetStyles();
        poem.id = "gradientBackground";
    }

    // SEEK
    if (event.target.tagName === "BUTTON" && event.target.innerText === "seek") {
        resetStyles();
        poem.style.backgroundColor = 'black';
        poemContainer.style.color = 'black';
        marks = document.querySelectorAll('mark')
            marks.forEach((mark, index) => {
                mark.style.color = 'black';
            })
        const glowy = document.getElementById('glow');
        mouseMoveHandler = (event) => {
            glowy.style.opacity = '100%';
            glowy.style.left = event.clientX + 'px';
            glowy.style.top = event.clientY + 'px';
        };
        document.addEventListener('mousemove', mouseMoveHandler);
    }

    // REINCARNATE
    if (event.target.tagName === "BUTTON" && event.target.innerText === "reincarnate") {
        resetStyles();
        poem.id = "reincarnation";
        poem.style.cursor = "pointer";
        poem.style.zIndex = "1";

        const hexChars = ["0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"];
        let randomHex = "#";
        let randomHex2 = "#";
        randomHex += hexChars[Math.floor(Math.random() * 16)];
        randomHex2 += hexChars[Math.floor(Math.random() * 16)];
        poem.style.background = "radial-gradient(circle at center, " + randomHex + " 0%, " + randomHex2 + " 100%)";

        addEventListener("click", (event) => {
            if (event.target.classList.contains("poem")) {
                let randomHex = "#";
                let randomHex2 = "#";
                for (let i = 0; i < 6; i++) {
                    randomHex += hexChars[Math.floor(Math.random() * 16)];
                    randomHex2 += hexChars[Math.floor(Math.random() * 16)];
                }
            const poem = event.target;
            poem.style.background = "radial-gradient(circle at center, " + randomHex + " 0%, " + randomHex2 + " 100%)";
    }
});
    }




});
