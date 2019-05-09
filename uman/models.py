from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()
Engine = create_engine('sqlite:///:memory:', echo=True)
Session = sessionmaker(bind=Engine)


class User(Base):
    __tablename__ = 'users'
    user_id = Column(Integer, primary_key=True)
    user_name = Column(String)
    user_email = Column(String)
    user_birthday = Column(Date)
    user_zipcode = Column(Integer)

    def get(self):
        return {
            'Name': self.user_name,
            'Email': self.user_email,
            'Birthday': self.user_birthday,
            'ZipCode': self.user_zipcode
        }

    def post(self, session):
        session.add(self)

    def delete(self, session):
        session.delete(self)
