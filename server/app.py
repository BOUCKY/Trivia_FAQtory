#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, send_from_directory
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import Trivia, Hidden, Player, Final, Game

# Views go here!

@app.route('/')
def index():
    return '<h1>Trivia FAQtory Server!</h1>'

# REGULAR TRIVIA CSV
@app.route('/trivia', methods=['GET', 'POST'])
def trivia():
    if request.method == 'GET':
        quesitons = [q.to_dict() for q in Trivia.query.all()]
        return make_response(quesitons, 200)
    
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_trivia = Trivia(
                letter = data['letter'],
                round = data['round'],
                song = data['song'],
                question = data['question'],
                answer = data['answer']
            )
            db.session.add(new_trivia)
            db.session.commit()
            return make_response(new_trivia.to_dict(),201)
        except ValueError as v_error:
            return make_response({'errors':[v_error]},400)
        

@app.route('/trivia/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def trivia_id(id):
    trivia = Trivia.query.filter(Trivia.id == id).first()

    if request.method == 'GET':
        if trivia:
            return make_response(trivia.to_dict(), 200)
        else:
            return make_response({'error': 'Trivia question not found.'}, 404)

    if request.method == 'PATCH':
        if trivia == None:
            return make_response({'error': 'Trivia question not found.'}, 404)
        
        data = request.get_json()
        for attr in data:
            setattr(trivia, attr, data[attr])
        db.session.add(trivia)
        db.session.commit()
        return make_response(trivia.to_dict(), 200)
    
    if request.method == 'DELETE':
        if trivia == None:
            return make_response({'error': 'Trivia question not found.'}, 404)
        
        db.session.delete(trivia)
        db.session.commit()
        return make_response({'message':'Successfully deleted the trivia question.'},204)



# HIDDEN ROUND CSV
@app.route('/hidden', methods=['GET', 'POST'])
def hidden():
    if request.method == 'GET':
        hidden_quesitons = [q.to_dict() for q in Hidden.query.all()]
        return make_response(hidden_quesitons, 200)
    
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_hidden = Hidden(
                letter = data['letter'],
                theme = data['theme'],
                song1 = data['song1'],
                question1 = data['question1'],
                answer1 = data['answer1'],
                song2 = data['song2'],
                question2 = data['question2'],
                answer2 = data['answer2'],
                song3 = data['song3'],
                question3 = data['question3'],
                answer3 = data['answer3'],
                song4 = data['song4'],
                question4 = data['question4'],
                answer4 = data['answer4'],
                song5 = data['song5'],
                question5 = data['question5'],
                answer5 = data['answer5']
            )
            db.session.add(new_hidden)
            db.session.commit()
            return make_response(new_hidden.to_dict(),201)
        except ValueError as v_error:
            return make_response({'errors':[v_error]},400)


@app.route('/hidden/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def hidden_id(id):
    hidden = Hidden.query.filter(Hidden.id == id).first()
    
    if request.method == 'GET':
        if hidden:
            return make_response(hidden.to_dict(), 200)
        else:
            return make_response({'error': 'Hidden theme question not found.'}, 404)

    if request.method == 'PATCH':
        if hidden == None:
            return make_response({'error': 'Hidden theme question not found.'}, 404)
        
        data = request.get_json()
        for attr in data:
            setattr(hidden, attr, data[attr])
        db.session.add(hidden)
        db.session.commit()
        return make_response(hidden.to_dict(), 200)
    
    if request.method == 'DELETE':
        if hidden == None:
            return make_response({'error': 'Hidden theme question not found.'}, 404)
        
        db.session.delete(hidden)
        db.session.commit()
        return make_response({'message':'Successfully deleted the hidden theme question.'},204)



# PLAYER CHOSEN CSV
@app.route('/player', methods=['GET', 'POST'])
def player():
    if request.method == 'GET':
        player_quesitons = [q.to_dict() for q in Player.query.all()]
        return make_response(player_quesitons, 200)
    
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_player_trivia = Player(
                round = data['round'],
                song1 = data['song1'],
                question1 = data['question1'],
                answer1 = data['answer1'],
                song2 = data['song2'],
                question2 = data['question2'],
                answer2 = data['answer2'],
                song3 = data['song3'],
                question3 = data['question3'],
                answer3 = data['answer3']
            )
            db.session.add(new_player_trivia)
            db.session.commit()
            return make_response(new_player_trivia.to_dict(),201)
        except ValueError as v_error:
            return make_response({'errors':[v_error]},400)
        

@app.route('/player/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def player_id(id):
    player = Player.query.filter(Player.id == id).first()
        
    if request.method == 'GET':
        if player:
            return make_response(player.to_dict(), 200)
        else:
            return make_response({'error': 'Player chosen question not found.'}, 404)

    if request.method == 'PATCH':
        if player == None:
            return make_response({'error': 'Player chosen question not found.'}, 404)
        
        data = request.get_json()
        for attr in data:
            setattr(player, attr, data[attr])
        db.session.add(player)
        db.session.commit()
        return make_response(player.to_dict(), 200)
    
    if request.method == 'DELETE':
        if player == None:
            return make_response({'error': 'Player chosen question not found.'}, 404)
        
        db.session.delete(player)
        db.session.commit()
        return make_response({'message':'Successfully deleted the Player chosen question.'},204)
    


# FINAL QUESTION CSV
@app.route('/final', methods=['GET', 'POST'])
def final():
    if request.method == 'GET':
        quesitons = [q.to_dict() for q in Final.query.all()]
        return make_response(quesitons, 200)
    
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_final = Final(
                question = data['question'],
                answer = data['answer']
            )
            db.session.add(new_final)
            db.session.commit()
            return make_response(new_final.to_dict(),201)
        except ValueError as v_error:
            return make_response({'errors':[v_error]},400)
        

@app.route('/final/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def final_id(id):
    final = Final.query.filter(Final.id == id).first()
        
    if request.method == 'GET':
        if final:
            return make_response(final.to_dict(), 200)
        else:
            return make_response({'error': 'Final question not found.'}, 404)

    if request.method == 'PATCH':
        if final == None:
            return make_response({'error': 'Final question not found.'}, 404)
        
        data = request.get_json()
        for attr in data:
            setattr(final, attr, data[attr])
        db.session.add(final)
        db.session.commit()
        return make_response(final.to_dict(), 200)
    
    if request.method == 'DELETE':
        if final == None:
            return make_response({'error': 'Final question not found.'}, 404)
        
        db.session.delete(final)
        db.session.commit()
        return make_response({'message':'Successfully deleted the final question.'},204)

# GAMES
@app.route('/game', methods=['GET', 'POST'])
def game():
    if request.method == 'GET':
        quesitons = [q.to_dict() for q in Game.query.all()]
        return make_response(quesitons, 200)
    
    if request.method == 'POST':
        data = request.get_json()
        try:
            new_game = Game(
                name = data['name'],
                date = data['date'],
                letter = data['letter'],
                round1 = data['round1'],
                round2 = data['round2'],
                round3 = data['round3'],
                round4 = data['round4'],
                hidden_round = data['hidden_round'],
                player_round = data['player_round'],
                final_wager = data['final_wager'],
            )
            db.session.add(new_game)
            db.session.commit()
            return make_response(new_game.to_dict(),201)
        except ValueError as v_error:
            return make_response({'errors':[v_error]},400)
        
@app.route('/game/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def game_id(id):
    game = Game.query.filter(Game.id == id).first()
        
    if request.method == 'GET':
        if game:
            return make_response(game.to_dict(), 200)
        else:
            return make_response({'error': 'Game not found.'}, 404)
    
    if request.method == 'PATCH':
        if game == None:
            return make_response({'error': 'Game not found.'}, 404)
        
        data = request.get_json()
        for attr in data:
            setattr(game, attr, data[attr])
        db.session.add(game)
        db.session.commit()
        return make_response(game.to_dict(), 200)

    if request.method == 'DELETE':
        if game == None:
            return make_response({'error': 'Game not found.'}, 404)
        
        db.session.delete(game)
        db.session.commit()
        return make_response({'message':'Successfully deleted the Game.'},204)
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)