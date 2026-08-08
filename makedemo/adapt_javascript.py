import sys
print(">>>START BUTTON DOES NOT START,")
print(">>>CLEAR SESSION STORAGE AT SOME POINT")

REPLACEMENTS = [ 
    # In HTML files, include demoserver.js before common.js 
    # define new fetch_json()
        ['<script type="text/javascript" src="/static/common.js"></script>',
         '<script type="text/javascript" src="/demo/demoserver.js"></script>\n'
         '\t<script type="text/javascript" src="/demo/common.js"></script>'
        ],
    # fetch_json in common.js is overridden by demoserver.js
        ['async function fetch_json(', 'async function fetch_json_REPLACED('],
    # Alert messages for not implemented functionality
        ["javascript:window.location.href='/filemanager'", "alert('File Manager not implemented in demo')"],
        ['onclick="showLog()"', "onclick=\"alert('Show error log not implemented in demo')\""],
        ['onclick="reset()"', "onclick=\"alert('Reset not implemented in demo')\""],
        ['onclick="deepSleep()"', "onclick=\"alert('Deep sleep not implemented in demo')\""],
        ['"/static/', '"/demo/'],
        ["'/static/", "'/demo/"],
        ["`/static/", "`/demo/"]
        ]

def add_html_prefix( filename, line ):
    out = line
    if "<body" in line:
        try:
            fn = filename + ".demo.txt" 
            with open( fn) as file:
                text = file.read()
            style = "font-size:1.2rem; border-bottom:solid; border-bottom-width:1px; margin-bottom:5px;border-top:solid; border-top-width:1px; margin-top:5px;"
            out = out + f'<div style="{style}">' + text + '</div>'
        except FileNotFoundError:
            print(f"File {fn} not found")
            pass
    return out

def main():
    infilename = sys.argv[1]
    outfilename = sys.argv[2]
    
    basefilename = infilename.split("/")[-1]
    if "crank-organ" in outfilename:
        print("error!!!")
        sys.exit()
    n = 0
    k = 0
    with open( infilename, "r" ) as infile:
        with open( outfilename, "w") as outfile:
            while True:
                line = infile.readline( )
                if not line:
                    break
                out = line
                if infilename.endswith("html"):
                    out = add_html_prefix( basefilename, out )
                for a,b in REPLACEMENTS:
                    out = out.replace(a,b)
                outfile.write( out )
                n += 1
                if out != line:
                    k += 1
    print(basefilename, "processed to", outfilename, ", ", n, "lines,", k, "changes")

main()
