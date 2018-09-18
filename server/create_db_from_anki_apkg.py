import json
import os

import sqlite3

from base import db
from models import Deck, Note


anki_db_path = os.environ.get('ANKI_DB_PATH')
conn = sqlite3.connect(anki_db_path)
conn.row_factory = sqlite3.Row
cur = conn.cursor()

# get deck dict
cur.execute('SELECT * FROM col;')
row = cur.fetchone()
deck_dict = json.loads(row['decks'])
deck_id_name_map = {k: v['name'] for k, v in deck_dict.items()}

# get all notes
query = """
    SELECT *
    FROM notes AS n
    JOIN cards AS c on n.id = c.nid;
"""
cur.execute(query)
all_notes = cur.fetchall()


# generate db schema
db.create_all()

# load decks into db & create deck dict
deck_id_instance_map = {}
for deck_anki_id, deck_name in deck_id_name_map.items():
    deck_instance = Deck(name=deck_name, anki_id=deck_anki_id)
    deck_id_instance_map[int(deck_anki_id)] = deck_instance
    db.session.add(deck_instance)

# load notes into db
for note in all_notes:
    deck_id = note['did']
    deck_instance = deck_id_instance_map[deck_id]
    note_fields = note['flds']
    _, note_title, note_content = note_fields.split('\x1f')
    note_anki_id = note['sfld']
    note_instance = Note(deck=deck_instance, anki_id=note_anki_id, title=note_title, content=note_content)
    db.session.add(note_instance)


db.session.commit()
db.session.close()
