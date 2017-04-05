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
            label: 'About ' + packageInfo.name,
            click: () => {
              window.electron.shell.openExternal(packageInfo.homepage)
            }
          }, {
            label: 'Quit',
            role: 'quit'
          }
        ]
      }, {
        label: 'Files',
        submenu: [
          {
            label: 'Import Songs',
            accelerator: 'Ctrl+Shift+I',
            click: () => {
              fileImporter.selectLocalFiles()
            }
          }, {
            label: 'Clear Songs',
            accelerator: 'Ctrl+Shift+C',
            click: () => {
              confirm('Sure to remove all of the songs?') && player.clear()
            }
          }
        ]
      }, {
        label: 'Play',
        submenu: [
          {
            label: 'Play / Pause',
            accelerator: 'Ctrl+Shift+Space',
            click: () => {
              player.toggle()
            }
          }, {
            label: 'Play Next',
            accelerator: 'Ctrl+Shift+Right',
            click: () => {
              player.next()
            }
          }, {
            label: 'Play Previous',
            accelerator: 'Ctrl+Shift+Left',
            click: () => {
              player.prev()
            }
          }, {
            type: 'separator'
          }, {
            label: 'Toggle Mute',
            accelerator: 'Ctrl+Shift+M',
            click: () => {
              player.toggleMuted()
            }
          }, {
            type: 'separator'
          }, {
            label: 'Loop Mode',
            submenu: [
              {
                label: 'List',
                accelerator: 'Ctrl+Shift+L',
                click: () => {
                  player.loopMode(1)
                }
              }, {
                label: 'Single',
                accelerator: 'Ctrl+Shift+S',
                click: () => {
                  player.loopMode(2)
                }
              }, {
                label: 'Shuffle',
                accelerator: 'Ctrl+Shift+R',
                click: () => {
                  player.loopMode(3)
                }
              }
            ]
          }
        ]
      }, {
        label: 'Window',
        submenu: [
          {
            role: 'minimize'
          }, {
            role: 'resetzoom'
          }, {
            role: 'close'
          }
        ]
      }
    ]

    if (process && process.env.NODE_ENV === 'development') {
      menuTemplate[1].submenu.push({
        type: 'separator'
      }, {
        label: 'Dev Tools',
        role: 'toggledevtools'
      }, {
        label: 'Reload',
        role: 'reload'
      }, {
        label: 'Force Reload',
        role: 'forcereload'
      })
    }

    Menu.setApplicationMenu(Menu.buildFromTemplate(menuTemplate))

  }

}
