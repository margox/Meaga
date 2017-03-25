import player from '@/player'
import fileImporter from '@/helpers/fileImporter'

export default {

  initialize () {

    const { Menu } = window.electron.remote
    const { packageInfo } = window.remoteConfig

    const menuTemplate = [
      {
        label: packageInfo.name,
        submenu: [
          {
            label: '关于' + packageInfo.name,
            click: () => {
              window.electron.shell.openExternal(packageInfo.homepage)
            }
          }, {
            label: '退出',
            role: 'quit'
          }
        ]
      }, {
        label: '文件',
        submenu: [
          {
            label: '导入歌曲',
            accelerator: 'Ctrl+Shift+I',
            click: () => {
              fileImporter.selectLocalFiles()
            }
          }, {
            label: '清除播放列表',
            accelerator: 'Ctrl+Shift+C',
            click: () => {
              confirm('确认清空播放列表吗？这个操作不可撤销') && player.clear()
            }
          }
        ]
      }, {
        label: '播放',
        submenu: [
          {
            label: '播放/暂停',
            accelerator: 'Ctrl+Shift+Space',
            click: () => {
              player.toggle()
            }
          }, {
            label: '播放下一曲',
            accelerator: 'Ctrl+Shift+Right',
            click: () => {
              player.next()
            }
          }, {
            label: '播放上一曲',
            accelerator: 'Ctrl+Shift+Left',
            click: () => {
              player.prev()
            }
          }, {
            type: 'separator'
          }, {
            label: '静音/取消静音',
            accelerator: 'Ctrl+Shift+M',
            click: () => {
              player.toggleMuted()
            }
          }, {
            type: 'separator'
          }, {
            label: '切换播放模式',
            submenu: [
              {
                label: '列表循环',
                accelerator: 'Ctrl+Shift+L',
                click: () => {
                  player.loopMode(1)
                }
              }, {
                label: '单曲循环',
                accelerator: 'Ctrl+Shift+S',
                click: () => {
                  player.loopMode(2)
                }
              }, {
                label: '随机播放',
                accelerator: 'Ctrl+Shift+R',
                click: () => {
                  player.loopMode(3)
                }
              }
            ]
          }
        ]
      }, {
        label: '窗口',
        submenu: [
          {
            label: '最小化窗口',
            role: 'minimize'
          }, {
            label: '关闭窗口',
            role: 'close'
          }
        ]
      }
    ]

    if (window.process.env.NODE_ENV === 'development') {
      menuTemplate[1].submenu.push({
        type: 'separator'
      }, {
        label: '开发者工具',
        role: 'toggledevtools'
      }, {
        label: '重新加载',
        role: 'reload'
      }, {
        label: '强制重新加载',
        role: 'forcereload'
      })
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))

  }

}
