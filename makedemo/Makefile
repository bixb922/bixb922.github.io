# cd makedemo
# gmake
#
OUTPUT_FOLDER = ../demo/

FILES := \
common.js \
config.html \
diag.html \
crank.jpg \
favicon.ico \
favicon.png \
filemanager.html \
index.html \
history.html \
note.html \
notelist.html \
pinout.html \
play.html \
tunelibedit.html \
tunelist.html \
skeleton.css \
translations.js 

OUTPUT_FILES = $(addprefix $(OUTPUT_FOLDER), $(FILES))

# Here is the original crank-organ/static folder
INPUT_FOLDER = ../../crank-organ/static/


demo: $(OUTPUT_FILES)

$(OUTPUT_FOLDER)%.jpg : $(INPUT_FOLDER)%.jpg
	cp $< $@

$(OUTPUT_FOLDER)%.ico : $(INPUT_FOLDER)%.ico
	cp $< $@

$(OUTPUT_FOLDER)%.png : $(INPUT_FOLDER)%.png
	cp $< $@

$(OUTPUT_FOLDER)%.html : $(INPUT_FOLDER)%.html  adapt_javascript.py %.html.demo.txt
	python3 adapt_javascript.py $< $@

$(OUTPUT_FOLDER)%.js : $(INPUT_FOLDER)%.js  adapt_javascript.py
	python3 adapt_javascript.py $< $@

$(OUTPUT_FOLDER)%.css : $(INPUT_FOLDER)%.css
	cp $< $@

clean: $(OUTPUT_FILES)
	rm $(OUTPUT_FILES)