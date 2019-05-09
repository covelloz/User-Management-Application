# Uman - A Simple User Management Application
A simple application built on top of a RESTful API to store and query user data.\
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
The application should be hosted with all system and application requirements automatically configured at http://localhost:8080/


\* In order to use virtualization, you may need enable virtualization in your system's BIOS depending on your hardware (Intel VT / AMD-V). Many vendors disable this setting by default. Moreover, if you have Hyper-V enabled for Windows you might need to disable it. You can read more here: https://www.vagrantup.com/docs/installation/

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
TBD