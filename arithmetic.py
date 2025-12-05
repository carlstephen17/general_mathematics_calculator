class ArithmeticCalculator:
    def __init__(self):
        pass

    # ---------------- Conversion Functions ----------------
    def to_decimal(self, num, base_type):
        base_map = {
            "binary": 2,
            "octal": 8,
            "decimal": 10,
            "hexadecimal": 16
        }
        return int(num, base_map.get(base_type, 10))

    def from_decimal(self, decimal, base_type):
        if base_type == "binary":
            return bin(decimal)[2:]
        elif base_type == "octal":
            return oct(decimal)[2:]
        elif base_type == "decimal":
            return str(decimal)
        elif base_type == "hexadecimal":
            return hex(decimal)[2:].upper()
        else:
            return str(decimal)

    # ---------------- Arithmetic Function ----------------
    def calculate(self, num1, num2, operation, base_type):
        try:
            n1 = self.to_decimal(num1, base_type)
            n2 = self.to_decimal(num2, base_type)

            # ---------------- Operations ----------------
            if operation == "addition":
                result = n1 + n2
                symbol = "+"
                if base_type == "decimal":
                    explanation = "In decimal addition, you just add the numbers normally, starting from the rightmost digit and carrying over if the sum is more than 9."
                elif base_type == "binary":
                    explanation = "In binary addition, add digits starting from the right. 0+0=0, 1+0=1, 1+1=10, or bring down 0 with a carry of 1 to the next left digit."
                elif base_type == "octal":
                    explanation = "In octal addition, digits go from 0 to 7. Add digits from right to left; if the sum is between 0 and 7, it is the same as normal addition. Otherwise, if the sum is 8 or more, divide it by 8, bring down the remainder, and divide the quotient again by 8 if necessary. The remainder from each division will be carried to the next left digit."
                elif base_type == "hexadecimal":
                    explanation = "In hexadecimal addition, digits go from 0 to 9 and 10 to 15 (A to F). If the sum is between 0 and 15, add it like normal addition. Otherwise, if the sum is 16 or more, divide it by 16, bring down the remainder, and divide the quotient again by 16 if necessary. The remainder from each division will be carried to the next left digit."
            elif operation == "subtraction":
                result = n1 - n2
                symbol = "-"
            elif operation == "multiplication":
                result = n1 * n2
                symbol = "×"
            elif operation == "division":
                if n2 == 0:
                    return "Error: Cannot divide by zero", "", ""
                result = n1 // n2
                symbol = "÷"
            elif operation == "modulus":
                if n2 == 0:
                    return "Error: Cannot modulo by zero", "", ""
                result = n1 % n2
                symbol = "%"
            elif operation == "exponentiation":
                result = n1 ** n2
                symbol = "^"
            elif operation == "floor_division":
                if n2 == 0:
                    return "Error: Cannot floor divide by zero", "", ""
                result = n1 // n2
                symbol = "//"
            else:
                return "Error: Unknown operation", "", ""

            # Convert result back to the selected base
            result_str = self.from_decimal(result, base_type)
            solution = f"{num1}               \n{symbol} {num2} \n  -------------- \n {result_str}"

            return result_str, solution, explanation

        except Exception as e:
            return f"Error: {e}", "", ""
