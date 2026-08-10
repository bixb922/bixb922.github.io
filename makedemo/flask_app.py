# Run with:
# python3 test_demo.py

import flask

app = flask.Flask(__name__)

@app.route("/")
def serve_index():
    return flask.send_from_directory( "../", "index.html")

@app.route("/<filename>")
def serve_static_file( filename ):
    return flask.send_from_directory( "../", filename )

@app.route("/demo/")
def servo_demo_index(  ):
    return flask.send_from_directory( "../demo/", "index.html" )

@app.route("/demo/<filename>")
def servo_demo_file( filename ):
    return flask.send_from_directory( "../demo/", filename )

@app.route("/how_does_it_work/<filename>")
def serve_howto_file( filename ):
    return flask.send_from_directory( "../how_does_it_work/", filename )

@app.route("/build_photos/")
def serve_photos_index(  ):
    return flask.send_from_directory( "../build_photos/", "index.html" )

@app.route("/build_photos/<path:path>")
def serve_photos( path ):
    return flask.send_from_directory( "../build_photos/", path )


@app.route("/find_it/<filename>")
def serve_find_it( filename ):
    return flask.send_from_directory( "../find_it/", filename )


if __name__ == '__main__':
    # https://blog.miguelgrinberg.com/post/running-your-flask-application-over-https
    # app.run(host='0.0.0.0', port=8080, ssl_context='adhoc' )
    app.run(host='0.0.0.0', port=8080 )