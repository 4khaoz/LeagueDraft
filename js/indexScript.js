function exit()
{
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.close();
}

function startFirstPickDraft()
{
    window.location.href = "../html/bluedraft.html";
}

function startSecondPickDraft()
{
    window.location.href = "../html/reddraft.html";
}