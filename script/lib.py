import os
import time
import shutil
import platform
from os.path import realpath, dirname

def make_html(module_content: str, post_content: str):
    title_pos = post_content.find('<!--Title-->')
    content_pos = post_content.find('<!--Content-->')
    list_pos = post_content.find('<!--List-->')
    bottom_pos = post_content.find('<!--Bottom-->')
    head_pos = post_content.find('<!--Head-->')
    tail_pos = post_content.find('<!--Tail-->')

    title_content = post_content[title_pos + 13 : content_pos - 2] #except <!--Title--> and \n
    content_content = post_content[content_pos + 15 : list_pos - 2] #except <!--Content--> and \n
    list_content = post_content[list_pos + 12 : bottom_pos - 2] #except <!--List--> and \n
    bottom_content = post_content[bottom_pos + 13 : head_pos - 2] #except <!--Bottom--> and \n
    head_content = post_content[head_pos + 11 : tail_pos - 2] #except <!--Head--> and \n
    tail_content = post_content[tail_pos + 11 :] #except <!--Tail-->

    module_content = module_content.replace('$Title', title_content)
    module_content = module_content.replace('$Content', content_content)
    module_content = module_content.replace('$List', list_content)
    module_content = module_content.replace('$Bottom', bottom_content)
    module_content = module_content.replace('$Head', head_content)
    module_content = module_content.replace('$Tail', tail_content)

    return module_content

def replace(content: str, char_map: dict):
    for k in char_map:
        content = content.replace(k, char_map[k])
    
    return content

def open_file(path, handle):
    if os.path.basename(path)[0] == '.':
        return

    fd = open(path, 'r+', encoding='utf8')
    content = handle(fd.read(), path)
    fd.seek(0)
    fd.truncate()
    fd.write(content)
    fd.close()

def sync(path_a: str, path_b: str, on_copy=None):
    if path_a.find('.git') > 0 or path_b.find('.git') > 0:
        return

    is_file_a = os.path.isfile(path_a)
    is_file_b = os.path.isfile(path_b)
    is_dir_a = os.path.isdir(path_a)
    is_dir_b = os.path.isdir(path_b)

    if is_file_a:
        if is_dir_b:
            shutil.rmtree(path_b, True)
        
        if is_file_b:
            time_a = os.stat(path_a).st_mtime
            time_b = os.stat(path_b).st_mtime
            
            if time_a != time_b:
                shutil.copy2(path_a, path_b)

                if on_copy is not None:
                    on_copy(path_b)
        else:
            shutil.copy2(path_a, path_b)

            if on_copy is not None:
                on_copy(path_b)
    elif is_dir_a:
        if is_file_b:
            os.remove(path_b)
        
        if is_dir_b:
            list_a = os.listdir(path_a)
            list_b = os.listdir(path_b)
            list_merger = list(set(list_a + list_b))

            for path in list_merger:
                sync(path_a + '/' + path, path_b + '/' + path, on_copy)
        else:
            shutil.copytree(path_a, path_b)

            if on_copy is not None:
                for root, dirs, files in os.walk(path_b):
                    for f in files:
                        on_copy(root + '/' + f)
    else:
        if is_dir_b:
            shutil.rmtree(path_b, True)
        elif is_file_b:
            os.remove(path_b)

def chdir(path):
    if platform.system() == "Windows":
        path = path.replace('/', '\\')
    
    os.chdir(path)

def pull(path, url, root='.'):
    cwd = os.getcwd()

    if os.path.isdir(path):
        chdir(path)
        os.system("git pull origin master")
    else:
        chdir(root)
        os.system("git clone %s" % url)
    
    chdir(cwd)

def push(path, text):
    cwd = os.getcwd()

    chdir(path)
    os.system('git add .')
    os.system('git commit -m %s' % text)
    os.system('git push -u origin master')
    chdir(cwd)

def read_file(path):
    fd = open(path, 'r', encoding='utf8')
    content = fd.read()
    fd.close()

    return content
