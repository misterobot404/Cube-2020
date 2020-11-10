(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[3],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Chat.vue?vue&type=script&lang=js&":
/*!*****************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vuetify-loader/lib/loader.js??ref--10-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Chat.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  name: "Chat",
  data: function data() {
    return {
      msg: "",
      chat: [{
        why: "left",
        massage: "Привет! Как дела?",
        img: "/images/chat/1.8cccc71b.jpg"
      }, {
        why: "left",
        massage: "Это тестовый чат.",
        img: "/images/chat/1.8cccc71b.jpg"
      }, {
        why: "left",
        massage: "Напиши мне что-то.",
        img: "/images/chat/1.8cccc71b.jpg"
      }, {
        why: "right",
        massage: "Сейчас попробую ...",
        img: "/images/avatars/admin.jpg"
      }]
    };
  },
  methods: {
    submit: function submit() {
      var _this = this;

      this.chat.push({
        why: "right",
        massage: this.msg,
        img: "/images/avatars/admin.jpg"
      });
      this.msg = "";
      setTimeout(function () {
        return _this.chat.push({
          why: "left",
          massage: "Спасибо!",
          img: "/images/chat/1.8cccc71b.jpg"
        });
      }, 800);
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css&":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader??ref--5-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--5-2!./node_modules/vuetify-loader/lib/loader.js??ref--10-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css& ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n.chat-app[data-v-18c4d261] {\n    overflow: hidden;\n}\n.border-bottom[data-v-18c4d261] {\n    border-bottom: 1px solid rgba(0, 0, 0, .1);\n}\n.hightauto[data-v-18c4d261] {\n    min-height: calc(100vh - 360px);\n}\n.chat-app .chat-right-part[data-v-18c4d261] {\n    width: 100%;\n    border-left: 1px solid rgba(0, 0, 0, .1);\n}\n.chat-app .chat-right-part .chat-topbar[data-v-18c4d261] {\n    border-bottom: 1px solid rgba(0, 0, 0, .1);\n}\n.chat-app .chat-room .fromMe[data-v-18c4d261] {\n    justify-content: flex-start;\n    flex-direction: row-reverse;\n}\n.v-application.theme--light .border-top[data-v-18c4d261] {\n    border-top: 1px solid rgba(0, 0, 0, .1);\n}\n.chat-app .chat-room[data-v-18c4d261] {\n    min-height: calc(100vh - 385px);\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css&":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader!./node_modules/css-loader??ref--5-1!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src??ref--5-2!./node_modules/vuetify-loader/lib/loader.js??ref--10-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../node_modules/css-loader??ref--5-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--5-2!../../../node_modules/vuetify-loader/lib/loader.js??ref--10-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css& */ "./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css&");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Chat.vue?vue&type=template&id=18c4d261&scoped=true&":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vuetify-loader/lib/loader.js??ref--10-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Chat.vue?vue&type=template&id=18c4d261&scoped=true& ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("v-row", { staticClass: "chat-app" }, [
    _c(
      "div",
      { staticClass: "col-sm-12 col-12 pt-0" },
      [
        _c(
          "v-card",
          { staticClass: "d-flex flex-row v-sheet", attrs: { light: "" } },
          [
            _c(
              "aside",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: _vm.$vuetify.breakpoint.smAndUp,
                    expression: "$vuetify.breakpoint.smAndUp"
                  }
                ],
                staticClass:
                  "flex-shrink-0 v-navigation-drawer v-navigation-drawer--open",
                staticStyle: {
                  height: "100%",
                  top: "0px",
                  transform: "translateX(0%)",
                  width: "256px"
                },
                attrs: { left: "", "data-booted": "true" }
              },
              [
                _c("div", { staticClass: "v-navigation-drawer__content" }, [
                  _c("div", { staticClass: "px-3 border-bottom" }, [
                    _c(
                      "div",
                      {
                        staticClass:
                          "v-input mb-0 mt-0 theme--light v-text-field v-text-field--is-booted v-text-field--placeholder"
                      },
                      [
                        _c("div", { staticClass: "v-input__control" }, [
                          _c("div", { staticClass: "v-input__slot" }, [
                            _c("div", { staticClass: "v-text-field__slot" }, [
                              _c("input", {
                                attrs: {
                                  id: "input-280",
                                  placeholder: "Поиск контакта",
                                  type: "text"
                                }
                              })
                            ])
                          ]),
                          _vm._v(" "),
                          _c("div", { staticClass: "v-text-field__details" }, [
                            _c(
                              "div",
                              { staticClass: "v-messages theme--light" },
                              [
                                _c("div", {
                                  staticClass: "v-messages__wrapper"
                                })
                              ]
                            )
                          ])
                        ])
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass:
                        "v-list hightauto v-sheet theme--light v-list--nav",
                      attrs: { role: "list" }
                    },
                    [
                      _c(
                        "div",
                        {
                          staticClass:
                            "v-list-item v-list-item--link theme--light s",
                          attrs: { tabindex: "0", role: "listitem" }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "v-avatar mr-3",
                              staticStyle: {
                                height: "42px",
                                "min-width": "42px",
                                width: "42px"
                              }
                            },
                            [
                              _c("img", {
                                attrs: {
                                  src: "/images/chat/1.8cccc71b.jpg",
                                  alt: "1.jpg"
                                }
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "v-list-item__content" }, [
                            _c("div", { staticClass: "v-list-item__title" }, [
                              _c("h5", [_vm._v("Александр Рудейко")]),
                              _c("span", { staticClass: "caption" }, [
                                _vm._v("Hey! What's up? So many times since we")
                              ])
                            ])
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "v-list-item v-list-item--link theme--light s",
                          attrs: { tabindex: "0", role: "listitem" }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "v-avatar mr-3",
                              staticStyle: {
                                height: "42px",
                                "min-width": "42px",
                                width: "42px"
                              }
                            },
                            [
                              _c("img", {
                                attrs: {
                                  src: "/images/chat/2.92fb17ec.jpg",
                                  alt: "2.jpg"
                                }
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "v-list-item__content" }, [
                            _c("div", { staticClass: "v-list-item__title" }, [
                              _c("h5", [_vm._v("Георгий Тимофеев")]),
                              _c("span", { staticClass: "caption" }, [
                                _vm._v(
                                  "Good news coming tonight. Seems they agreed to proceed"
                                )
                              ])
                            ])
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "v-list-item v-list-item--link theme--light s",
                          attrs: { tabindex: "0", role: "listitem" }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "v-avatar mr-3",
                              staticStyle: {
                                height: "42px",
                                "min-width": "42px",
                                width: "42px"
                              }
                            },
                            [
                              _c("img", {
                                attrs: {
                                  src: "/images/chat/3.78962450.jpg",
                                  alt: "3.jpg"
                                }
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "v-list-item__content" }, [
                            _c("div", { staticClass: "v-list-item__title" }, [
                              _c("h5", [_vm._v("Елизавета Павлюк")]),
                              _c("span", { staticClass: "caption" }, [
                                _vm._v("Check out my latest email plz!")
                              ])
                            ])
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "v-list-item v-list-item--link theme--light s",
                          attrs: { tabindex: "0", role: "listitem" }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "v-avatar mr-3",
                              staticStyle: {
                                height: "42px",
                                "min-width": "42px",
                                width: "42px"
                              }
                            },
                            [
                              _c("img", {
                                attrs: {
                                  src: "/images/chat/4.7eef6399.jpg",
                                  alt: "4.jpg"
                                }
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "v-list-item__content" }, [
                            _c("div", { staticClass: "v-list-item__title" }, [
                              _c("h5", [_vm._v("Герман Солошин")]),
                              _c("span", { staticClass: "caption" }, [
                                _vm._v("What about summer break?")
                              ])
                            ])
                          ])
                        ]
                      ),
                      _vm._v(" "),
                      _c(
                        "div",
                        {
                          staticClass:
                            "v-list-item v-list-item--link theme--light s",
                          attrs: { tabindex: "0", role: "listitem" }
                        },
                        [
                          _c(
                            "div",
                            {
                              staticClass: "v-avatar mr-3",
                              staticStyle: {
                                height: "42px",
                                "min-width": "42px",
                                width: "42px"
                              }
                            },
                            [
                              _c("img", {
                                attrs: {
                                  src: "/images/chat/5.764ff046.jpg",
                                  alt: "5.jpg"
                                }
                              })
                            ]
                          ),
                          _vm._v(" "),
                          _c("div", { staticClass: "v-list-item__content" }, [
                            _c("div", { staticClass: "v-list-item__title" }, [
                              _c("h5", [_vm._v("Максим Желтов")]),
                              _c("span", { staticClass: "caption" }, [
                                _vm._v(
                                  "Just ain't sure about the weekend now. 90% I'll make it."
                                )
                              ])
                            ])
                          ])
                        ]
                      )
                    ]
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "v-navigation-drawer__border" })
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "chat-right-part" }, [
              _c(
                "div",
                { staticClass: "chat-topbar d-flex px-3 py-3 align-center" },
                [
                  _c("div", [
                    _c(
                      "button",
                      {
                        staticClass:
                          "v-app-bar__nav-icon d-block d-lg-none mr-2 v-btn v-btn--flat v-btn--icon v-btn--round theme--light v-size--default",
                        attrs: { type: "button" }
                      },
                      [
                        _c("span", { staticClass: "v-btn__content" }, [
                          _c("i", {
                            staticClass:
                              "v-icon notranslate mdi mdi-menu theme--light",
                            attrs: { "aria-hidden": "true" }
                          })
                        ])
                      ]
                    )
                  ]),
                  _vm._v(" "),
                  _c(
                    "div",
                    {
                      staticClass: "v-avatar mr-3",
                      staticStyle: {
                        height: "42px",
                        "min-width": "42px",
                        width: "42px"
                      }
                    },
                    [
                      _c("img", {
                        attrs: {
                          src: "/images/chat/1.8cccc71b.jpg",
                          width: "37"
                        }
                      })
                    ]
                  ),
                  _vm._v(" "),
                  _c("div", { staticClass: "user-about" }, [
                    _c("h4", [_vm._v("Александр Рудейко")])
                  ])
                ]
              ),
              _vm._v(" "),
              _c("div", [
                _c(
                  "div",
                  { staticClass: "chat-room px-3 py-3" },
                  _vm._l(_vm.chat, function(item, index) {
                    return _c(
                      "div",
                      {
                        key: index,
                        staticClass: "d-flex align-center mb-3 messageItem",
                        class: item.why === "right" ? "fromMe" : null
                      },
                      [
                        _c("div", { staticClass: "thumb" }, [
                          _c(
                            "div",
                            {
                              staticClass: "v-avatar mx-2",
                              staticStyle: {
                                height: "37px",
                                "min-width": "37px",
                                width: "37px"
                              }
                            },
                            [
                              _c("img", {
                                attrs: { src: item.img, alt: "..." }
                              })
                            ]
                          )
                        ]),
                        _vm._v(" "),
                        _c(
                          "span",
                          {
                            staticClass:
                              "v-chip v-chip--no-color theme--light v-size--default"
                          },
                          [
                            _c("span", { staticClass: "v-chip__content" }, [
                              _vm._v(
                                "\n                                " +
                                  _vm._s(item.massage) +
                                  "\n                                "
                              )
                            ])
                          ]
                        )
                      ]
                    )
                  }),
                  0
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "pa-3 border-top" }, [
                _c(
                  "div",
                  {
                    staticClass:
                      "v-input v-textarea theme--light v-text-field v-text-field--is-booted v-text-field--placeholder"
                  },
                  [
                    _c("div", { staticClass: "v-input__control" }, [
                      _c(
                        "div",
                        { staticClass: "v-input__slot" },
                        [
                          _c("div", { staticClass: "v-text-field__slot" }, [
                            _c("input", {
                              directives: [
                                {
                                  name: "model",
                                  rawName: "v-model",
                                  value: _vm.msg,
                                  expression: "msg"
                                }
                              ],
                              attrs: {
                                name: "input-4-1",
                                id: "input-305",
                                placeholder: "Type and hit Enter"
                              },
                              domProps: { value: _vm.msg },
                              on: {
                                keyup: function($event) {
                                  if (
                                    !$event.type.indexOf("key") &&
                                    _vm._k(
                                      $event.keyCode,
                                      "enter",
                                      13,
                                      $event.key,
                                      "Enter"
                                    )
                                  ) {
                                    return null
                                  }
                                  return _vm.submit($event)
                                },
                                input: function($event) {
                                  if ($event.target.composing) {
                                    return
                                  }
                                  _vm.msg = $event.target.value
                                }
                              }
                            })
                          ]),
                          _vm._v(" "),
                          _c(
                            "v-btn",
                            {
                              staticClass: "ml-1",
                              attrs: { icon: "" },
                              on: { click: _vm.submit }
                            },
                            [
                              _c("v-icon", [
                                _vm._v(
                                  "\n                                        send\n                                    "
                                )
                              ])
                            ],
                            1
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c("div", { staticClass: "v-text-field__details" }, [
                        _c("div", { staticClass: "v-messages theme--light" }, [
                          _c("div", { staticClass: "v-messages__wrapper" })
                        ])
                      ])
                    ])
                  ]
                )
              ])
            ])
          ]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Chat.vue":
/*!*************************************!*\
  !*** ./resources/js/pages/Chat.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Chat_vue_vue_type_template_id_18c4d261_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Chat.vue?vue&type=template&id=18c4d261&scoped=true& */ "./resources/js/pages/Chat.vue?vue&type=template&id=18c4d261&scoped=true&");
/* harmony import */ var _Chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Chat.vue?vue&type=script&lang=js& */ "./resources/js/pages/Chat.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _Chat_vue_vue_type_style_index_0_id_18c4d261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css& */ "./resources/js/pages/Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../node_modules/vuetify-loader/lib/runtime/installComponents.js */ "./node_modules/vuetify-loader/lib/runtime/installComponents.js");
/* harmony import */ var _node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! vuetify/lib/components/VBtn */ "./node_modules/vuetify/lib/components/VBtn/index.js");
/* harmony import */ var vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vuetify/lib/components/VCard */ "./node_modules/vuetify/lib/components/VCard/index.js");
/* harmony import */ var vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify/lib/components/VIcon */ "./node_modules/vuetify/lib/components/VIcon/index.js");
/* harmony import */ var vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! vuetify/lib/components/VGrid */ "./node_modules/vuetify/lib/components/VGrid/index.js");






/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _Chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Chat_vue_vue_type_template_id_18c4d261_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Chat_vue_vue_type_template_id_18c4d261_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "18c4d261",
  null
  
)

/* vuetify-loader */





_node_modules_vuetify_loader_lib_runtime_installComponents_js__WEBPACK_IMPORTED_MODULE_4___default()(component, {VBtn: vuetify_lib_components_VBtn__WEBPACK_IMPORTED_MODULE_5__["VBtn"],VCard: vuetify_lib_components_VCard__WEBPACK_IMPORTED_MODULE_6__["VCard"],VIcon: vuetify_lib_components_VIcon__WEBPACK_IMPORTED_MODULE_7__["VIcon"],VRow: vuetify_lib_components_VGrid__WEBPACK_IMPORTED_MODULE_8__["VRow"]})


/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Chat.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Chat.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ./resources/js/pages/Chat.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vuetify-loader/lib/loader.js??ref--10-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Chat.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Chat.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chat_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css&":
/*!**********************************************************************************************!*\
  !*** ./resources/js/pages/Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chat_vue_vue_type_style_index_0_id_18c4d261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader!../../../node_modules/css-loader??ref--5-1!../../../node_modules/vue-loader/lib/loaders/stylePostLoader.js!../../../node_modules/postcss-loader/src??ref--5-2!../../../node_modules/vuetify-loader/lib/loader.js??ref--10-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css& */ "./node_modules/style-loader/index.js!./node_modules/css-loader/index.js?!./node_modules/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/postcss-loader/src/index.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Chat.vue?vue&type=style&index=0&id=18c4d261&scoped=true&lang=css&");
/* harmony import */ var _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chat_vue_vue_type_style_index_0_id_18c4d261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chat_vue_vue_type_style_index_0_id_18c4d261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chat_vue_vue_type_style_index_0_id_18c4d261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chat_vue_vue_type_style_index_0_id_18c4d261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_style_loader_index_js_node_modules_css_loader_index_js_ref_5_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_5_2_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chat_vue_vue_type_style_index_0_id_18c4d261_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "./resources/js/pages/Chat.vue?vue&type=template&id=18c4d261&scoped=true&":
/*!********************************************************************************!*\
  !*** ./resources/js/pages/Chat.vue?vue&type=template&id=18c4d261&scoped=true& ***!
  \********************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chat_vue_vue_type_template_id_18c4d261_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vuetify-loader/lib/loader.js??ref--10-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Chat.vue?vue&type=template&id=18c4d261&scoped=true& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vuetify-loader/lib/loader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Chat.vue?vue&type=template&id=18c4d261&scoped=true&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chat_vue_vue_type_template_id_18c4d261_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vuetify_loader_lib_loader_js_ref_10_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Chat_vue_vue_type_template_id_18c4d261_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);