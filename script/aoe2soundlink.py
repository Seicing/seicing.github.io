import re

f = open('C:/Users/Administrator/Desktop/test.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<b>村民</b>" in line:
        line = line.replace('<b>村民</b>\n','')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "<b>军事单位</b>" in line:
        line = line.replace('<b>军事单位</b>\n','')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<b>僧侣</b>" in line:
        line = line.replace('<b>僧侣</b>\n','')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "<b>国王</b>" in line:
        line = line.replace('<b>国王</b>\n','')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<ul>" in line:
        line = line.replace('<ul>','')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "<li>" in line:
        line = line.replace('<li>','')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<a href=\"javascript:void(0);\" onclick=\"playSound(\'" in line:
        line = line.replace('<a href=\"javascript:void(0);\" onclick=\"playSound(\'','')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "\')\">" in line:
        line = line.replace('\')\">','')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<img src=\"$res/fatcatpool/sound/go.png\" height=\"15\" width=\"15\"></img></a>" in line:
           line = line.replace('<img src=\"$res/fatcatpool/sound/go.png\" height=\"15\" width=\"15\"></img></a>','\n')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "</ul>" in line:
           line = line.replace('</ul>','')
    f2.write(line) 
f.close()
f2.close()

 
f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if " " in line:
           line = line.replace(' ','')
    f2.write(line) 
f.close()
f2.close()

file_data = ""
file = r'C:/Users/Administrator/Desktop/test2.txt'

f = open(file,'r',encoding='utf-8')   
for line in f:
    res = re.findall(r"<b>(.*?)</li>", line)
    if len(res) > 0:
        line = line.replace("<b>" + res[0] + "</li>","")
        print(line)
    file_data += line
f.close()

with open(file,"w",encoding="utf-8") as f:
    f.write(file_data)
f.close()
 
 
 
