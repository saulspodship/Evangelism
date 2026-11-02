"""Static release checks. Run with Python 3 (standard library only).

Enforces the house standard for every indexable page: a self-referencing
absolute canonical that matches sitemap.xml, unique short titles, unique
120-155 character descriptions, a full Open Graph / Twitter set with a real
>=1200px share image, one <h1>, no dead links, and a declared sitemap.
"""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import html as html_module
import json
import re
import struct
import xml.etree.ElementTree as ET

root = Path(__file__).resolve().parents[1]
base = 'https://evangelism.saulspodship.com'


class Page(HTMLParser):
    def __init__(self, text):
        super().__init__()
        self.tags = []
        self.anchors = []
        self._anchor_text = None
        self.feed(text)

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        self.tags.append((tag, a))
        if tag == 'a':
            self._anchor_text = ''
            self.anchors.append([a, self._anchor_text])

    def handle_data(self, data):
        if self._anchor_text is not None:
            self._anchor_text += data

    def handle_endtag(self, tag):
        if tag == 'a' and self._anchor_text is not None:
            self.anchors[-1][1] = self._anchor_text.strip()
            self._anchor_text = None


def image_size(path):
    """Return (width, height) for a PNG or JPEG using only the stdlib."""
    data = path.read_bytes()
    if data[:8] == b'\x89PNG\r\n\x1a\n':
        return struct.unpack('>II', data[16:24])
    if data[:2] == b'\xff\xd8':
        i = 2
        while i + 9 < len(data):
            if data[i] != 0xff:
                i += 1
                continue
            marker = data[i + 1]
            i += 2
            if marker in (0xd8, 0xd9, 0x01) or 0xd0 <= marker <= 0xd7:
                continue
            length = struct.unpack('>H', data[i:i + 2])[0]
            if marker in range(0xc0, 0xc4) or marker in range(0xc5, 0xc8) \
                    or marker in range(0xc9, 0xcc) or marker in range(0xcd, 0xd0):
                height, width = struct.unpack('>HH', data[i + 3:i + 7])
                return width, height
            i += length
    raise AssertionError(f'cannot read image dimensions: {path}')


pages = [root / 'index.html', *sorted((root / 'library').glob('*.html'))]
titles = set()
descriptions = set()
canonicals = set()

for path in pages:
    text = path.read_text()
    page = Page(text)
    expected = base + ('/' if path.name == 'index.html' and path.parent == root
                       else '/library/' if path.name == 'index.html'
                       else '/library/' + path.name)

    # --- canonical -----------------------------------------------------------
    canonical = [a['href'] for tag, a in page.tags
                 if tag == 'link' and a.get('rel') == 'canonical']
    assert len(canonical) == 1, (path, canonical)
    canonical = canonical[0]
    assert canonical == expected, (path, canonical, expected)
    assert canonical.startswith('https://'), (path, canonical)
    canonicals.add(canonical)

    meta = {a.get('name', a.get('property')): html_module.unescape(a.get('content') or '')
            for tag, a in page.tags if tag == 'meta'}

    # --- title / description --------------------------------------------------
    title = html_module.unescape(re.search(r'<title>(.*?)</title>', text).group(1))
    assert 0 < len(title) <= 60, (path, 'title length', len(title), title)
    assert title not in titles, (path, 'duplicate title', title)
    titles.add(title)
    description = meta.get('description', '')
    assert 120 <= len(description) <= 155, (path, 'description length', len(description), description)
    assert description not in descriptions, (path, 'duplicate description', description)
    descriptions.add(description)

    # --- Open Graph / Twitter -------------------------------------------------
    for key in ['og:title', 'og:type', 'og:url', 'og:image', 'og:site_name',
                'og:description', 'og:image:alt', 'twitter:card',
                'twitter:title', 'twitter:description', 'twitter:image']:
        assert meta.get(key), (path, key)
    assert meta['og:url'] == canonical, (path, 'og:url')
    assert meta['twitter:card'] == 'summary_large_image', (path, 'twitter:card')
    assert 0 < len(meta['twitter:description']) <= 155, (path, 'twitter:description length')
    for key in ['og:image', 'twitter:image']:
        url = meta[key]
        assert url.startswith(base + '/'), (path, key, url)
        target = root / unquote(urlsplit(url).path).lstrip('/')
        assert target.is_file(), (path, key, target)
        width, _height = image_size(target)
        assert width >= 1200, (path, key, 'image too narrow', width)

    # --- content / links ------------------------------------------------------
    assert 'Evangelism is a product and property of Saul’s Podship' in text
    assert text.count('<h1') == 1, (path, 'h1 count')
    assert 'drive.google.com' not in text, (path, 'dead Google Drive link')
    assert 'PDF' not in text, (path, 'empty PDF call-to-action')
    assert not re.search(r'href="[^"]*index\.html', text), (path, 'non-canonical index.html link')
    assert not re.search(r'href="#?"', text), (path, 'empty anchor href')
    for data in re.findall(r'<script type="application/ld\+json">(.*?)</script>', text, re.S):
        json.loads(data)
    for tag, a in page.tags:
        if tag == 'img':
            assert 'alt' in a, (path, 'img without alt')
        url = a.get('href') if tag == 'a' else a.get('src') if tag in ('script', 'img') else None
        if not url or url.startswith(('#', 'mailto:', 'tel:')) or urlsplit(url).netloc:
            continue
        local = unquote(urlsplit(url).path)
        target = (root / local.lstrip('/')) if local.startswith('/') else path.parent / local
        assert target.exists(), (path, url)
    for a, label in page.anchors:
        assert a.get('href'), (path, 'anchor without href')
        # Icon-only links are fine when they carry an accessible name.
        assert label or a.get('aria-label') or a.get('title'), (path, 'empty anchor')

# --- sitemap / robots / deployment -------------------------------------------
site = ET.parse(root / 'sitemap.xml')
locs = [n.text for n in site.findall('.//{*}loc')]
assert len(locs) == len(set(locs)), 'duplicate sitemap URL'
assert all(loc.startswith(base + '/') for loc in locs), 'non-absolute sitemap URL'
assert set(locs) == canonicals, (set(locs) ^ canonicals)
assert not any(loc.endswith('/library/index.html') for loc in locs), 'redirected alias in sitemap'
robots = (root / 'robots.txt').read_text()
assert f'Sitemap: {base}/sitemap.xml' in robots, 'sitemap not declared in robots.txt'

vercel = json.loads((root / 'vercel.json').read_text())
assert any(r.get('source') == '/library/index.html' and r.get('destination') == '/library/'
           and (r.get('statusCode') == 301 or r.get('permanent') is True)
           for r in vercel.get('redirects', [])), 'missing 301 for /library/index.html'
sw = (root / 'sw.js').read_text()
assert '"./library/"' in sw and '"./library/index.html"' not in sw, 'service worker still caches alias'

text = (root / 'index.html').read_text()
assert all(slug + '.saulspodship.com/' in text for slug in [
    'biblicallanguages', 'saulssundayschool', 'evangelism', 'biblicalcosmos3d',
    'biblicalnumerologyandetymology', 'faithconnectpro'])
print(f'PASS: {len(pages)} pages; canonical URLs match sitemap, unique short titles, '
      '120-155 character descriptions, full OG/Twitter sets with a >=1200px local share '
      'image, one h1, valid JSON-LD, no dead links, 301 alias, robots + sitemap.')
