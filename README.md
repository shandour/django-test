A simple test app, using Django Rest Framework for the backend and React (React-Router, React-Bootstrap) for the frontend.

Instructions to start the app:
1) Pip install from requirements.txt. If you're using postgresql also install psycopg2 (the app was launced using a Postgresql database).
2) create your own local settings file and add the path as DJANGO_NOTES_LOCAL_SETTINGS_PATH envvar. E.g., export DJANGO_NOTES_LOCAL_SETTINGS_PATH='/path/to/local_settings.py'
 The file should minimally contain a DATABASE dict, the SECRET_KEY, and a boolean value for the DEBUG const.

E.g., DATABASE = {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'mydbname',
        'USER': 'myuser',
        'PASSWORD': 'mypassword',
        'HOST': '',
        'PORT': ''
    }

DEBUG = True

SECRET_KEY = 'mysecretkey'

3) go to /notes/static/notes subfolder. Using yarn or npm install all the dependencies listed in the package.json file.
E.g., yarn add package.json.

4) in that same folder run gulp to properly transform the reactFrontend.js file in the jsx folder into a browser-friendly file (now present in the js folder, created by gulp).
E.g., yarn run gulp

5) Now run the server. The Notes app is to be found on the base url.
