from flask import Flask, request, render_template, redirect, flash
from flask_debugtoolbar import DebugToolbarExtension

from surveys import surveys

app = Flask(__name__)
app.config["SECRET_KEY"] = "asdf"
app.config["DEBUG_TB_INTERCEPT_REDIRECTS"] = False
app.run(debug=True, port=5001)

DebugToolbarExtension(app)

responses = {key: [] for key in surveys}


@app.route("/")
def home():
    survey = surveys["satisfaction"]
    return render_template("home.html.jinja", survey=survey, survey_id="satisfaction")


@app.route("/surveys/<survey_id>")
def survey_view(survey_id):
    survey = surveys[survey_id]
    return render_template("survey.html.jinja", survey_id=survey_id, survey=survey)


@app.route("/surveys/<survey_id>/questions/<int:question_id>")
def show_question(survey_id, question_id):
    survey = surveys[survey_id]

    if question_id != len(responses[survey_id]):
        redirect_id = len(responses[survey_id])
        flash("Warning: Question out of order")
        return redirect(f"/surveys/{survey_id}/questions/{redirect_id}")

    if len(responses[survey_id]) == len(survey.questions):
        return redirect(f"/surveys/{survey_id}/done")

    question = survey.questions[question_id]

    return render_template(
        "question.html.jinja",
        survey_id=survey_id,
        question_id=question_id,
        question=question,
        final_question=question_id == len(survey.questions) - 1,
    )


@app.route("/surveys/<survey_id>/questions/<int:question_id>", methods=["POST"])
def save_response(survey_id, question_id):
    survey = surveys[survey_id]
    question = survey.questions[question_id]

    choice = request.form.get("choice")

    responses[survey_id].append(choice)

    if question_id < len(survey.questions) - 1:
        return redirect(f"/surveys/{survey_id}/questions/{question_id+1}")
    else:
        return redirect(f"/surveys/{survey_id}/done")


@app.route("/surveys/<survey_id>/done")
def thank_you(survey_id):
    return render_template("done.html.jinja")
