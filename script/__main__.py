import os
import sys
import lib
import time
import json
import shutil
from os.path import realpath, dirname, abspath

has_pool = '-D' in sys.argv

root = dirname(realpath(__file__))[:-6] # split 'script'
root = root.replace('\\', '/')
lib.chdir(root)

module_map = {
    "base": lib.read_file('module/base.html'),
    "headless": lib.read_file('module/headless.html'),
    "lavivagnar": lib.read_file('module/lavivagnar2.html'),
    "lavivagnar2": lib.read_file('module/lavivagnar2.html'),
    "lavivagnar3": lib.read_file('module/lavivagnar3.html'),
    "lavivagnarlarge": lib.read_file('module/lavivagnarlarge.html'),
    "picture": lib.read_file('module/picture.html'),
    "large": lib.read_file('module/baselarge.html'),
    "book": lib.read_file('module/book.html'),
}

fd = open('config.json', 'r', encoding='utf-8')
config = json.loads(fd.read())
fd.close()
res = config['res']
module = config['module']

head = 'https://seicing.com/'

lib.pull('seicing.coding.me', 'https://e.coding.net/seicing/seicing.coding.me.git')

if not os.path.exists('pool'):
    os.mkdir('pool')

for k in res:
    lib.pull('pool/' + k, res[k]['url'], 'pool')

fd = open('seicing.coding.me/.gitignore', 'w')

for k in res:
    fd.writelines(res[k]['path'] + '\n')

fd.close()

pool_char_map = {}

for k in res:
    pool_char_map['$' + res[k]['path'] + '/'] = res[k]['head']

char_map = {
    '$css': head + 'css',
    '$html': head + 'html',
    '$res': head + 'res',
    '$font': head + 'font',
    '$js': head + 'js'
}

def on_html(content, path):
    path = os.path.dirname(path)
    pos = path.rfind('html') + len('html') + 1
    path = path[pos:]
    key = module[path] if path in module else "base"

    content = lib.make_html(module_map[key], content)
    content = lib.replace(content, pool_char_map)

    return lib.replace(content, char_map)

def on_normal(content, path):
    content = lib.replace(content, pool_char_map)
    
    return lib.replace(content, char_map)

head = root + 'seicing.coding.me/'

if has_pool:
    for k in res:
        lib.sync(res[k]['path'], 'pool/' + k)

lib.sync('css', head + 'css', lambda path: lib.open_file(path, on_normal))
lib.sync('html', head + 'html', lambda path: lib.open_file(path, on_html))
lib.sync('font', head + 'font')
lib.sync('res', head + 'res')
lib.sync('js', head + 'js', lambda path: lib.open_file(path, on_normal))
lib.sync('index.html', head + 'index.html')

now_time = time.strftime('%Y-%m-%d-%H:%M:%S', time.localtime(time.time()))
lib.push('seicing.coding.me', now_time)

if has_pool:
    for k in res:
        lib.push('pool/' + k, now_time)
