import os
import time
import sys
import shutil
from os.path import realpath, dirname, normpath

def sync(path_a, path_b):
    is_file_a = os.path.isfile(path_a)
    is_file_b = os.path.isfile(path_b)
    is_dir_a = os.path.isdir(path_a)
    is_dir_b = os.path.isdir(path_b)
    print(path_a)

    if is_file_a:
        if is_dir_b:
            shutil.rmtree(path_b, True)
        
        if is_file_b:
            time_a = os.stat(path_a).st_mtime
            time_b = os.stat(path_b).st_mtime
            
            if time_a != time_b:
                shutil.copy2(path_a, path_b)
        else:
            shutil.copy2(path_a, path_b)
    elif is_dir_a:
        if is_file_b:
            os.remove(path_b)
        
        if is_dir_b:
            list_a = os.listdir(path_a)
            list_b = os.listdir(path_b)
            list_merger = list(set(list_a + list_b))

            for path in list_merger:
                sync(path_a + "/" + path, path_b + "/" + path)
        else:
            shutil.copytree(path_a, path_b)
    else:
        if is_dir_b:
            shutil.rmtree(path_b, True)
        elif is_file_b:
            os.remove(path_b)

if len(sys.argv) < 2:
    print("Need a path for pasting.")
    exit(-1)

path_a = dirname(realpath(__file__))[:-6] # split 'script'
path_b = normpath(sys.argv[1])
pass_set = {"build", "pool", "seicing.coding.me"}

for i in os.listdir(path_a):
    if i not in pass_set:
        sync(path_a + i, path_b + "/" + i)
