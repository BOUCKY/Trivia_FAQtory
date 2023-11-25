#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import csv

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Player

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Player.query.delete()
        db.session.commit()

        with open('player_chosen.csv', newline='', encoding='utf-8') as seed_file:
            rows = [row for row in csv.reader(seed_file, delimiter=',', quotechar='"')]

            player_questions = []
            for i in range(1,len(rows)):
                import ipdb
                player_question = Player(
                    theme = rows[i][0],
                    song1 = rows[i][1],
                    question1 = rows[i][2],
                    answer1 = rows[i][3],
                    song2 = rows[i][4],
                    question2 = rows[i][5],
                    answer2 = rows[i][6],
                    song3 = rows[i][7],
                    question3 = rows[i][8],
                    answer3 = rows[i][9],
                )
                player_questions.append(player_question)
            db.session.add_all(player_questions)
            db.session.commit()
            ipdb.set_trace()
            print('hello')
