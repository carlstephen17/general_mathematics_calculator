function selection() {

    const selected = document.getElementById('selected').value;
    console.log("Selected:", selected);

    const labelA = document.getElementById('labelA');
    const labelB = document.getElementById('labelB');
    const labelC = document.getElementById('labelC');

    labelA.textContent = "Value A";
    labelB.textContent = "Value B";
    labelC.textContent = "Value C";

    document.getElementById('a').style.display = "block";
    document.getElementById('b').style.display = "block";
    document.getElementById('c').style.display = "block";

    if (selected === "missingA") {
        labelA.textContent = "";
        document.getElementById('a').style.display = "none";
    } 
    else if (selected === "missingB") {
        labelB.textContent = "";
        document.getElementById('b').style.display = "none";
    } 
    else if (selected === "missingC") {
        labelC.textContent = "";
        document.getElementById('c').style.display = "none";
    } 
}


function pythagorean() {
    const selected = document.getElementById('selected').value;

    if (!selected) {
        alert("Please select which value is missing!");
        return;
    }

    const a = parseFloat(document.getElementById('a').value);
    const b = parseFloat(document.getElementById('b').value);
    const c = parseFloat(document.getElementById('c').value);

    let result = "";
    let outcome = "";
    let explanation = "";

    if (selected === "missingA") {

        const value = c * c - b * b;
        if (value < 0) {
            outcome = "Error: C must be larger than B for a real triangle.";
        } else {
            result = Math.sqrt(value);
            outcome = `A = ${result}`;
            explanation = `A = √(C² - B²) = √(${c}² - ${b}²) = ${result}`;
        }
    }

    else if (selected === "missingB") {

        const value = c * c - a * a;
        if (value < 0) {
            outcome = "Error: C must be larger than A for a real triangle.";
        } else {
            result = Math.sqrt(value);
            outcome = `B = ${result}`;
            explanation = `B = √(C² - A²) = √(${c}² - ${a}²) = ${result}`;
        }
    }

    else if (selected === "missingC") {

        result = Math.sqrt(a * a + b * b);
        outcome = `C = ${result}`;
        explanation = `C = √(A² + B²) = √(${a}² + ${b}²) = ${result}`;
    }

    else if (selected === "noMissing") {

        const isRightTriangle = Math.abs(c*c - (a*a + b*b)) < 1e-10;
        outcome = isRightTriangle ? "Triangle" : "Not a triangle";
        explanation = `Check: c² = ${c*c},  a² + b² = ${a*a + b*b}`;
    }

    document.getElementById('display').value = result;
    document.getElementById('outcome').textContent = outcome;
    document.getElementById('explanation').textContent = explanation;
}
