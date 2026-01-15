from extensions import ma
from models import Client, Shot, User

class UserSchema(ma.SQLAlchemyAutoSchema):
    """Schema for User model."""
    shots = ma.Nested('ShotSchema', many=True, dump_only=True, only=('id',), exclude=('user',))

    class Meta:
        model = User
        load_instance = True

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class ClientSchema(ma.SQLAlchemyAutoSchema):
    """Schema for Client model."""
    shots = ma.Nested('ShotSchema', many=True, dump_only=True, exclude=('client',))

    class Meta:
        model = Client
        load_instance = True

client_schema = ClientSchema()
clients_schema = ClientSchema(many=True)



class ShotSchema(ma.SQLAlchemyAutoSchema):
    """Schema for Shot model."""
    client = ma.Nested('ClientSchema', only=('id',), exclude=('shots',))
    user = ma.Nested('UserSchema', only=('id',), exclude=('shots',))

    class Meta:
        model = Shot
        load_instance = True
        include_fk = False

shot_schema = ShotSchema()
shots_schema = ShotSchema(many=True)


