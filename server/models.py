from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!

class Trivia(db.Model, SerializerMixin):
    __tablename__ = 'trivia_questions'

    id = db.Column(db.Integer, primary_key=True)
    letter = db.Column(db.String)
    round = db.Column(db.String)
    song = db.Column(db.String)
    question = db.Column(db.String)
    answer = db.Column(db.String)

    #relationships


    #serialize rules



class Hidden(db.Model, SerializerMixin):
    __tablename__ = 'hidden_questions'

    id = db.Column(db.Integer, primary_key=True)
    letter = db.Column(db.String)
    theme = db.Column(db.String)
    song1 = db.Column(db.String)
    song2 = db.Column(db.String)
    song3 = db.Column(db.String)
    song4 = db.Column(db.String)
    answer1 = db.Column(db.String)
    question1 = db.Column(db.String)
    answer2 = db.Column(db.String)
    question2 = db.Column(db.String)
    answer3 = db.Column(db.String)
    question3 = db.Column(db.String)
    answer4 = db.Column(db.String)
    question4 = db.Column(db.String)
    answer5 = db.Column(db.String)
    question5 = db.Column(db.String)

    #relationships


    #serialize rules



class Player(db.Model, SerializerMixin):
    __tablename__ = 'player_questions'

    id = db.Column(db.Integer, primary_key=True)
    theme = db.Column(db.String)
    song1 = db.Column(db.String)
    answer1 = db.Column(db.String)
    question1 = db.Column(db.String)
    song2 = db.Column(db.String)
    answer2 = db.Column(db.String)
    question2 = db.Column(db.String)
    song3 = db.Column(db.String)
    answer3 = db.Column(db.String)
    question3 = db.Column(db.String)

    #relationships


    #serialize rules



class Final(db.Model, SerializerMixin):
    __tablename__ = 'final_questions'

    id = db.Column(db.Integer, primary_key=True)
    answer = db.Column(db.String)
    question = db.Column(db.String)

    #relationships


    #serialize rules



# class Game(db.Model, SerializerMixin):
#     __tablename__ = 'games'

#     id = db.Column(db.Integer, primary_key=True)
#     trivia_id = db.Column(db.Integer, db.ForeignKey('trivia_questions.id'), nullable=False)