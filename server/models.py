from base import db


class Deck(db.Model):
    __tablename__ = 'decks'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)


class Tag(db.Model):
    __tablename__ = 'tags'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)


notes_tags_association = db.Table(
    'notes_tags',
    db.Column('note_id', db.Integer, db.ForeignKey('notes.id'), primary_key=True),
    db.Column('tag_id', db.Integer, db.ForeignKey('tags.id'), primary_key=True)
)


class Note(db.Model):
    __tablename__ = 'notes'

    id = db.Column(db.Integer, primary_key=True)
    deck_id = db.Column(db.Integer, db.ForeignKey('decks.id'))
    deck = db.relationship('Deck', backref="notes")
    anki_id = db.Column(db.Integer)
    title = db.Column(db.String)
    content = db.Column(db.String)
    tags = db.relationship('Tag',
                           secondary=notes_tags_association,
                           lazy='subquery',
                           backref=db.backref('notes', lazy=True))
