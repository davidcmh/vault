from sqlalchemy import Column, ForeignKey, Integer, String, Table
from sqlalchemy.orm import relationship

from base import Base


class Deck(Base):
    __tablename__ = 'decks'

    id = Column(Integer, primary_key=True)
    name = Column(String)


class Tag(Base):
    __tablename__ = 'tags'

    id = Column(Integer, primary_key=True)
    name = Column(String)


notes_tags_association = Table(
    'notes_tags',
    Base.metadata,
    Column('note_id', Integer, ForeignKey('notes.id')),
    Column('tag_id', Integer, ForeignKey('tags.id'))
)


class Note(Base):
    __tablename__ = 'notes'

    id = Column(Integer, primary_key=True)
    deck_id = Column(Integer, ForeignKey('decks.id'))
    deck = relationship('Deck', backref="notes")
    anki_id = Column(Integer)
    title = Column(String)
    content = Column(String)
    tags = relationship('Tag', secondary=notes_tags_association)
