from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

responses = {
    "hello": "Hi there! How can I assist you?",
    "bye": "Goodbye! Have a great day!",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "treatment": {
        "message": "Here are some treatments available:",
        "options": ["Scaling", "Filling", "Extraction"]
    },
    "scaling": "A method to clean teeth.",
    "filling": "To fill a tooth.",
    "extraction": "To pull out a tooth."
}

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message", "").strip().lower()

    # If user asks for 'treatment', return a list of options
    if user_message == "treatment":
        return jsonify({
            "response": responses["treatment"]["message"],
            "options": responses["treatment"]["options"]
        })
    
    # Check if user selects one of the treatment options
    if user_message in responses:
        return jsonify({"response": responses[user_message]})
    
    return jsonify({"response": "I'm not sure how to respond. Can you ask me differently?"})

if __name__ == "__main__":
    app.run(debug=True)



