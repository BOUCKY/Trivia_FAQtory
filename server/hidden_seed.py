#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
import csv

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, Hidden

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        Hidden.query.delete()
        db.session.commit()

        with open('hidden.csv', newline='', encoding='utf-8') as seed_file:
            rows = [row for row in csv.reader(seed_file, delimiter=',', quotechar='"')]

            rounds = []
            for i in range(1,len(rows)):
                import ipdb
                round = Hidden(
                    letter = rows[i][0],
                    theme = rows[i][1],
                    song1 = rows[i][2],
                    song2 = rows[i][3],
                    song3 = rows[i][4],
                    song4 = rows[i][5],
                    question1 = rows[i][6],
                    answer1 = rows[i][7],
                    question2 = rows[i][8],
                    answer2 = rows[i][9],
                    question3 = rows[i][10],
                    answer3 = rows[i][11],
                    question4 = rows[i][12],
                    answer4 = rows[i][13],
                    question5 = rows[i][14],
                    answer5 = rows[i][15]
                )
                rounds.append(round)
            db.session.add_all(rounds)
            db.session.commit()
            ipdb.set_trace()
            print('hello')
