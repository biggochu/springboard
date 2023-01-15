from flask import Flask, request, render_template
from flask_debugtoolbar import DebugToolbarExtension
from stories import story

app = Flask(__name__)
app.config["SECRET_KEY"] = "ofdimbys98dfg9uy2"

debug = DebugToolbarExtension(app)


@app.route("/")
def home_page():
    """Render story form"""
    return render_template("homepage.html", prompts=story.prompts)


@app.route("/story", methods=["POST"])
def render_story():
    """Render story"""
    answers = dict()

    for prompt in story.prompts:
        answers[prompt] = request.form.get(prompt, "")

    return render_template("story.html", story=story.generate(answers))
