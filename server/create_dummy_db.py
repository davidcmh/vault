from base import Session, engine, Base
from models import Deck, Tag, Note

# generate db schema
Base.metadata.create_all(engine)

session = Session()

deck_tech = Deck(name='tech')
tag_python = Tag(name='python')
tag_pandas = Tag(name='pandas')
note_hello = Note(deck=deck_tech, anki_id=2018091101, title='Hello', content='World')
note_hello.tags = [tag_python, tag_pandas]

session.add(deck_tech)
session.add(tag_python)
session.add(note_hello)

session.commit()
session.close()
