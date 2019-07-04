var year = document.getElementById('FY');

var fin = year.getElementsByTagName('input');

for (var i=0, len=fin.length; i<len; i++) {
    if (fin[i].type === 'checkbox') {
        fin[i].onclick = function() {
            console.log('A check box has been checked:' + fin[i].value);
        }
    }
    
}