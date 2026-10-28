"""Static release checks. Run with Python 3 (standard library only)."""
from pathlib import Path
from html.parser import HTMLParser
from urllib.parse import urlsplit, unquote
import json, re, xml.etree.ElementTree as ET
root = Path(__file__).resolve().parents[1]
base = 'https://evangelism.saulspodship.com'
class Page(HTMLParser):
    def __init__(self, text):
        super().__init__(); self.tags=[]; self.feed(text)
    def handle_starttag(self, tag, attrs): self.tags.append((tag, dict(attrs)))
pages = [root/'index.html', *sorted((root/'library').glob('*.html'))]
titles=set(); descriptions=set(); urls=set()
for path in pages:
    text=path.read_text(); page=Page(text)
    title=re.search(r'<title>(.*?)</title>',text).group(1)
    assert title not in titles; titles.add(title)
    meta={a.get('name',a.get('property')):a.get('content') for t,a in page.tags if t=='meta'}
    assert meta['description'] not in descriptions; descriptions.add(meta['description'])
    for key in ['og:title','og:description','og:url','og:image','og:image:alt','twitter:title','twitter:description','twitter:image']: assert meta.get(key), (path,key)
    canonical=next(a['href'] for t,a in page.tags if t=='link' and a.get('rel')=='canonical')
    assert canonical.startswith(base+'/'); assert meta['og:url']==canonical; urls.add(canonical)
    assert 'Evangelism is a product and property of Saul’s Podship' in text
    assert text.count('<h1')==1, path
    for data in re.findall(r'<script type="application/ld\+json">(.*?)</script>',text,re.S): json.loads(data)
    for tag,a in page.tags:
        if tag=='img': assert 'alt' in a, path
        url=a.get('href') if tag=='a' else a.get('src') if tag in ['script','img'] else None
        if not url or url.startswith(('#','mailto:','tel:')) or urlsplit(url).netloc: continue
        local=unquote(urlsplit(url).path)
        target=(root/local.lstrip('/')) if local.startswith('/') else path.parent/local
        assert target.exists(), (path,url)
site=ET.parse(root/'sitemap.xml')
assert {n.text for n in site.findall('.//{*}loc')}==urls
assert base+'/sitemap.xml' in (root/'robots.txt').read_text()
text=(root/'index.html').read_text()
assert all(slug+'.saulspodship.com/' in text for slug in ['biblicallanguages','saulssundayschool','evangelism','biblicalcosmos3d','biblicalnumerologyandetymology','faithconnectpro'])
print(f'PASS: {len(pages)} pages; unique metadata, sharing tags, canonical URLs, ownership, JSON-LD, headings, alt attributes, local links, sitemap and app directory.')
