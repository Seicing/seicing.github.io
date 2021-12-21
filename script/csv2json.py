import sys
import csv
import json

if len(sys.argv) < 2:
    print("Need a file path.")
    exit(0)

def read_csv(p):
    f = open(p, encoding='gbk')
    r = csv.DictReader(f)

    rows = [row_dct for row_dct in r]
    rows = [dict([(k, item) for k, item in row.items() if item]) for row in rows]

    f.close()

    return rows

def write_json(p, d):
    f = open(p, 'w', encoding='utf-8')
    c = json.dumps(d, indent=4, ensure_ascii=False)
    f.write(c)
    f.close()

def handle_unit(u, ks):
    for k in ks:
        if k not in u:
            u[k] = ''
            continue

        v = u[k]
        v = v.replace('\n', '<br>')
        v = v.replace('【', "<span class='dnfde'>")
        v = v.replace('】', '</span>')
        u[k] = v

path = sys.argv[1]
data = read_csv(path)
keys = []

for k in data[0]:
    keys.append(k)

data.remove(data[0])

for v in data:
    handle_unit(v, keys)

write_json('title.json', data)