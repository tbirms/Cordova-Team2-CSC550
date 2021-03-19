function displayAllPositions (n) {
    let position = n;
    let n1 = 0, n2 = 1, nextTerm;
    var start, end, total;
    var message = "";
    
    // start the clock! 
    start = performance.now(); // NOTE: WebKit Browser Engine (iOS) only supports resolution of 1ms>
    for (let i = 0; i < position; i++) {
        message += n1;
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
        end = performance.now();

        message += " (" + parseFloat((end - start).toFixed(5)) + " ms)";
        if (n1 != 0 && i != position -1) {
            message += ", ";
        }

    }
    total = performance.now();

    // display results
    message += "<br><br>Total Time: " + parseFloat((total - start).toFixed(5)) + " ms";
    document.getElementById("textDisplay").innerHTML = message;

};

function displayCurrentPosition(n) {
    let arr = [0, 1];
    var start, end;
    var time;
    var message = "";
    
    // start the clock! 
    start = performance.now(); // NOTE: WebKit Browser Engine (iOS) only supports resolution of 1ms>
    for (let i = 2; i < n + 2; i++){
      arr.push(arr[i - 2] + arr[i -1])
    }
    end = performance.now();
    time = parseFloat((end - start).toFixed(5));

    // display results
    message = (arr[n-1]) + " (" + time + " ms)<br><br>Total Time: " + time + " ms";
    document.getElementById("textDisplay").innerHTML += message;

};

document.getElementById("Calculate 50").addEventListener("click", function() {
    document.getElementById("inputValue").value = "";
    document.getElementById("textDisplay").innerHTML = "";
    displayAllPositions(50);
});

document.getElementById("Calculate N").addEventListener("click", function() {
    let n = Number(document.getElementById("inputValue").value);
    document.getElementById("inputValue").value = "";
    document.getElementById("textDisplay").innerHTML = "";

    if (n <= 0) {
        document.getElementById("textDisplay").innerHTML += "Please enter a positive value";
    }
    else {
        displayAllPositions(n);
    }

});

document.getElementById("Calculate Position").addEventListener("click", function() {
    let n = Number(document.getElementById("inputValue").value);
    document.getElementById("inputValue").value = "";
    document.getElementById("textDisplay").innerHTML = "";
    var start = performance.now();
    
    if (n <= 0) {
        document.getElementById("textDisplay").innerHTML += "Please enter a positive value";
    }
    else if (n==1) {
        var total = performance.now();
        document.getElementById("textDisplay").innerHTML += 0 + " (" + parseFloat((total - start).toFixed(3)) + " ms) <br><br> Total Time: " + parseFloat((total - start).toFixed(3)) + " ms";
    }
    else {
        displayCurrentPosition(n);
    }

});
