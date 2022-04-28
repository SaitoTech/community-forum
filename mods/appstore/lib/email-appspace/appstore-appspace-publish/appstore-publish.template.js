module.exports = AppStorePublishTemplate = () => {
  return `
    <link rel="stylesheet" href="/appstore/css/email-appspace.css" />

    <div style="font-size:1.1em;margin-top:20px;">

    <h3>Saito AppStore</h3>

    Launch the <span style="color: var(--saito-red); cursor:pointer;" class="appstore-browse-btn">Saito Appstore</span> to install new applications. Visit our <a style="text-decoration:none" href="https://org.saito.tech/developers">developer center</a> for information on how to build applications, then use the file-uploader below to deploy them to the network once done.

    </div>

    <p></p>

    <div class="appstore-publish-moddrop" id="appstore-publish-moddrop" style="display:block">
      <div id="appstore-publish-moddrop-inside">
       Drag-and-Drop Application ZIP
      </div>
    </div>
    <form id="appstore-publish-form">
      <label style="display:none">or select zip-file from disk: <input id="appstore-publish-module" type="file" /></label>
      <div class="submit-file-btn-box" style="display:none">
        <button type="submit" id="submit-file-btn">SUBMIT</button>
      </div>
    </form>
  `
}
