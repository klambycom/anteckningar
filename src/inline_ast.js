//150

import marked from 'marked';

function escape(html, encode) {
  return html
    .replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// This should probebly be called tokens. Because I don't think you can call it
// a AST. I don't know anythin about compilers.

marked.InlineLexer.prototype.outputLink = function(cap, link) {
  var href = escape(link.href)
    , title = link.title ? escape(link.title) : null;

  if (cap[0].charAt(0) !== '!') {
    return { type: 'link', href, title, children: this.output(cap[1]) };
  }

  return { type: 'image', href, title, text: escape(cap[1]) };
};

marked.InlineLexer.prototype.output = function(src) {
  let tokens = [];

  var out = ''
    , link
    , text
    , href
    , cap;

  while (src) {
    // TODO
    // escape
    if (cap = this.rules.escape.exec(src)) {
      console.error('TODO escape');
      src = src.substring(cap[0].length);
      //out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = cap[1].charAt(6) === ':'
          ? this.mangle(cap[1].substring(7))
          : this.mangle(cap[1]);
        href = this.mangle('mailto:') + text;
      } else {
        text = escape(cap[1]);
        href = text;
      }
      tokens.push({ type: 'autolink', href, text, title: '' });
      continue;
    }

    // url (gfm)
    if (!this.inLink && (cap = this.rules.url.exec(src))) {
      src = src.substring(cap[0].length);
      text = escape(cap[1]);
      href = text;
      tokens.push({ type: 'url', href, text, title: '' });
      continue;
    }

    // tag
    // TODO Other type of tags maybe? <!-- tag: tag1, tag2, tag3 -->
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      tokens.push({
        type: 'tag',
        code: this.options.sanitize
          ? this.options.sanitizer
            ? this.options.sanitizer(cap[0])
            : escape(cap[0])
          : cap[0]
      });
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      tokens.push(this.outputLink(cap, {
        href: cap[2],
        title: cap[3]
      }));
      this.inLink = false;
      continue;
    }

    // TODO
    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      console.error('TODO reflink, nolink');
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({ type: 'strong', children: this.output(cap[2] || cap[1]) });
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({ type: 'em', children: this.output(cap[1] || cap[2]) });
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({ type: 'inline_code', code: escape(cap[2]) });
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({ type: 'br' });
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({ type: 'del', children: this.output(cap[1]) });
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      tokens.push({ type: 'basic_text', text: escape(this.smartypants(cap[0])) });
      continue;
    }

    if (src) {
      throw new
        Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  return tokens;
};

// TODO What is links?????!!!
export default function (links, data) {
  let inlineLexer = new marked.InlineLexer(links);
  return inlineLexer.output(data);
};
