import os
import sys
import json

def get_data(path):
    print(path)
    f = open(path, encoding='utf-8')
    c = f.read()
    f.close()

    return json.loads(c)

def export(path):
    data = []

    for root, dirs, files in os.walk(path):
            for f in files:
                if f[-5:] == '.json':
                    data.append(get_data(root + '/' + f))
    
    f = open(path + '.json', 'w', encoding='utf-8')
    c = json.dumps(data, indent=4, ensure_ascii=False)
    f.write(c)
    f.close()

export(sys.argv[1])
