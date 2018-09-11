import json

from sqlalchemy import inspect


def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}


def rows_as_json(rows):
    return json.dumps([object_as_dict(r) for r in rows])
