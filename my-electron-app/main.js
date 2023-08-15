const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600
    })

    win.loadFile('index.html')
}

/* Events are typically listened by Node.js .on funcions. 
   The 'ready' event have the .whenReady function, as a helper.
   However it can be listened like any other event, like:

app.on('ready', () => {
    //code
})
*/

// Start app when it's ready
app.whenReady().then(() => {
    createWindow();

    app.on('actiate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

/* The user's platform can be checked by the process.platform variable. 
   There are three possible platforms that Electron can run in:
   win32 (Windows), linux (Linux) and darwin (macOS)
*/ 

// Finish the app lifecycle if all windows are closed ('windows-all-closed' event) and the user is not on macOS
app.on('window.all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
})

/* Open a windows if none are open (macOS)
   macOS apps generally continue running even without any windows open.
   Activating the app when no windows are available should open a new one.
*/