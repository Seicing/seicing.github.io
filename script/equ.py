import os
import sys
import json

def get_name(content: str, pos=0):
    pos = content.find('[name]', pos)
    pos = content.find('`', pos) + 1
    pos2 = content.find('`', pos)
    
    return content[pos:pos2], pos2

def get_explain(content: str, pos=0):
    opos = pos
    pos = content.find('[explain]', pos)

    if pos == -1:
        return '', opos

    pos = content.find('`', pos) + 1
    pos2 = content.find('`', pos)

    return content[pos:pos2], pos2

def get_flavor(content: str, pos=0):
    opos = pos
    pos = content.find('[flavor text]', pos)

    if pos == -1:
        return '', opos

    pos = content.find('`', pos) + 1
    pos2 = content.find('`', pos)

    return content[pos:pos2], pos2

def get_grade(content: str, pos=0):
    pos = content.find('[grade]', pos)
    pos = content.find('\n', pos) + 1
    pos2 = content.find('\n', pos)
    
    return int(content[pos:pos2]), pos2

def get_rarity(content: str, pos=0):
    pos = content.find('[rarity]', pos)

    if pos == -1:
        return None, -1

    pos = content.find('\n', pos) + 1
    pos2 = content.find('\n', pos)
    
    return int(content[pos:pos2]), pos2

def get_icon(content: str, pos=0):
    pos = content.find('[icon]', pos)
    pos = content.find('`', pos) + 1
    pos2 = content.find('`', pos)
    pos3 = content.find('\n', pos2 + 1)
    
    path = content[pos:pos2]
    frame = int(content[pos2 + 1:pos3])

    return path, frame, pos3

def get_layer_variation(content: str, pos=0):
    pos = content.find('[layer variation]', pos)

    if pos == -1:
        return '', pos

    pos = content.find('\n', pos) + 1
    pos2 = content.find('`', pos) + 1
    pos3 = content.find('`', pos2)
    index = content[pos2:pos3]

    return index, pos3

def get_variation(content: str, pos=0):
    pos = content.find('[variation]', pos)
    pos = content.find('\n', pos) + 1
    pos2 = content.find(' ', pos)
    pos3 = content.find('\n', pos2)
    a = int(content[pos:pos2])
    b = int(content[pos2 + 1:pos3])
    a = '0' + str(a) if a < 10 else str(a)
    b = '0' + str(b) if b < 10 else str(b)
    code = a + b

    """
    code_set = set()
    p = pos3

    while True:
        index, p = get_layer_variation(content, p)
        
        if index == '':
            break

        index = index.replace('_', code)
        code_set.add(index)
    
    if len(code_set) == 0:
        return {'body' + code}, pos3
    
    return code_set, pos3
    """

    return code, pos3

def get_custom_animation(content: str, pos=0):
    pos = content.find('[custom animation]', pos)
    pos = content.find('`', pos) + 1
    pos2 = content.find('`', pos)

    return content[pos:pos2], pos2

def get_img_with_ani(path):
    f = open(path)
    c = f.read()
    f.close()

    pos = c.find('[IMAGE]')
    pos = c.find('`', pos) + 1
    pos2 = c.find('`', pos)

    return c[pos:pos2]

def load_to_json(path):
    f = open(path, encoding='utf-8')
    c = f.read()
    f.close()

    name, pos = get_name(c)
    explain, pos = get_explain(c, pos)
    flavor, pos = get_flavor(c, pos)

    if name[:5] == 'name_':
        if pass_empty:
            return
        else:
            name = ''

    if explain.find('basic_explain') > -1:
        if pass_empty:
            return
        else:
            explain = ''

    if flavor.find('flavor_text') > -1:
        if pass_empty:
            return
        else:
            flavor = ''

    grade, pos = get_grade(c, pos)
    icon_path, icon_frame, pos = get_icon(c, pos)
    
    if not is_title:
        code, pos = get_variation(c, pos)
    else:
        ani, pos = get_custom_animation(c, pos)
        dir_path = os.path.dirname(path)
        img = get_img_with_ani(dir_path + '/' + ani)

    rarity, pos = get_rarity(c)
    
    data = {
        'name': name,
        'explain': explain,
        'flavor': flavor,
        'grade': rarity or grade,
        'icon_path': icon_path,
        'icon_frame': icon_frame
    }

    if not is_title:
        data['code'] = code
    else:
        data['img'] = img

    path = path[:-4] + '.json'
    f = open(path, 'w', encoding='utf-8')
    c = json.dumps(data, indent=4, ensure_ascii=False)
    f.write(c)
    f.close()
    print(path)
    # print(name, grade, icon_path, icon_frame, code)

def handle(path):
    try:
        load_to_json(path)
    except BaseException:
        print("error: " + path)

is_title = '-t' in sys.argv
pass_empty = '-p' in sys.argv

if os.path.isdir(sys.argv[1]):
    for root, dirs, files in os.walk(sys.argv[1]):
        for f in files:
            if f[-4:] == '.equ':
                handle(root + '/' + f)
else:
    handle(sys.argv[1])
