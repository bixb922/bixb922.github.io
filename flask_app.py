# Run with:
# python3 flask_app.py
#
# Test program for local testing of the github.io pages.


import flask

app = flask.Flask(__name__)

@app.route("/")
def serve_index():
    return flask.redirect( "/index.html")

# /demo/ maps to /demo/index.html on the official github.io pages, 
# for testing here, there is no such mapping .

@app.route("/<path:path>")
def serve_static_file( path ):
    return flask.send_from_directory( "./", path )


if __name__ == '__main__':
    # https://blog.miguelgrinberg.com/post/running-your-flask-application-over-https
    # app.run(host='0.0.0.0', port=8080, ssl_context='adhoc' )
    app.run(host='0.0.0.0', port=8080 )