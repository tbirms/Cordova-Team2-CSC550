function displayAllPositions (n) {
    let position = n;
    let n1 = 0, n2 = 1, nextTerm;
    var start = performance.now();

    for (let i = 0; i < position; i++) {
        document.getElementById("textDisplay").innerHTML += n1;
        nextTerm = n1 + n2;
        n1 = n2;
        n2 = nextTerm;
        var end = performance.now();

        document.getElementById("textDisplay").innerHTML += " (" + parseFloat((end - start).toFixed(3)) + " ms)";
        if (n1 != 0 && i != position -1) {
            document.getElementById("textDisplay").innerHTML += ", ";
        }

    }

};

function displayCurrentPosition(n) {
    let arr = [0, 1];
    var start = performance.now();

    for (let i = 2; i < n + 2; i++){
      arr.push(arr[i - 2] + arr[i -1])
    }
    var end = performance.now();
    document.getElementById("textDisplay").innerHTML += (arr[n-1]) + " (" + parseFloat((end - start).toFixed(3)) + " ms)";

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
        var end = performance.now();
        document.getElementById("textDisplay").innerHTML += 0 + " (" + parseFloat((end - start).toFixed(3)) + " ms)";
    }
    else {
        displayCurrentPosition(n);
    }

});
