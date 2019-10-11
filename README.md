# General-Automation
Miscellaneous automation scripts not used for G-Suite

## translation.js

This script extracts all words from a given .docx document and translates them either French to English or English to French.

### Usage

Run `node translation.js F ./path_to_docx_to_translate ./path_to_docx_made_after_translation` for English -> French.

Run `node translation.js E ./path_to_docx_to_translate ./path_to_docx_made_after_translation` for English -> French.

The document paths are optional. If the docx to translate is not given, it defaults to `./translate_me.docx`. The output document defaults to `./translated.docx`.

*Note, if the path to the document to translate is not provided, the path to the output document ALSO CANNOT be provided* 
