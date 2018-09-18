from base import db
from models import Deck, Tag, Note

# generate db schema
db.create_all()

deck_tech = Deck(name='tech', anki_id=123456)
tag_python = Tag(name='python')
tag_pandas = Tag(name='pandas')
note_hello = Note(deck=deck_tech, anki_id=2018091101, title='Hello', content='World')
note_foo = Note(deck=deck_tech, anki_id=2018091101, title='foo', content='bar')
note_london = Note(deck=deck_tech, anki_id=2018091101, title='london', content='bridge')
note_hello.tags = [tag_python, tag_pandas]

db.session.add(deck_tech)
db.session.add(tag_python)
db.session.add(note_hello)
db.session.add(note_foo)
db.session.add(note_london)

db.session.commit()
db.session.close()
