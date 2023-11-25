#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import csv

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Trivia

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!

        with open('trivia.csv', newline='', encoding='utf-8') as seed_file:
            rows = [row for row in csv.reader(seed_file, delimiter=',', quotechar='"')]

            trivia_questions = []
            for i in range(1,len(rows)):
                import ipdb
                trivia_question = Trivia(
                    letter = rows[i][0],
                    round = rows[i][1],
                    song = rows[i][2],
                    question = rows[i][3],
                    answer = rows[i][4]
                )
                trivia_questions.append(trivia_question)
            db.session.add_all(trivia_questions)
            db.session.commit()
            ipdb.set_trace()
            print('hello')
