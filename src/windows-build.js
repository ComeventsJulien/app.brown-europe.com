const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(outPath, 'electron-tutorial-app-win32-ia32/'),
    outputDirectory: path.join(rootPath, 'builds'),
    authors: 'ComeventsThomas',
    noMsi: true,
    exe: 'electron-tutorial-app.exe',
    setupExe: 'LaDegustationBoxSetup.exe'
  })
}