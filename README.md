A simple test app, using Django Rest Framework for the backend and React (React-Router, React-Bootstrap) for the frontend.

Instructions to start the app:
1) create your own local_settings.py file at the project root. The file should minimally contain a DATABASE dict and a boolean value for the DEBUG const.
E.g., DATABASE = {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydbname',
        'USER': 'myuser',
        'PASSWORD': 'mypassword',
        'HOST': '',
        'PORT': ''
    }

DEBUG = True

2) go to /notes/static/notes subfolder. Using yarn or npm install all the dependencies listed in the package.json file.
E.g., yarn add package.json.

3) in that same folder run gulp to properly transform the reactFrontend.js file in the jsx folder into a browser-friendly file (now present in the js folder, created by gulp).
E.g., yarn run gulp

4) Now run the server. The Notes app is to be found on the base url.
