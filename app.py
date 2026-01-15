import os
from flask import Flask, send_from_directory
from flask_restful import Api

from extensions import db, bcrypt, ma, cors, migrate
from config import Config
from routes import initialize_routes

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    bcrypt.init_app(app)
    ma.init_app(app)
    cors.init_app(app)
    migrate.init_app(app, db)
    
    # Initialize API routes
    api = Api(app)
    initialize_routes(api)
    
    # Serve uploaded images
    @app.route('/uploads/<filename>')
    def serve_image(filename):
        upload_folder = os.path.join(os.path.dirname(__file__), 'uploads')
        return send_from_directory(upload_folder, filename)
    
    # Create tables automatically
    with app.app_context():
        db.create_all()
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, port=5555)