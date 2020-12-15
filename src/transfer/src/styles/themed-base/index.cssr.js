import { c, cTB, cB, cE, cM, createKey } from '../../../../_utils/cssr'
import { depx, pxfy } from 'seemly'
import animationStyle from './animation.cssr.js'
import fadeInTransition from '../../../../_styles/transitions/fade-in.js'

export default c([
  ({ props }) => {
    const {
      $local,
      $global: {
        cubicBezierEaseInOut,
        cubicBezierEaseIn,
        cubicBezierEaseOut,
        fontWeightStrong
      }
    } = props
    const {
      width,
      borderRadius,
      borderColor,
      listColor,
      headerColor,
      headerTextColor,
      headerTextColorDisabled,
      headerExtraTextColor,
      filterBorderColor,
      itemTextColor,
      itemColorPending,
      itemTextColorDisabled,
      extraFontSize
    } = $local
    return [
      animationStyle,
      cTB('transfer', {
        display: 'flex',
        width
      }, [
        ['small', 'medium', 'large'].map(size => {
          const {
            [createKey('itemHeight', size)]: height,
            [createKey('fontSize', size)]: fontSize
          } = $local
          return [
            c(`@keyframes transfer-height-collapse--${size}`, {
              raw: `
                0% {
                  max-height: ${height};
                }
                100% {
                  max-height: 0;
                }
              `
            }),
            c(`@keyframes transfer-height-expand--${size}`, {
              raw: `
                0% {
                  max-height: 0;
                }
                100% {
                  max-height: ${height};
                }
              `
            }),
            cM(size + '-size', [
              cM('filterable', [
                cB('transfer-list', [
                  cB('transfer-list-body', {
                    height: pxfy(depx(height) * 5.6 + 45)
                  })
                ])
              ]),
              cB('transfer-list', [
                cB('transfer-list-header', {
                  fontSize,
                  height: pxfy(depx(height) + 4)
                }),
                cB('empty', {
                  fontSize
                }),
                cB('transfer-list-body', {
                  height: pxfy(depx(height) * 5.6)
                }, [
                  cB('transfer-list-item', {
                    fontSize,
                    height,
                    maxHeight: height
                  }, [
                    cM('source', [
                      c('&.item-enter-active', {
                        animationName: `transfer-height-expand--${size}, transfer-slide-in-from-right`
                      }),
                      c('&.item-leave-active', {
                        animationName: `transfer-height-collapse--${size}, transfer-slide-out-to-right`
                      })
                    ]),
                    cM('target', [
                      c('&.item-enter-active', {
                        animationName: `transfer-height-expand--${size}, transfer-slide-in-from-left`
                      }),
                      c('&.item-leave-active', {
                        animationName: `transfer-height-collapse--${size}, transfer-slide-out-to-left`
                      })
                    ])
                  ])
                ])
              ])
            ])
          ]
        }),
        cB('transfer-list', {
          backgroundClip: 'padding-box',
          width: 'calc(50% - 36px)',
          position: 'relative',
          transition: `background-color .3s ${cubicBezierEaseInOut}`,
          borderRadius,
          backgroundColor: listColor
        }, [
          cB('virtual-scroller', {
            height: '100%',
            scrollbarWidth: 'none',
            '-moz-scrollbar-width': 'none'
          }, [
            c('&::-webkit-scrollbar', {
              width: 0,
              height: 0
            })
          ]),
          cE('border-mask', {
            border: `1px solid ${borderColor}`,
            transition: `border-color .3s ${cubicBezierEaseInOut}`,
            pointerEvents: 'none',
            borderRadius,
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }),
          cB('transfer-list-header', {
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            backgroundClip: 'padding-box',
            borderTopLeftRadius: borderRadius,
            borderTopRightRadius: borderRadius,
            backgroundColor: headerColor,
            transition: `
              border-color .3s ${cubicBezierEaseInOut},
              background-color .3s ${cubicBezierEaseInOut}
            `
          }, [
            cE('checkbox', {
              display: 'flex',
              alignItems: 'center',
              position: 'relative',
              padding: '0 9px 0 14px'
            }),
            cE('header', {
              flex: 1,
              lineHeight: 1,
              fontWeight: fontWeightStrong,
              transition: `color .3s ${cubicBezierEaseInOut}`,
              color: headerTextColor
            }, [
              cM('disabled', {
                color: headerTextColorDisabled
              })
            ]),
            cE('extra', {
              transition: `color .3s ${cubicBezierEaseInOut}`,
              fontSize: extraFontSize,
              justifySelf: 'flex-end',
              marginRight: '14px',
              whiteSpace: 'nowrap',
              color: headerExtraTextColor
            })
          ]),
          cB('transfer-list-body', {
            raw: `
              box-sizing: border-box;
              overflow: hidden;
              position: relative;
              height: 272px;
              display: flex;
              flex-direction: column;
            `,
            borderBottomRightRadius: borderRadius,
            borderBottomLeftRadius: borderRadius
          }, [
            cB('transfer-filter', {
              padding: '8px 8px',
              boxSizing: 'border-box',
              transition: `border-color .3s ${cubicBezierEaseInOut}`,
              borderBottom: `1px solid ${filterBorderColor}`
            }),
            cB('transfer-list-flex-container', {
              flex: 1,
              position: 'relative'
            }, [
              cB('scrollbar', {
                raw: `
                  position: absolute;
                  left: 0;
                  right: 0;
                  top: 0;
                  bottom: 0;
                  height: unset;
                `
              }, [
                cB('scrollbar-content', {
                  width: '100%'
                })
              ]),
              cB('empty', {
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translateY(-50%) translateX(-50%)'
              }, [
                fadeInTransition()
              ]),
              cB('transfer-list-content', {
                padding: 0,
                margin: 0,
                position: 'relative'
              }, [
                cM('transition-disabled', [
                  cB('transfer-list-item', {
                    animation: 'none !important'
                  })
                ]),
                cB('transfer-list-item', {
                  transition: `
                    background-color .3s ${cubicBezierEaseInOut},
                    color .3s ${cubicBezierEaseInOut}`,
                  position: 'relative',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  color: itemTextColor
                }, [
                  c('&:hover', {
                    backgroundColor: itemColorPending
                  }),
                  cE('extra', {
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    paddingRight: '4px'
                  }),
                  cE('checkbox', {
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    padding: '0 9px 0 14px'
                  }),
                  cM('disabled', {
                    cursor: 'not-allowed',
                    backgroundColor: 'transparent',
                    color: itemTextColorDisabled
                  }),
                  cM('source', {
                    animationFillMode: 'forwards'
                  }, [
                    c('&.item-enter-active', {
                      raw: `
                        transform: translateX(150%);
                        animation-duration: .25s, .25s;
                        animation-timing-function: ${cubicBezierEaseInOut}, ${cubicBezierEaseOut};
                        animation-delay: 0s, .25s;
                      `
                    }),
                    c('&.item-leave-active', {
                      raw: `
                        transform: translateX(-150%);
                        animation-duration: .25s, .25s;
                        animation-timing-function: ${cubicBezierEaseInOut}, ${cubicBezierEaseIn};
                        animation-delay: .25s, 0s;
                      `
                    })
                  ]),
                  cM('target', {
                    animationFillMode: 'forwards'
                  }, [
                    c('&.item-enter-active', {
                      raw: `
                        transform: translateX(-150%);
                        animation-duration: .25s, .25s;
                        animation-timing-function: ${cubicBezierEaseInOut}, ${cubicBezierEaseOut};
                        animation-delay: 0s, .25s;
                      `
                    }),
                    c('&.item-leave-active', {
                      raw: `
                        transform: translateX(150%);
                        animation-duration: .25s, .25s;
                        animation-timing-function: ${cubicBezierEaseInOut}, ${cubicBezierEaseIn};
                        animation-delay: .25s, 0s;
                      `
                    })
                  ])
                ])
              ])
            ])
          ])
        ]),
        cB('transfer-gap', {
          width: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }),
        cB('button', [
          c('&:first-child', {
            marginBottom: '12px'
          })
        ])
      ])
    ]
  }
])
