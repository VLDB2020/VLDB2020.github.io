---
layout: default
title: Formatting Guidelines
category: forauthors
---

# VLDB 2020: Formatting Guidelines

## Generation Information

All papers submitted to PVLDB and the VLDB Conference, irrespective of track, must adhere strictly to the PVLDB format detailed here. Any deviation will be liable to summary rejection of the paper. The paper should:

- strictly follow the PVLDB style template w.r.t. line spacing, font size or style of captions. For convenience, a sample is provided alongside the LaTeX and MS Word templates:
- ***Note: those are templates for submissions only, templates for camera-ready can be found in the Camera Ready instruction below.***
    - [vldb.cls](https://vldb2020.org/assets/files/vldb.cls): LaTeX document class
    - [vldb_style_sample.zip](https://vldb2020.org/assets/files/vldb_style_sample.zip): LaTeX example
    - [vldb_sample.doc](https://vldb2020.org/assets/files/vldb_sample.doc): Microsoft Word Template
- show no headers or footers;
- be formatted using US letter paper format;
- have no line overflows, no [widows or orphans](https://en.wikipedia.org/wiki/Widows_and_orphans), etc.;
- have balanced columns on the last page (LaTeX tip: \usepackage{balance});
- have all figures and tables readable (without having to turn the PDF reader's magnification to 400%);
- avoid abbreviations where not needed, e.g., when referencing the name of a journal or when referring to a Section, a Figure etc.;
- have no numbering issues, e.g., all floats (Figures, Tables etc) are numbered consecutively and also the references in the text use the correct numbers;
- use the abbrv bibliography style (LaTeX) including all references being alphabetically sorted. References should include author, title, proceedings, pages, and year; with proceedings or journal name in italics.
- embed all fonts, including Type 1 postscript fonts, within your PDF.
- You can check this with the 'Properties' menu of Acrobat Reader (should show 'embeded' for each font). TeX users can check with the command updmap --edit that pdftexDownloadBase14 is set to true for your pdftex installation (better also set dvipsDownloadBase35 true). This is a request by the ACM digital library to improve searchability of our papers; ACM maintains a [FAQ about embedding fonts in TeX](http://www.acm.org/sigs/publications/sigfaq#a14).
- contain the same author information as in [CMT](https://cmt3.research.microsoft.com/VLDB2020/). e.g., the order of the authors must be the same in the paper and [CMT](https://cmt3.research.microsoft.com/VLDB2020/). Middle names of the authors, if any, must be the same as it is in CMT.
- contain no citations in the Abstract.
- contain the same Abstract as the one submitted to [CMT](https://cmt3.research.microsoft.com/VLDB2020/).


<!--
## Important Notice

For research track papers that belong to a special category (Vision, Innovative Systems and Applications, Experiments and Analyses), authors ***MUST*** append the category tag as a ***SUFFIX*** to the title of the paper. For example, ***"Data Management in the Year 3000 [Vision]"***. This must be done both in the paper file and in the [CMT](https://cmt3.research.microsoft.com/VLDB2020/) submission title.
VLDB is a ***single-blind*** conference. Therefore, authors MUST include their names and affiliations on the manuscript cover page.
-->

# Copyright and Camera Ready Information

All papers accepted for the VLDB 2020 Conference will be published in the Proceedings of the VLDB Endowment (PVLDB) Volume 13. It is the authors' responsibility to ensure that their submissions adhere strictly to the VLDB format detailed above. Please follow the process below to submit the final camera-ready copy of your accepted paper. You must complete this process by the 5th of the month following the acceptance notification date.

1. Prepare the final version of your paper using the current camera-ready style files (available for LaTex and Word formats). You must download and use the latest style files since each month the issue number changes.
1. Submit the final version of your paper as PDF using the VLDB 2020 conference management tool that is accessible at https://cmt3.research.microsoft.com/VLDB2020/.
1. In [CMT](https://cmt3.research.microsoft.com/VLDB2020/), please check carefully the paper's meta-data such as title, abstract, authors' names, affiliations, and their order, and correct those if necessary; note that this information, once processed, will be final and used for producing the conference booklet.
1. Rename your file to pid-contact-author.lastname.pdf and upload it to [CMT](https://cmt3.research.microsoft.com/VLDB2020/); for instance, if your submission was given the id 42 and your name is John Smith, you should name your file p42-smith.pdf.
1. Finally, download the PVLDB Copyright License Form (available in [.pdf](https://vldb2020.org/assets/files/VLDB_Copyright_License_Form.pdf) format) and follow the instructions in the file to send the form to the Proceedings Chairs.

## Publication Process

Accepted VLDB papers are continuously published in monthly issues. You can expect a couple of months (from the time you complete the camera-ready submission process) for your paper to appear in the Proceedings. PVLDB is an archival journal with monthly issues that is published online on vldb.org, in the ACM Digital Library, on DBLP and, since 2011, also in the Computing Research Repository (CoRR) on arxiv.org.