import re

f = open('C:/Users/Administrator/Desktop/test.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<dl><dt>Villager</dt></dl>" in line:
        line = line.replace('<dl><dt>Villager</dt></dl>','<b>村民</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "<dl><dt>Military</dt></dl>" in line:
        line = line.replace('<dl><dt>Military</dt></dl>','<b>军事单位</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<dl><dt>Monk</dt></dl>" in line:
        line = line.replace('<dl><dt>Monk</dt></dl>','<b>僧侣</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "<dl><dt>King</dt></dl>" in line:
        line = line.replace('<dl><dt>King</dt></dl>','<b>国王</b>')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<dl><dt><a href=\"/wiki/Villager_(Age_of_Empires_II)\" title=\"Villager (Age of Empires II)\">Villager</a></dt></dl>" in line:
        line = line.replace('<dl><dt><a href=\"/wiki/Villager_(Age_of_Empires_II)\" title=\"Villager (Age of Empires II)\">Villager</a></dt></dl>','<b>村民</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "<dl><dt><a href=\"/wiki/King\" title=\"King\">King</a></dt></dl>" in line:
        line = line.replace('<dl><dt><a href=\"/wiki/King\" title=\"King\">King</a></dt></dl>','<b>国王</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<span class=\"audio-button\" data-src=\"" in line:
        line = line.replace('<span class=\"audio-button\" data-src=\"','<a href=\"javascript:void(0);\" onclick=\"playSound(\'')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "&#58;" in line:
        line = line.replace('&#58;',':')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "\"></span>" in line:
        line = line.replace('\"></span>','\')\"><img src=\"$res/fatcatpool/sound/go.png\" height=\"15\" width=\"15\"></img></a>')
    f2.write(line) 
f.close()
f2.close()
 


f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "<dl><dt><a href=\"/wiki/Monk_(Age_of_Empires_II)\" title=\"Monk (Age of Empires II)\">Monk</a></dt></dl>" in line:
        line = line.replace('<dl><dt><a href=\"/wiki/Monk_(Age_of_Empires_II)\" title=\"Monk (Age of Empires II)\">Monk</a></dt></dl>','<b>僧侣</b>')
    f2.write(line) 
f.close()
f2.close()



f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<b>Move " in line:
        line = line.replace('<b>Move ','<b>移动')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "<b>Select " in line:
        line = line.replace('<b>Select ','<b>选择')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<b>Attack " in line:
        line = line.replace('<b>Attack ','<b>攻击')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "<b>Female " in line:
        line = line.replace('<b>Female ','<b>女性')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "<b>Male " in line:
        line = line.replace('<b>Male ','<b>男性')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "Build</b>" in line:
        line = line.replace('Build</b>','建造</b>')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "Chop</b>" in line:
        line = line.replace('Chop</b>','伐木</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "Farm</b>" in line:
        line = line.replace('Farm</b>','农场</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "Fish</b>" in line:
        line = line.replace('Fish</b>','渔获</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "Forage</b>" in line:
        line = line.replace('Forage</b>','觅食</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "Hunt</b>" in line:
        line = line.replace('Hunt</b>','狩猎</b>')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "Mine</b>" in line:
        line = line.replace('Mine</b>','开矿</b>')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "Repair</b>" in line:
        line = line.replace('Repair</b>','修理</b>')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "&#160;" in line:
        line = line.replace('&#160;',' ')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "/revision/latest?" in line:
        line = line.replace('/revision/latest?','')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "Select 3</b>" in line:
        line = line.replace('Select 3</b>','选择3</b>')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "Select 2</b>" in line:
        line = line.replace('Select 2</b>','选择2</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "Select 1</b>" in line:
        line = line.replace('Select 1</b>','选择1</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "Select 4</b>" in line:
        line = line.replace('Select 4</b>','选择4</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "Move 3</b>" in line:
        line = line.replace('Move 3</b>','移动3</b>')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "Move 2</b>" in line:
        line = line.replace('Move 2</b>','移动2</b>')
    f2.write(line) 
f.close()
f2.close()


f = open('C:/Users/Administrator/Desktop/test2.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test3.txt','w',encoding='utf-8')
for line in f:
    if "Move 1</b>" in line:
        line = line.replace('Move 1</b>','移动1</b>')
    f2.write(line) 
f.close()
f2.close()

f = open('C:/Users/Administrator/Desktop/test3.txt','r',encoding='utf-8')
f2 = open('C:/Users/Administrator/Desktop/test2.txt','w',encoding='utf-8')
for line in f:
    if "Move 4</b>" in line:
        line = line.replace('Move 4</b>','移动4</b>')
    f2.write(line) 
f.close()
f2.close()

file_data = ""
file = r'C:/Users/Administrator/Desktop/test2.txt'

f = open(file,'r',encoding='utf-8')   
for line in f:
    res = re.findall(r"oggcb=.*?\'", line)
    if len(res) > 0:
        line = line.replace(res[0],"ogg\'")
        print(line)
    file_data += line
f.close()

with open(file,"w",encoding="utf-8") as f:
    f.write(file_data)
f.close()