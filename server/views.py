from flask_restplus import Api, Resource, Model, fields

from base import db, app
from models import Note
import utils


api = Api(app, title="Vault API", prefix='/v1', validate=True)

ns = api.default_namespace

get_notes_fields = {
    'page': fields.Integer(required=True),
    'pageSize': fields.Integer(required=True),
}
get_notes_model = api.model('get_notes', get_notes_fields)


@api.route("/notes")
class Notes(Resource):

    @ns.expect(get_notes_model)
    def post(self):
        page = api.payload['page']
        page_size = api.payload['pageSize']
        offset = page * page_size
        notes = db.session.query(Note).offset(offset).limit(page_size).all()
        return utils.rows_as_json(notes)
