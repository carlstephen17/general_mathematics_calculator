class BaseConverter:
    @staticmethod
    def binary_to_decimal(value):
        return str(int(value, 2)), [f"Binary {value} → Decimal {int(value, 2)}"], \
               f"Binary {value} converted to decimal is just calculated using powers of 2."

    @staticmethod
    def binary_to_octal(value):
        steps = []

        # Step 1: pad binary to multiple of 3
        remainder = len(value) % 3
        if remainder != 0:
            padding = 3 - remainder
            padded = "0" * padding + value
            steps.append(f"Padded binary to make multiple of 3: {padded}")
        else:
            padded = value
            steps.append(f"Binary length already multiple of 3: {padded}")

        # Step 2: split into 3-bit groups
        groups = [padded[i:i+3] for i in range(0, len(padded), 3)]
        steps.append(f"Split into 3-bit groups: {groups}")

        # Step 3: convert each group to octal
        octal_digits = []
        for group in groups:
            digit = str(int(group, 2))
            octal_digits.append(digit)
            steps.append(f"{group} → {digit} (binary to octal)")

        # Step 4: combine octal digits
        result = "".join(octal_digits)
        steps.append(f"Combined octal digits: {result}")

        explanation = (
        "In the octal number system, each digit ranges from 0 to 7. "
        "Since 7 in binary is represented using three digits, it means that each octal digit corresponds to three binary digits. "
        "This shows why you must split the binary number into groups of exactly three digits — not less and not more — otherwise, it will not correctly represent the octal range from 0 to 7. \n\n"
        "In binary, each position has a value that increases by a multiple of 2 as you move from right to left. "
        "Starting from the rightmost digit, its value is 1. The next digit to the left has a value of 2, and the next after that has a value of 4. "
        "You only add the value if the digit is 1; otherwise, if it is 0, it contributes nothing. "
        "If you add these values (1 + 2 + 4 = 7), that covers all possible values in a single octal digit. \n\n"
        "When converting binary to octal, you group the binary digits in sets of three from right to left. "
        "If the last group has fewer than three digits, simply add zeros on the left to complete the group."
    )

        return result, steps, explanation

    @staticmethod
    def binary_to_hex(value):
        result = hex(int(value, 2))[2:].upper()
        steps = [f"Binary {value} → Hexadecimal {result}"]
        explanation = "Binary digits are grouped in sets of 4 to convert to hexadecimal. Each 4-bit group becomes one hex digit."
        return result, steps, explanation

    @staticmethod
    def decimal_to_binary(value):
        result = bin(int(value))[2:]
        steps = [f"Decimal {value} → Binary {result}"]
        explanation = "Decimal to binary conversion uses repeated division by 2."
        return result, steps, explanation

    @staticmethod
    def decimal_to_octal(value):
        result = oct(int(value))[2:]
        steps = [f"Decimal {value} → Octal {result}"]
        explanation = "Decimal to octal conversion uses repeated division by 8."
        return result, steps, explanation

    @staticmethod
    def decimal_to_hex(value):
        result = hex(int(value))[2:].upper()
        steps = [f"Decimal {value} → Hexadecimal {result}"]
        explanation = "Decimal to hexadecimal conversion uses repeated division by 16."
        return result, steps, explanation

    @staticmethod
    def octal_to_binary(value):
        result = bin(int(value, 8))[2:]
        steps = [f"Octal {value} → Binary {result}"]
        explanation = "Octal to binary conversion converts each digit to its 3-bit binary equivalent."
        return result, steps, explanation

    @staticmethod
    def octal_to_decimal(value):
        result = str(int(value, 8))
        steps = [f"Octal {value} → Decimal {result}"]
        explanation = "Octal to decimal conversion multiplies each digit by 8 raised to its position power."
        return result, steps, explanation

    @staticmethod
    def octal_to_hex(value):
        decimal = str(int(value, 8))
        result = hex(int(decimal))[2:].upper()
        steps = [f"Octal {value} → Decimal {decimal} → Hexadecimal {result}"]
        explanation = "Octal to hexadecimal conversion first converts to decimal, then to hexadecimal."
        return result, steps, explanation

    @staticmethod
    def hex_to_binary(value):
        result = bin(int(value, 16))[2:]
        steps = [f"Hexadecimal {value} → Binary {result}"]
        explanation = "Hexadecimal to binary conversion converts each digit to its 4-bit binary equivalent."
        return result, steps, explanation

    @staticmethod
    def hex_to_decimal(value):
        result = str(int(value, 16))
        steps = [f"Hexadecimal {value} → Decimal {result}"]
        explanation = "Hexadecimal to decimal conversion multiplies each digit by 16 raised to its position power."
        return result, steps, explanation

    @staticmethod
    def hex_to_octal(value):
        decimal = str(int(value, 16))
        result = oct(int(decimal))[2:]
        steps = [f"Hexadecimal {value} → Decimal {decimal} → Octal {result}"]
        explanation = "Hexadecimal to octal conversion first converts to decimal, then to octal."
        return result, steps, explanation


def calculate_conversion(value, from_base, to_base):
    """Generic conversion function between supported bases with steps and explanation."""
    conv = BaseConverter()
    mapping = {
        ('binary', 'decimal'): conv.binary_to_decimal,
        ('binary', 'octal'): conv.binary_to_octal,
        ('binary', 'hexadecimal'): conv.binary_to_hex,
        ('decimal', 'binary'): conv.decimal_to_binary,
        ('decimal', 'octal'): conv.decimal_to_octal,
        ('decimal', 'hexadecimal'): conv.decimal_to_hex,
        ('octal', 'binary'): conv.octal_to_binary,
        ('octal', 'decimal'): conv.octal_to_decimal,
        ('octal', 'hexadecimal'): conv.octal_to_hex,
        ('hexadecimal', 'binary'): conv.hex_to_binary,
        ('hexadecimal', 'decimal'): conv.hex_to_decimal,
        ('hexadecimal', 'octal'): conv.hex_to_octal
    }

    from_base = from_base.lower()
    to_base = to_base.lower()

    try:
        if from_base == to_base:
            return value, [f"Base is the same ({from_base}), value stays {value}"], \
                   f"No conversion needed. The value remains the same in {from_base}."
        func = mapping[(from_base, to_base)]
        return func(value)
    except KeyError:
        raise ValueError(f"Conversion from {from_base} to {to_base} not supported.")
