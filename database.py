# merged_app.py
from flask import Flask, request, session, jsonify, render_template, redirect
from arithmetic import ArithmeticCalculator 
from conversion import calculate_conversion
import mysql.connector

app = Flask(__name__)
app.secret_key = "your_secret_key_here"

# ---------------- Database Functions ----------------
def db_connection():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            passwd="@mxmxyzptlk3",
            database="users"
        )
        return conn
    except Exception as e:
        print("[DB Connection Error]", e)
        return None

def signUp(username, password):
    conn = db_connection()
    if not conn:
        return "Database connection failed"
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE username=%s", (username,))
        if cursor.fetchone():
            return "Username already exists"
        cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, password))
        conn.commit()
        return "Registration successful!"
    except Exception as e:
        print("[SignUp Error]", e)
        return "Server error"
    finally:
        cursor.close()
        conn.close()

def signIn(username, password):
    conn = db_connection()
    if not conn:
        return False
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM users WHERE username=%s AND password=%s", (username, password))
        return bool(cursor.fetchone())
    except Exception as e:
        print("[SignIn Error]", e)
        return False
    finally:
        cursor.close()
        conn.close()

# ---------------- Main Routes ----------------
@app.route('/')
def index():
    username = session.get('username', '')
    logged_out = request.args.get('logged_out', '')
    return render_template('index.html', username=username, logged_out=logged_out)

@app.route('/dark-side')
def dark_side():
    return render_template('dark-side.html', current_page='dark-side')

@app.route('/marketplace')
def marketplace():
    return render_template('marketplace.html', current_page='marketplace')

@app.route('/purchaseItem')
def purchaseItem():
    # Get id from request.args
    id = request.args.get('id', type=int)
    return render_template('purchaseItem.html', current_page='purchase', product_id=id)



@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/premium')
def premium():
    return render_template('premium.html')

@app.route('/buyPremium')
def buyPremium():
    return render_template('buyPremium.html')

@app.route('/pure-mathematics')
def pure_mathematics():
    return render_template('pure_mathematics.html')

@app.route('/discrete-mathematics')
def discrete_mathematics():
    return render_template('discrete_mathematics.html')

@app.route('/pythagorean')
def pythagorean():
    return render_template('pythagorean.html')

@app.route('/geometry')
def geometry():
    return render_template('geometry.html')

# ---------------- Arithmetic Routes ----------------
calc = ArithmeticCalculator()

@app.route('/arithmetic')
def arithmetic():
    return render_template('arithmetic.html')

@app.route('/calculate', methods=['POST'])
def arithmetic_route():
    try:
        # Get values from the form
        num1 = request.form.get("num1")
        num2 = request.form.get("num2")
        format_type = request.form.get("format_type")
        operation = request.form.get("operation")

        # Perform calculation
        result, solution, explanation = calc.calculate(num1, num2, operation, format_type)

        # If calculation returns an error string, display it as error
        error = None
        if result.startswith("Error"):
            error = result
            result = solution = explanation = None
    except Exception as e:
        error = f"Unexpected error: {e}"
        result = solution = explanation = None

    # Render the HTML template with results
    return render_template(
        "arithmetic.html",
        result=result,
        solution=solution,
        explanation=explanation,
        error=error
    )

# ---------------- Base Conversion Routes ----------------
@app.route('/conversion')
def conversion():
    return render_template('conversion.html')

@app.route('/conversion', methods=['GET', 'POST'])
def conversion_route():
    value = request.form.get("value")
    from_base = request.form.get("from_base")
    to_base = request.form.get("to_base")

    try:
        result, steps, explanation = calculate_conversion(value, from_base, to_base)
        error = None
    except Exception as e:
        result = steps = explanation = None
        error = f"Error: {e}"

    return render_template(
        "conversion.html",
        value=value,
        result=result,
        steps=steps,
        explanation=explanation,
        error=error
    )

# Helper function to map base names to integers
def get_base(base_name):
    mapping = {
        'binary': 2,
        'decimal': 10,
        'octal': 8,
        'hexadecimal': 16
    }
    return mapping.get(base_name, 10)

# ---------------- Cryptography Routes ----------------
@app.route('/caesar')
def caesar():
    return render_template('caesar.html')

@app.route('/deffie')
def deffie():
    return render_template('deffie.html')

# ---------------- Number Theory Routes ----------------
@app.route('/primitive')
def primitive():
    return render_template('primitive.html')

@app.route('/fermats')
def fermats():
    return render_template('fermats.html')

@app.route('/linear')
def linear():
    return render_template('linear.html')

@app.route('/euclidean')
def euclidean():
    return render_template('euclidean.html')

# ---------------- User Auth Routes ----------------
@app.route('/register', methods=["POST"])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Please provide both username and password"}), 400

    message = signUp(username, password)
    if message == "Registration successful!":
        session['username'] = username
        return jsonify({"message": message}), 200
    return jsonify({"message": message}), 400

@app.route('/auth', methods=["POST"])
def auth():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Please provide both username and password"}), 400

    if signIn(username, password):
        session['username'] = username
        return jsonify({"message": "Login successful!"}), 200
    return jsonify({"message": "Invalid username or password"}), 401

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/?logged_out=true')

# ---------------- Run App ----------------
if __name__ == "__main__":
    app.run(debug=True)
