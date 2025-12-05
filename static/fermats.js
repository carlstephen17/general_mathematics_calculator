// Modular exponentiation function
function modPow(base, exponent, mod) {
    let result = 1;
    base = base % mod;

    while (exponent > 0) {
        if (exponent % 2 === 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exponent = Math.floor(exponent / 2);
    }
    return result;
}

// Main Fermat calculator
function fermats() {
    const base = parseInt(document.getElementById("base").value);
    const exponent = parseInt(document.getElementById("exponent").value);
    const modulo = parseInt(document.getElementById("modulo").value);

    const outcomeElement = document.getElementById("outcome");
    const explanationElement = document.getElementById("explanation");
    const displayElement = document.getElementById("display");

    // Reset display
    outcomeElement.innerHTML = "";
    explanationElement.innerHTML = "";
    displayElement.value = "";

    // Input validation
    if (isNaN(base) || isNaN(exponent) || isNaN(modulo)) {
        outcomeElement.innerHTML = "<p>Please enter valid numbers for all fields.</p>";
        displayElement.value = "Error";
        return;
    }

    if (modulo <= 1) {
        outcomeElement.innerHTML = "<p>Modulo must be greater than 1.</p>";
        displayElement.value = "Error";
        return;
    }

    if (exponent < 0) {
        outcomeElement.innerHTML = "<p>Exponent must be non-negative.</p>";
        displayElement.value = "Error";
        return;
    }

    // Check Fermat's Little Theorem applicability
    const checkFermat = modPow(base, modulo - 1, modulo);
    let solutionHTML = "";
    let explanationHTML = "";

    if (checkFermat === 1) {
        // Reduce exponent modulo (modulo - 1)
        const quotient = Math.floor(exponent / (modulo - 1));
        const remainder = exponent % (modulo - 1);

        const semiAnswer = Math.pow(base, remainder);
        const finalAnswer = modPow(base, remainder, modulo);

        // Build outcome
        solutionHTML = `
            <p><strong>Problem:</strong> (${base} ^ ${exponent}) mod ${modulo}</p>
            <p>Final Answer: <strong>${finalAnswer}</strong></p>
        `;

        // Build detailed explanation
        explanationHTML = `
            <p><strong>Step 1:</strong> Verify Fermat's Little Theorem</p>
            <p>${base} ^ (${modulo}-1) mod ${modulo} = ${checkFermat}</p>
            <p>✓ The result is 1, theorem applies.</p>
            <p><strong>Step 2:</strong> Reduce exponent</p>
            <p>${exponent} = (${modulo}-1) × ${quotient} + ${remainder}</p>
            <p>${exponent} = (${modulo - 1}) × ${quotient} + ${remainder}</p>
            <p><strong>Step 3:</strong> Apply theorem</p>
            <p>${base} ^ ${exponent} = 1 mod ${modulo}</p>
            <p>${base} ^ ${exponent} = (${base} ^ ${modulo - 1}) ^ ${quotient} x (${base} ^ ${remainder}) mod ${modulo}</p>
            <p>(1) ^ ${quotient} x ${semiAnswer} mod ${modulo}</p>
            <p>1 x ${semiAnswer} mod ${modulo}</p>
            <p>${semiAnswer} mod ${modulo}</p>
            <p><strong>Step 4:</strong> Compute result</p>
            <p>${semiAnswer} mod ${modulo} = ${finalAnswer}</p>
        `;

        displayElement.value = finalAnswer;
    } else {
        solutionHTML = "<p>Cannot apply Fermat's Little Theorem.</p>";
        explanationHTML = `
            <p><strong>Problem:</strong> (${base} ^ ${exponent}) mod ${modulo}</p>
            <p>Check: ${base} ^ (${modulo}-1) mod ${modulo} = ${checkFermat}</p>
            <p>✗ Result is not 1, theorem doesn't apply.</p>
            <p>Possible reasons:</p>
            
                •${modulo} may not be prime<br>
                •${base} and ${modulo} may not be coprime
            
        `;
        displayElement.value = "Cannot Apply";
    }

    outcomeElement.innerHTML = solutionHTML;
    explanationElement.innerHTML = explanationHTML;
}
