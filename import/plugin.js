/*
 Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
function getCurrentCaret(areaId, pos) {
    let area = document.getElementById(areaId);
    return area.selectionStart;
}

function setSelectionRange(input, selectionStart, selectionEnd) {
  if (input.setSelectionRange) {
    input.focus();
    input.setSelectionRange(selectionStart, selectionEnd);
  }
  else if (input.createTextRange) {
    var range = input.createTextRange();
    range.collapse(true);
    range.moveEnd('character', selectionEnd);
    range.moveStart('character', selectionStart);
    range.select();
  }
}

function setCaretToPos (areaId, pos) {
    let input = document.getElementById(areaId);
    setSelectionRange(input, pos, pos);
}

function moveCaretToPos(areaId, charCount) {
    let address = getCurrentCaret(areaId) + charCount;
    if (address >= 0)
        setCaretToPos(areaId, address);

}

function insertAtCaret(areaId, text) {
        var txtarea = document.getElementById(areaId);
        if (!txtarea) { return; }

        var scrollPos = txtarea.scrollTop;
        var strPos = 0;
        var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ?
            "ff" : (document.selection ? "ie" : false ) );
        if (br == "ie") {
            txtarea.focus();
            var range = document.selection.createRange();
            range.moveStart ('character', -txtarea.value.length);
            strPos = range.text.length;
        } else if (br == "ff") {
            strPos = txtarea.selectionStart;
        }

        var front = (txtarea.value).substring(0, strPos);
        var back = (txtarea.value).substring(strPos, txtarea.value.length);
        txtarea.value = front + text + back;
        strPos = strPos + text.length;
        if (br == "ie") {
            txtarea.focus();
            var ieRange = document.selection.createRange();
            ieRange.moveStart ('character', -txtarea.value.length);
            ieRange.moveStart ('character', strPos);
            ieRange.moveEnd ('character', 0);
            ieRange.select();
        } else if (br == "ff") {
            txtarea.selectionStart = strPos;
            txtarea.selectionEnd = strPos;
            txtarea.focus();
        }

        txtarea.scrollTop = scrollPos;
    }

(function() {
    CKEDITOR.plugins.add("mathjax", {
        lang: "af,ar,az,bg,ca,cs,cy,da,de,de-ch,el,en,en-gb,eo,es,eu,fa,fi,fr,gl,he,hr,hu,id,it,ja,km,ko,ku,lt,nb,nl,no,oc,pl,pt,pt-br,ro,ru,sk,sl,sq,sv,tr,tt,ug,uk,vi,zh,zh-cn",
        requires: "widget,dialog",
        icons: "mathjax",
        hidpi: !0,
        init: function(b) {
            var c = b.config.mathJaxClass || "math-tex";
            b.config.mathJaxLib || CKEDITOR.error("mathjax-no-config");
            b.widgets.add("mathjax", {
                inline: !0,
                dialog: "mathjax",
                button: b.lang.mathjax.button,
                mask: !0,
                allowedContent: "span(!" + c + ")",
                styleToAllowedContentRules: function(a) {
                    a =
                        a.getClassesArray();
                    if (!a) return null;
                    a.push("!" + c);
                    return "span(" + a.join(",") + ")"
                },
                pathName: b.lang.mathjax.pathName,
                template: '\x3cspan class\x3d"' + c + '" style\x3d"display:inline-block" data-cke-survive\x3d1\x3e\x3c/span\x3e',
                parts: {
                    span: "span"
                },
                defaults: {
                    math: "\\(x \x3d {-b \\pm \\sqrt{b^2-4ac} \\over 2a}\\)"
                },
                init: function() {
                    var a = this.parts.span.getChild(0);
                    a && a.type == CKEDITOR.NODE_ELEMENT && a.is("iframe") || (a = new CKEDITOR.dom.element("iframe"), a.setAttributes({
                        style: "border:0;width:0;height:0",
                        scrolling: "no",
                        frameborder: 0,
                        allowTransparency: !0,
                        src: CKEDITOR.plugins.mathjax.fixSrc
                    }), this.parts.span.append(a));
                    this.once("ready", function() {
                        CKEDITOR.env.ie && a.setAttribute("src", CKEDITOR.plugins.mathjax.fixSrc);
                        this.frameWrapper = new CKEDITOR.plugins.mathjax.frameWrapper(a, b);
                        this.frameWrapper.setValue(this.data.math)
                    })
                },
                data: function() {
                    this.frameWrapper && this.frameWrapper.setValue(this.data.math)
                },
                upcast: function(a, b) {
                    if ("span" == a.name && a.hasClass(c) && !(1 < a.children.length || a.children[0].type != CKEDITOR.NODE_TEXT)) {
                        b.math =
                            CKEDITOR.tools.htmlDecode(a.children[0].value);
                        var d = a.attributes;
                        d.style = d.style ? d.style + ";display:inline-block" : "display:inline-block";
                        d["data-cke-survive"] = 1;
                        a.children[0].remove();
                        return a
                    }
                },
                downcast: function(a) {
                    a.children[0].replaceWith(new CKEDITOR.htmlParser.text(CKEDITOR.tools.htmlEncode(this.data.math)));
                    var b = a.attributes;
                    b.style = b.style.replace(/display:\s?inline-block;?\s?/, "");
                    "" === b.style && delete b.style;
                    return a
                }
            });
            /*
             Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
             For licensing, see LICENSE.md or http://ckeditor.com/license
            */
            CKEDITOR.dialog.add("mathjax", function(d) {
                var c, b = d.lang.mathjax;
                return {
                    title: b.title,
                    minWidth: 350,
                    minHeight: 100,
                    contents: [{
                        id: "info",
                        elements: [{
                            id: "equation",
                            type: "textarea",
                            label: b.dialogInput,
                            onLoad: function() {
                                var a = this;
                                if (!CKEDITOR.env.ie || 8 != CKEDITOR.env.version) this.getInputElement().on("keyup", function() {
                                    c.setValue("\\(" + a.getInputElement().getValue() + "\\)")
                                })
                            },
                            setup: function(a) {
                                this.setValue(CKEDITOR.plugins.mathjax.trim(a.data.math))
                            },
                            commit: function(a) {
                                a.setData("math", "\\(" + this.getValue() +
                                    "\\)")
                            }
                        },{
                            id: "documentation",
                            type: "html",
                            html: '\x3cdiv style\x3d"width:100%;text-align:right;margin:-8px 0 10px"\x3e\x3ca class\x3d"cke_mathjax_doc" href\x3d"' + b.docUrl + '" target\x3d"_black" style\x3d"cursor:pointer;color:#00B2CE;text-decoration:underline"\x3e' + b.docLabel + "\x3c/a\x3e\x3c/div\x3e"
                        }, {
                            id: "button1",
                            type: "button",
                            onClick: function() {
                                let z = this._.dialog.getContentElement("info", "equation");
                                insertAtCaret(z._.inputId," + ");
                                c.setValue("\\(" + z.getInputElement().getValue() + "\\)")
                            },
                            style: 'background-image: url(/img/plus.png)'
                        }, {
                            id: "button2",
                            type: "button",
                            onClick: function() {
                                let z = this._.dialog.getContentElement("info", "equation");
                                insertAtCaret(z._.inputId," - ");
                                c.setValue("\\(" + z.getInputElement().getValue() + "\\)")
                            },
                            style: 'background-image: url(/img/minus.png);'
                        }, {
                            id: "button3",
                            type: "button",
                            onClick: function() {
                                let z = this._.dialog.getContentElement("info", "equation");
                                insertAtCaret(z._.inputId," \\times ");
                                c.setValue("\\(" + z.getInputElement().getValue() + "\\)")
                            },
                            style: 'background-image: url(/img/mul.png);'
                        }, {
                            id: "button4",
                            type: "button",
                            onClick: function() {
                                let z = this._.dialog.getContentElement("info", "equation");
                                insertAtCaret(z._.inputId," \\over ");
                                c.setValue("\\(" + z.getInputElement().getValue() + "\\)")
                            },
                            style: 'background-image: url(/img/div.png);'
                        }, {
                            id: "button5",
                            type: "button",
                            onClick: function() {
                                let z = this._.dialog.getContentElement("info", "equation");
                                insertAtCaret(z._.inputId,"^2 ");
                                c.setValue("\\(" + z.getInputElement().getValue() + "\\)")
                            },
                            style: 'background-image: url(/img/sqr.png);'
                        }, {
                            id: "button6",
                            type: "button",
                            onClick: function() {
                                let z = this._.dialog.getContentElement("info", "equation");
                                insertAtCaret(z._.inputId," \\sqrt{} ");
                                c.setValue("\\(" + z.getInputElement().getValue() + "\\)")
                                moveCaretToPos(z._.inputId, -2);
                            },
                            style: 'background-image: url(/img/sqrt.png);'
                        }, {
                            id: "button7",
                            type: "button",
                            onClick: function() {
                                let z = this._.dialog.getContentElement("info", "equation");
                                insertAtCaret(z._.inputId," \\sqrt[3]{} ");
                                c.setValue("\\(" + z.getInputElement().getValue() + "\\)")
                                moveCaretToPos(z._.inputId, -2);
                            },
                            style: 'background-image: url(/img/sqrt3.png);'
                        }, {
                            id: "button8",
                            type: "button",
                            onClick: function() {
                                let z = this._.dialog.getContentElement("info", "equation");
                                insertAtCaret(z._.inputId," \\pi ");
                                c.setValue("\\(" + z.getInputElement().getValue() + "\\)")
                            },
                            style: 'background-image: url(/img/pi.png);'
                        },  !(CKEDITOR.env.ie && 8 == CKEDITOR.env.version) && {
                            id: "preview",
                            type: "html",
                            html: '\x3cdiv style\x3d"width:100%;text-align:center;"\x3e\x3ciframe style\x3d"border:0;width:0;height:0;font-size:20px" scrolling\x3d"no" frameborder\x3d"0" allowTransparency\x3d"true" src\x3d"' +
                                CKEDITOR.plugins.mathjax.fixSrc + '"\x3e\x3c/iframe\x3e\x3c/div\x3e',
                            onLoad: function() {
                                var a = CKEDITOR.document.getById(this.domId).getChild(0);
                                c = new CKEDITOR.plugins.mathjax.frameWrapper(a, d)
                            },
                            setup: function(a) {
                                c.setValue(a.data.math)
                            }
                        }]
                    }]
                }
            });
            b.on("contentPreview",
                function(a) {
                    a.data.dataValue = a.data.dataValue.replace(/<\/head>/, '\x3cscript src\x3d"' + CKEDITOR.getUrl(b.config.mathJaxLib) + '"\x3e\x3c/script\x3e\x3c/head\x3e')
                });
            b.on("paste", function(a) {
                a.data.dataValue = a.data.dataValue.replace(new RegExp("\x3cspan[^\x3e]*?" + c + ".*?\x3c/span\x3e", "ig"), function(a) {
                    return a.replace(/(<iframe.*?\/iframe>)/i, "")
                })
            })
        }
    });
    CKEDITOR.plugins.mathjax = {};
    CKEDITOR.plugins.mathjax.fixSrc = CKEDITOR.env.gecko ? "javascript:true" : CKEDITOR.env.ie ? "javascript:void((function(){" + encodeURIComponent("document.open();(" +
        CKEDITOR.tools.fixDomain + ")();document.close();") + "})())" : "javascript:void(0)";
    CKEDITOR.plugins.mathjax.loadingIcon = CKEDITOR.plugins.get("mathjax").path + "images/loader.gif";
    CKEDITOR.plugins.mathjax.copyStyles = function(b, c) {
        for (var a = "color font-family font-style font-weight font-variant font-size".split(" "), e = 0; e < a.length; e++) {
            var d = a[e],
                g = b.getComputedStyle(d);
            g && c.setStyle(d, g)
        }
    };
    CKEDITOR.plugins.mathjax.trim = function(b) {
        var c = b.indexOf("\\(") + 2,
            a = b.lastIndexOf("\\)");
        return b.substring(c, a)
    };
    CKEDITOR.plugins.mathjax.frameWrapper = CKEDITOR.env.ie && 8 == CKEDITOR.env.version ? function(b, c) {
        b.getFrameDocument().write('\x3c!DOCTYPE html\x3e\x3chtml\x3e\x3chead\x3e\x3cmeta charset\x3d"utf-8"\x3e\x3c/head\x3e\x3cbody style\x3d"padding:0;margin:0;background:transparent;overflow:hidden"\x3e\x3cspan style\x3d"white-space:nowrap;" id\x3d"tex"\x3e\x3c/span\x3e\x3c/body\x3e\x3c/html\x3e');
        return {
            setValue: function(a) {
                var e = b.getFrameDocument(),
                    d = e.getById("tex");
                d.setHtml(CKEDITOR.plugins.mathjax.trim(CKEDITOR.tools.htmlEncode(a)));
                CKEDITOR.plugins.mathjax.copyStyles(b, d);
                c.fire("lockSnapshot");
                b.setStyles({
                    width: Math.min(250, d.$.offsetWidth) + "px",
                    height: e.$.body.offsetHeight + "px",
                    display: "inline",
                    "vertical-align": "middle"
                });
                c.fire("unlockSnapshot")
            }
        }
    } : function(b, c) {
        function a() {
            f = b.getFrameDocument();
            f.getById("preview") || (CKEDITOR.env.ie && b.removeAttribute("src"), f.write('\x3c!DOCTYPE html\x3e\x3chtml\x3e\x3chead\x3e\x3cmeta charset\x3d"utf-8"\x3e\x3cscript type\x3d"text/x-mathjax-config"\x3eMathJax.Hub.Config( {showMathMenu: false,messageStyle: "none"} );function getCKE() {if ( typeof window.parent.CKEDITOR \x3d\x3d \'object\' ) {return window.parent.CKEDITOR;} else {return window.parent.parent.CKEDITOR;}}function update() {MathJax.Hub.Queue([ \'Typeset\', MathJax.Hub, this.buffer ],function() {getCKE().tools.callFunction( ' +
                n + " );});}MathJax.Hub.Queue( function() {getCKE().tools.callFunction(" + p + ');} );\x3c/script\x3e\x3cscript src\x3d"' + c.config.mathJaxLib + '"\x3e\x3c/script\x3e\x3c/head\x3e\x3cbody style\x3d"padding:0;margin:0;background:transparent;overflow:hidden"\x3e\x3cspan id\x3d"preview"\x3e\x3c/span\x3e\x3cspan id\x3d"buffer" style\x3d"display:none"\x3e\x3c/span\x3e\x3c/body\x3e\x3c/html\x3e'))
        }

        function e() {
            m = !0;
            h = k;
            c.fire("lockSnapshot");
            d.setHtml(h);
            g.setHtml("\x3cimg src\x3d" + CKEDITOR.plugins.mathjax.loadingIcon +
                " alt\x3d" + c.lang.mathjax.loading + "\x3e");
            b.setStyles({
                height: "16px",
                width: "16px",
                display: "inline",
                "vertical-align": "middle"
            });
            c.fire("unlockSnapshot");
            f.getWindow().$.update(h)
        }
        var d, g, h, k, f = b.getFrameDocument(),
            l = !1,
            m = !1,
            p = CKEDITOR.tools.addFunction(function() {
                g = f.getById("preview");
                d = f.getById("buffer");
                l = !0;
                k && e();
                CKEDITOR.fire("mathJaxLoaded", b)
            }),
            n = CKEDITOR.tools.addFunction(function() {
                CKEDITOR.plugins.mathjax.copyStyles(b, g);
                g.setHtml(d.getHtml());
                c.fire("lockSnapshot");
                b.setStyles({
                    height: 0,
                    width: 0
                });
                var a = Math.max(f.$.body.offsetHeight, f.$.documentElement.offsetHeight),
                    l = Math.max(g.$.offsetWidth, f.$.body.scrollWidth);
                b.setStyles({
                    height: a + "px",
                    width: l + "px"
                });
                c.fire("unlockSnapshot");
                CKEDITOR.fire("mathJaxUpdateDone", b);
                h != k ? e() : m = !1
            });
        b.on("load", a);
        a();
        return {
            setValue: function(a) {
                k = CKEDITOR.tools.htmlEncode(a);
                l && !m && e()
            }
        }
    }
})();