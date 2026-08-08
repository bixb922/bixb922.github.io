# Run with:
# python3 test_demo.py

import flask

app = flask.Flask(__name__)


@app.route("/demo/<filename>")
def iot_serve_static_file( filename ):
    return flask.send_from_directory( "../demo/", filename )


if __name__ == '__main__':
    # https://blog.miguelgrinberg.com/post/running-your-flask-application-over-https
    # app.run(host='0.0.0.0', port=8080, ssl_context='adhoc' )
    app.run(host='0.0.0.0', port=8080 )