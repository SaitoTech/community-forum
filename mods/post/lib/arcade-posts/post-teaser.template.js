
module.exports = PostTeaserTemplate = (app, mod, tx) => {

  let cmt = "0 comments";
  if (tx.children == 1) { cmt = "1 comment"; }
  if (tx.children > 1)  { cmt = (tx.children+" comments"); }

  let img = tx.msg?.images[0] || '/post/img/post-logo.png';
  
  const html = `
    <div data-id="${tx.id}" id="arcade-post" class="arcade-post">
      <div class="arcade-post-front">
        <div id="arcade-post-thumbnail" class="arcade-post-thumbnail tip"><img class="identicon" src="${app.keys.returnIdenticon(tx.transaction.from[0].add)}"/><div class="tiptext">${app.browser.returnAddressHTML(tx.transaction.from[0].add)}</div></div>
      </div>
      <div class="arcade-post-back">
        <div class="arcade-post-header">
          <div data-id="${tx.id}" id="arcade-post-title" class="arcade-post-title">${tx.msg.title}</div>
        </div>
        <div id="arcade-post-sublinks"  class="arcade-post-sublinks">
          <div id="arcade-post-posted-by" class="arcade-post-posted-by">posted by</div>
          <div id="arcade-post-user" class="arcade-post-user">${app.keys.returnUsername(tx.transaction.from[0].add)}</div>
          <div data-id="${tx.id}" id="arcade-post-comments" class="arcade-post-comments">${cmt}</div>
        </div>
      </div>
    </div>

  `;

  return html;

}



