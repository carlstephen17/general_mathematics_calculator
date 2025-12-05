function primitive() {
  var base = parseInt(document.getElementById("base").value.trim());
  var mod = parseInt(document.getElementById("mod").value.trim());
  const store = [];
  var outcome = ""; 
  var explanation = "";

  if (isNaN(base) || isNaN(mod) || mod <= 1 || base <= 0) {
    document.getElementById("display").value = "Please enter valid positive numbers.";
    document.getElementById("outcome").innerHTML = "";
    document.getElementById("explanation").innerHTML = "";
    return;
  }

  function modPow(base, exponent, mod) {
    let result = 1;
    base = base % mod;
    while (exponent > 0) {
      if (exponent % 2 === 1) {
        result = (result * base) % mod;
      }
      exponent = Math.floor(exponent / 2);
      base = (base * base) % mod;
    }
    return result;
  }

  for (var exponent = 1; exponent < mod; exponent++) {
    var result = modPow(base, exponent, mod);

    if (store.includes(result)) {
      document.getElementById("display").value = `${base} is NOT a primitive root of ${mod}`;
      outcome += `(${base} ^ ${exponent}) mod ${mod} = ${result}<br>`;
      outcome += `<br>End of the calculation since the last step of the result have duplicated which is ${result}`;
      explanation += `• Stopped early at exponent ${exponent}: duplicate result ${result}<br>`;
      explanation += `• Base: ${base}<br>`;
      explanation += `• Modulo: ${mod}<br>`;
      explanation += `• The exponent will start from 1 and end with the ${mod}-1 which is ${mod - 1} otherwise, the calculation will end due to duplicate of result in the last step`;
      document.getElementById("outcome").innerHTML = outcome;
      document.getElementById("explanation").innerHTML = explanation;
      return;
    }

    store.push(result);
    outcome += `(${base} ^ ${exponent}) mod ${mod} = ${result}<br>`;
  }
  
  document.getElementById("display").value = `${base} IS a primitive root of ${mod}`;
  document.getElementById("outcome").innerHTML = outcome;
  
  explanation += `• Base: ${base}<br>`;
  explanation += `• Modulo: ${mod}<br>`;
  explanation += `• The exponent will start from 1 and end with the ${mod}-1 which is ${mod - 1} otherwise, the calculation will end due to duplicate of result in the next step`;
  document.getElementById("explanation").innerHTML = explanation;
}