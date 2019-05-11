from os.path import dirname, join, realpath
import logging
from flask import Flask
from uman.config import config
from uman.blueprint import users
from uman.models import Base, Engine

__version__ = '0.1'
__author__ = 'Michael Covello'

# configure logging
logger = logging.getLogger('sqlalchemy.engine')
logger.setLevel(logging.INFO)
f_handler = logging.FileHandler(config.log_name, encoding='utf-8')
f_format = logging.Formatter('%(asctime)s - %(levelname)s: %(message)s')
f_handler.setFormatter(f_format)
logger.addHandler(f_handler)

# configure flask
ROOT_DIR = dirname(dirname(realpath(__file__)))
TEMPLATE_DIR = join(ROOT_DIR, 'uman_app', 'build')
STATIC_DIR = join(ROOT_DIR, 'uman_app', 'build', 'static')
app = Flask(
    __name__,
    template_folder=TEMPLATE_DIR,
    static_folder=STATIC_DIR
)
app.register_blueprint(users, url_prefix='/uman')

# create database
Base.metadata.create_all(Engine)


def run_app(config):
    app.run(debug=True, host=config.host, port=config.port)
