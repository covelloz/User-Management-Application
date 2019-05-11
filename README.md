# Uman - A Simple User Management Application
A simple React application built on top of a RESTful API to store and query user data.\
Written in Python 3.6 utilizing Flask microframework and SQLAlchemy ORM with an in-memory sqlite database backend.

## Setting up Development Environment
In order to facilitate a cross-platform development environment, Vagrant (v2.2.4) and Virtualbox (v6.0.6) are used *.\
Please download and install both.

**Vagrant:** https://www.vagrantup.com/downloads.html \
**VirtualBox:** https://www.virtualbox.org/wiki/Downloads


A *Vagrantfile* is provided.\
To provision a locally hosted virtualized machine and host the application, type the following terminal command in the application's root directory:
```
$ vagrant up
```
The application should be hosted with all system and application requirements automatically configured at http://localhost:8080/uman

\* In order to use virtualization, you may need enable virtualization in your system's BIOS depending on your hardware (Intel VT / AMD-V). Many vendors disable this setting by default. Moreover, if you have Hyper-V enabled for Windows you might need to disable it. You can read more here: https://www.vagrantup.com/docs/installation/

I already included a compiled production build of the front-end for convenience.
If you want an interactive, developer instance of the UI just change directory into *uman_app* subfolder and start a local npm server. The package.json is already configured to proxy http://localhost:8080/.
```
npm start
```

When you are ready to tear down the application
```
vagrant destroy
```
If you need to SSH into the virtual machine for any intermediatry provisioning
```
vagrant ssh
```
All applications files are located at synced folder: /vagrant

## Using the API
All examples below are written in Python 3.6

*Note:* duplicate entries handled by user_name.\
If the user_name already exists in the database, the API will not re-add the user.

**POST**
* **Adding** a new user
```python
    import json
    import requests

    url = 'http://localhost:8080/uman/add-user'
    payload = {
        'user_name': 'Test User 1',
        'user_email': 'testuser1@fakeemail.com',
        'user_birthday': '01/01/2019',
        'user_zipcode': 00000
    }
    headers = {'Content-Type': 'application/json'}
    response = requests.post(url, data=json.dumps(payload), headers=headers)
    print(response.text)
```
**GET**
* Get **specific user's** data by user_id
```python
    import json
    import requests

    url = 'http://localhost:8080/uman/user/1'
    response = requests.get(url)
    print(response.text)
```
* Get **all users'** data
```python
    import json
    import requests

    url = 'http://localhost:8080/uman/all-users'
    response = requests.get(url)
    print(response.text)
```
**DELETE**
* **Delete** a specific user from the database by user_id
```python
    import json
    import requests

    url = 'http://localhost:8080/uman/delete-user/1'
    response = requests.delete(url)
    print(response.text)
```
