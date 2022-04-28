
module.exports = PostViewTemplate = (app, mod, sig) => {

  let tx = null;
  for (let i = 0; i < mod.posts.length; i++) {
    if (sig === mod.posts[i].id) { tx = mod.posts[i]; }
  }
  for (let i = 0; i < mod.forums.length; i++) {
    if (sig === mod.forums[i].id) { tx = mod.forums[i]; }
  }
  if (tx == null) { throw new Error("Unable to find post"); }

  // from timestamp to friendly time
  const time =  datetimeRelative(tx.transaction.ts);
  const avatar = app.keys.returnIdenticon(tx.transaction.from[0].add);
  const username = app.keys.returnUsername(tx.transaction.from[0].add);
  
  const title = tx.msg.title;
  const text = tx.msg.comment; 
  //console.log("TITLE:"+title,"TEXT:"+text);

  let edit = "";
  if (tx.transaction.from[0].add === app.wallet.returnPublicKey()) {
    edit = `<div data-id="${sig}" id="post-view-edit" class="post-view-edit">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                <path fill-rule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clip-rule="evenodd" />
              </svg>
              edit
            </div>`;
  }
  let post_view_actions = `
      <div class="post-view-actions">
        ${edit}
        <div data-id="${sig}" id="post-view-report-${sig}" class="post-view-report">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          report
        </div>
      </div>
  `;

  let linkHTML = `
        <div id="post-view-url" class="post-view-url">
          <a target="_blank" href="${tx.msg.link}">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
            </svg> 
            ${tx.msg.link}
          </a>
        </div>`;

  let html = `
  <div id="post-view-container" class="post-view-container">
    <div id="post-view-overview" class="post-view-overview">
      ${(tx.msg.link)?"":post_view_actions}
      <div class="post-header">
        <div class="post-user-avatar">
          <img src="${avatar}" class="post-view-user-identicon" />
        </div>
        <div class="post-details">
          <div id="post-view-user" class="post-view-user">${username}</div>
          <div id="post-view-ts" class="post-view-ts">${time}</div>
        </div>
      </div>
  `;
  if (!text) {
    html += `<h2 class="post-view-title">${tx.msg.title}</h2>`;
  }
  if (tx.msg.link != "") {
    html = `
    <div id="post-view-container" class="post-view-container">
      <div id="post-view-overview" class="post-view-overview">
        <div class="post-header">
          <div class="post-user-avatar">
            <img src="${avatar}" class="post-view-user-identicon" />
          </div>
          <div class="post-details">
            <div id="post-view-user" class="post-view-user">${username}</div>
            <div id="post-view-ts" class="post-view-ts">${time}</div>
          </div>
        </div>
        <h2 class="post-view-title">${tx.msg.title}</h2>
        <div id="post-view-url" class="post-view-url"><a target="_blank" href="${tx.msg.link}"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
        </svg> ${tx.msg.link}</a></div>
    `;
  }

  //In case we need a few seconds to load the images  
  let filler = (text)? text: '<div class="post-loader-spinner loader" id="post-loader-spinner"></div>';

  html += `<div data-id="${sig}" id="post-view-parent-comment" class="post-view-parent-comment">${filler}</div>`;


  if (tx.msg.images && tx.msg.images.length > 0) {
      html += '<div id="post-view-gallery" class="post-view-gallery">';
      for (let i = 0; i < tx.msg.images.length; i++) {
      	html += `<img class="post-view-gallery-image" src="${tx.msg.images[i]}" />`;
      }
      html += '</div>';
  } 
  html += "</div>";

  let spinner = (tx.children >= 1)? '<div class="post-loader-spinner loader" id="post-loader-spinner"></div>': "";
  html += `
    <hr />
    <div id="post-view-comments" class="post-view-comments">${spinner}</div>
    <div id="post-view-leave-comment" class="post-view-leave-comment">
      <div id="comment-create" class="post-view-textarea markdown medium-editor-element" placeholder="Your post..." contenteditable="true" spellcheck="true" data-medium-editor-element="true" role="textbox" aria-multiline="true" data-medium-editor-editor-index="1" medium-editor-index="37877e4c-7415-e298-1409-7dca41eed3b8"></div>
      <div id="post-create-image-preview-container" class="post-create-image-preview-container"></div>

      <button class="post-submit-btn">Comment</button>
    </div>
  </div>
  `;

  return html;
}

