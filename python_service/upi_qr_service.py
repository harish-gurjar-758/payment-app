import qrcode
from flask import Flask, request, send_file
import io

app = Flask(__name__)

# Simulated UPI database
upi_db = {
    "user1@upi": {"name": "User One", "balance": 5000},
    "user2@upi": {"name": "User Two", "balance": 3200}
}

@app.route("/validate-upi", methods=["POST"])
def validate_upi():
    data = request.json
    upi_id = data.get("upiId")
    if upi_id in upi_db:
        return {"valid": True, "name": upi_db[upi_id]["name"]}
    return {"valid": False}, 404

@app.route("/generate-qr", methods=["POST"])
def generate_qr():
    data = request.json
    upi_id = data.get("upiId")
    amount = data.get("amount")
    upi_uri = f"upi://pay?pa={upi_id}&am={amount}&cu=INR"
    img = qrcode.make(upi_uri)
    buf = io.BytesIO()
    img.save(buf)
    buf.seek(0)
    return send_file(buf, mimetype='image/png')

if __name__ == "__main__":
    app.run(port=5001)
