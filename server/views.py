from flask_restplus import Api, Resource

from base import db, app
from models import Note
import utils


api = Api(app, title="Vault API", prefix='/v1')


@api.route("/notes")
class Notes(Resource):
    def get(self):
        notes = db.session.query(Note).all()
        return utils.rows_as_json(notes)
