from flask import request, jsonify, session
from flask_restful import Resource
from extensions import db
from models import Client, Shot, User
from serializers import (
    client_schema, clients_schema,
    shot_schema, shots_schema,
    user_schema, users_schema
)

class ClientList(Resource):
    """Resource for listing and creating clients."""

    def get(self):
        """Get all clients."""
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        pagination = Client.query.paginate(page=page, per_page=per_page)
        return {
            'items': clients_schema.dump(pagination.items),
            'total': pagination.total,
            'page': page,
            'per_page': per_page
        }, 200

    def post(self):
        """Create new client."""
        try:
            data = request.get_json()
            client = Client(**data)
            db.session.add(client)
            db.session.commit()
            return client_schema.dump(client), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400


class ClientDetail(Resource):
    """Resource for individual client operations."""

    def get(self, client_id):
        """Get single client."""
        client = Client.query.get_or_404(client_id)
        return client_schema.dump(client), 200

    def patch(self, client_id):
        """Update client."""
        client = Client.query.get_or_404(client_id)
        data = request.get_json()
        
        # Prevent modification of foreign keys and relationships
        protected_fields = ['shots']
        
        for key, value in data.items():
            if key not in protected_fields:
                setattr(client, key, value)
        
        db.session.commit()
        return client_schema.dump(client), 200

    def delete(self, client_id):
        """Delete client."""
        client = Client.query.get_or_404(client_id)
        db.session.delete(client)
        db.session.commit()
        return {'message': 'Deleted'}, 200


import uuid
import os

class ShotList(Resource):
    """Resource for listing and creating shots."""

    def get(self):
        """Get all shots."""
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        pagination = Shot.query.paginate(page=page, per_page=per_page)
        return {
            'items': shots_schema.dump(pagination.items),
            'total': pagination.total,
            'page': page,
            'per_page': per_page
        }, 200

    def post(self):
        """Upload a new shot with image."""
        # 1. Check if image was included
        file = request.files.get('image')
        if not file:
            return {'error': 'No image provided'}, 400
        
        # 2. Validate it's actually an image
        allowed = ['.jpg', '.jpeg', '.png', '.webp']
        ext = os.path.splitext(file.filename)[1].lower()
        if ext not in allowed:
            return {'error': 'Invalid file type'}, 400
        
        # 3. Get form data
        client_id = request.form.get('client_id', type=int)
        user_id = request.form.get('user_id', type=int)
        description = request.form.get('description', '')
        
        # 4. Generate filename: clientId_userId_ddmmyyyyhhmmss
        from datetime import datetime
        timestamp = datetime.now().strftime('%d%m%Y%H%M%S')
        filename = f"{client_id}_{user_id}_{timestamp}{ext}"
        
        # 5. Save to uploads folder
        upload_folder = os.path.join(os.path.dirname(__file__), 'uploads')
        os.makedirs(upload_folder, exist_ok=True)
        file.save(os.path.join(upload_folder, filename))
        
        # 6. Create database record
        shot = Shot(
            image_path=filename,
            client_id=client_id,
            user_id=user_id,
            description=description
        )
        db.session.add(shot)
        db.session.commit()
        
        return shot_schema.dump(shot), 201
    

class ShotDetail(Resource):
    """Resource for individual shot operations."""

    def get(self, shot_id):
        """Get single shot."""
        shot = Shot.query.get_or_404(shot_id)
        return shot_schema.dump(shot), 200

    def patch(self, shot_id):
        """Update shot."""
        shot = Shot.query.get_or_404(shot_id)
        data = request.get_json()
        
        # Prevent modification of foreign keys and relationships
        protected_fields = ['client_id', 'user_id', 'client', 'user']
        
        for key, value in data.items():
            if key not in protected_fields:
                setattr(shot, key, value)
        
        db.session.commit()
        return shot_schema.dump(shot), 200

    def delete(self, shot_id):
        """Delete shot."""
        shot = Shot.query.get_or_404(shot_id)
    
    # Delete the actual file too
        try:
            filepath = os.path.join(os.path.dirname(__file__), 'uploads', shot.image_path)
            os.remove(filepath)
        except OSError:
            pass  # File might already be gone, that's fine
    
        db.session.delete(shot)
        db.session.commit()
        return {'message': 'Deleted'}, 200


class UserList(Resource):
    """Resource for listing and creating users."""

    def get(self):
        """Get all users."""
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        pagination = User.query.paginate(page=page, per_page=per_page)
        return {
            'items': users_schema.dump(pagination.items),
            'total': pagination.total,
            'page': page,
            'per_page': per_page
        }, 200

    def post(self):
        """Create new user."""
        try:
            data = request.get_json()
            user = User(**data)
            db.session.add(user)
            db.session.commit()
            return user_schema.dump(user), 201
        except Exception as e:
            db.session.rollback()
            return {'error': str(e)}, 400


class UserDetail(Resource):
    """Resource for individual user operations."""

    def get(self, user_id):
        """Get single user."""
        user = User.query.get_or_404(user_id)
        return user_schema.dump(user), 200

    def patch(self, user_id):
        """Update user."""
        user = User.query.get_or_404(user_id)
        data = request.get_json()
        
        # Prevent modification of foreign keys and relationships
        protected_fields = ['shots']
        
        for key, value in data.items():
            if key not in protected_fields:
                setattr(user, key, value)
        
        db.session.commit()
        return user_schema.dump(user), 200

    def delete(self, user_id):
        """Delete user."""
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return {'message': 'Deleted'}, 200


def initialize_routes(api):
    """Register all API endpoints."""
    api.add_resource(ClientList, '/api/clients')
    api.add_resource(ClientDetail, '/api/clients/<int:client_id>')
    api.add_resource(ShotList, '/api/shots')
    api.add_resource(ShotDetail, '/api/shots/<int:shot_id>')
    api.add_resource(UserList, '/api/users')
    api.add_resource(UserDetail, '/api/users/<int:user_id>')
