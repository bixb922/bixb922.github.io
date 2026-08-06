# cd makedemo
# gmake
#
OUTPUT_FOLDER = ../static/

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
translations.js \

OUTPUT_FILES = $(addprefix $(OUTPUT_FOLDER), $(FILES))

# Here is the original crank-organ/static folder
CRANK_ORGAN_STATIC = ../../crank-organ/static/


demo: $(OUTPUT_FILES)

$(OUTPUT_FOLDER)%.jpg : $(CRANK_ORGAN_STATIC)%.jpg
	cp $< $@

$(OUTPUT_FOLDER)%.ico : $(CRANK_ORGAN_STATIC)%.ico
	cp $< $@

$(OUTPUT_FOLDER)%.png : $(CRANK_ORGAN_STATIC)%.png
	cp $< $@

$(OUTPUT_FOLDER)%.html : $(CRANK_ORGAN_STATIC)%.html  adapt_javascript.py %.html.demo.txt
	python3 adapt_javascript.py $< $@

../static/%.js : $(CRANK_ORGAN_STATIC)%.js  adapt_javascript.py
	python3 adapt_javascript.py $< $@

$(OUTPUT_FOLDER)%.css : $(CRANK_ORGAN_STATIC)%.css
	cp $< $@

clean: $(OUTPUT_FILES)
	rm $(OUTPUT_FILES)