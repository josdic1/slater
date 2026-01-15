from .extensions import db, bcrypt
from datetime import datetime, timezone


class User(db.Model):
    """User model representing users."""
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    _password_hash = db.Column(db.String(128))
    # Relationships
    shots = db.relationship('Shot', back_populates='user', cascade='all, delete-orphan')

    @property
    def password(self):
        raise AttributeError('password is not readable')
    
    @password.setter
    def password(self, password):
        self._password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self._password_hash, password)
    def __repr__(self):
        return f'<User {self.id}>'


class Client(db.Model):
    """Client model representing clients."""
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)

    # Relationships
    shots = db.relationship('Shot', back_populates='client', cascade='all, delete-orphan')

    def __repr__(self):
        return f'<Client {self.id}>'


class Shot(db.Model):
    """Shot model representing shots."""
    __tablename__ = 'shots'

    id = db.Column(db.Integer, primary_key=True)

    # Foreign Keys
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    # Relationships
    client = db.relationship('Client', back_populates='shots')
    user = db.relationship('User', back_populates='shots')

    def __repr__(self):
        return f'<Shot {self.id}>'




