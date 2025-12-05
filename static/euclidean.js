function euclidean() {
    let num1 = parseInt(document.getElementById("num1").value);
    let num2 = parseInt(document.getElementById("num2").value);

    if (isNaN(num1) || isNaN(num2)) {
        alert("Please enter valid numbers.");
        return;
    }

    let swapped = false;
    if (num1 < num2) {
        [num1, num2] = [num2, num1];
        swapped = true;
    }

    let steps = [];
    let originalNum1 = num1;
    let originalNum2 = num2;

    while (num2 !== 0) {
        let quotient = Math.floor(num1 / num2);
        let remainder = num1 % num2;
        steps.push(`<p>${num1} = ${num2} × ${quotient} + ${remainder}</p>`);
        num1 = num2;
        num2 = remainder;
    }

    let outcome = `<p>GCD of ${originalNum1} and ${originalNum2} is: ${num1}</p><p><strong>Steps:</strong></p>`;
    outcome += steps.join("");

    let explanation = "";
    if (swapped) {
        explanation += `<p>Since the first number was less than the second, they were swapped to simplify calculation.</p><br>`; 
    }
    explanation += `<p>The value after the multiplication sign ('×') is the quotient, and after the plus sign ('+') is the remainder.</p><br>`;
    explanation += `<p>When the remainder becomes 0, the remainder from the previous step is the GCD. Otherwise, the value after the '=' in the last step.</p>`;

    document.getElementById("outcome").innerHTML = outcome;
    document.getElementById("explanation").innerHTML = explanation;
    document.getElementById("display").value = num1;
}
