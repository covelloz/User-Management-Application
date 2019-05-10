from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()
Engine = create_engine('sqlite:///:memory:')

Session = sessionmaker(bind=Engine)
session = Session()


class User(Base):
    """ Database ORM """
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True)
    user_name = Column(String)
    user_email = Column(String)
    user_birthday = Column(Date)
    user_zipcode = Column(Integer)


class UserAPI(object):
    """ API """
    def get_all(self):
        all_users = session.query(User).all()
        response = [self._serialize(user) for user in all_users]
        return response

    def get(self, user_id):
        user = session.query(User).filter_by(
            user_id=user_id).first()
        if user is not None:
            response = {
                'Content': self._serialize(user),
                'Message': ''
            }
            return response
        else:
            response = {
                'Content': {},
                'Message': 'No record for user_id={} exists'.format(user_id)
            }
            return response

    def post(self, new_user):
        user = session.query(User).filter_by(
            user_name=new_user.user_name).first()
        if user is None:
            session.add(new_user)
            session.commit()
            response = {
                'Content': self._serialize(new_user),
                'Message': 'Record successfully added'
            }
            return response
        else:
            response = {
                'Content': self._serialize(user),
                'Message': 'User for {} already exists'.format(user.user_name)
            }
            return response

    def delete(self, user_id):
        user = session.query(User).filter_by(
            user_id=user_id).first()
        if user is not None:
            session.delete(user)
            session.commit()
            response = {
                'Content': {},
                'Message': 'Record successfully deleted'
            }
            return response
        else:
            response = {
                'Content': {},
                'Message': 'No record for {} exists'.format(user_id)
            }
            return response

    def _serialize(self, user):
        return {
            'Id': user.user_id,
            'Name': user.user_name,
            'Email': user.user_email,
            'Birthday': user.user_birthday.strftime('%m/%d/%Y'),
            'Zipcode': user.user_zipcode
        }
