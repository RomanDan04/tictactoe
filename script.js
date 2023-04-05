var numClick = 0;//memorizeaza numarul de click-uri pentru a afla ce sa pun urmatorul(x/o)
var icon;//memorizeaza div-ul cu iconita de afisat

var matrix = [];//memorizeaza matricea cu elementele din tabel(tabel bidimensional)
for (var i = 0; i < 3; i++) {
    matrix[i] = new Array(3);
}

//functia afiseaza iconita in functie de ordinea de mers al jucatorilor dupa click
function selCell(ell) {
    if (!ell.getElementsByClassName('show')[0]) {//verifica daca in celula nu se afla deja o iconita
        numClick++;//incrementam numarul de clickuri
        if (numClick % 2 == 1) {//daca numarul de clickuri e impar atunci vom afisa iconita cu "x"
            icon = ell.getElementsByClassName('main__icon')[1];//returnez iconita cu "x"
            ell.setAttribute('data-sell', 'x');//introduc in data-sell "x" ca demonstratie ca celula este ocupata de "x"
            document.getElementsByClassName('walk')[0].innerHTML = 'Mersul jucatorului cu: O';
        } else {//daca numarul de clickuri e impar atunci vom afisa iconita cu "0"
            icon = ell.getElementsByClassName('main__icon')[0];//returnez iconita cu "x"
            ell.setAttribute('data-sell', 'o');//introduc in data-sell "x" ca demonstratie ca celula este ocupata de "o"
            document.getElementsByClassName('walk')[0].innerHTML = 'Mersul jucatorului cu: X';
        }
        icon.classList += ' show';//afisez iconita adaugandu-i clasa show care are in css display:block
        //unul din jucatori poate castiga doar atunci cand a pus macar 3 iconite, deci:
        if (numClick >= 5) {//daca numarul de clickuri este >= cu cinci adica minim 3 iconite de un fel
            checkWinner();//apelez functia care verifica daca a castigat cineva
        }
        if(numClick == 9){
            document.getElementById('space').style.display = 'flex';
            document.getElementsByClassName('popup')[0].innerHTML = 'Equality';
            document.getElementsByClassName('popup')[0].classList.add('show_pop');
        }
    }
}

//functia verifica daca cineva a invins
function checkWinner() {
    console.clear();//pentru teste
    var x = 0;//memorizeaza pozitia celulei de returnat din document
    for (var i = 0; i < 3; i++) {//parcurg fiecare rand
        for (var j = 0; j < 3; j++) {//parcurg fiecare coloana
            matrix[i][j] = document.getElementsByClassName('main__item')[x].dataset.sell;//primesc continutul din celula
            x++;//incrementez pozitia celulei de returnat
            //console.log(i, ',', j, matrix[i][j]);// pentru teste
        }
    }

    //verific invingatorul pe rand
    for (var i = 0; i < 3; i++) {
         //verific daca prima celula din rand cuprinde acelasi simbol ca si urmatoarele si daca nu este nul
        if (matrix[i][0] == matrix[i][1] && matrix[i][0] == matrix[i][2] && matrix[i][0]) {
            document.getElementById('space').style.display = 'flex';//afisez un div peste tabel ca sa nu se mai poata face modificari 
            var ell1 = document.getElementsByClassName('main__item')[i * 3];//primesc prima celula pentru a crea linia
            var ell2 = document.getElementsByClassName('main__item')[i * 3 + 2];//primesc ultima celula pentru a crea linia
            var angle = 0;//valoarea de inclinare a liniei
            draw(ell1, ell2, angle);//functia care deseneaza linia
            setTimeout(() => {//afisez alertul peste 100ms
                document.getElementsByClassName('popup')[0].innerHTML = 'winner: ' + matrix[i][0];
                document.getElementsByClassName('popup')[0].classList.add('show_pop');
            }, 100);
            return;//ies din program fiindca am gasit castigatorul
        }
    }

    //verific invingatorul pe coloana
    for (var j = 0; j < 3; j++) {
        //verific daca prima celula din coloana cuprinde acelasi simbol ca si urmatoarele si daca nu este nul
        if (matrix[0][j] == matrix[1][j] && matrix[0][j] == matrix[2][j] && matrix[0][j]) {
            document.getElementById('space').style.display = 'flex';//afisez un div peste tabel ca sa nu se mai poata face modificari
            var ell1 = document.getElementsByClassName('main__item')[j];//primesc prima celula pentru a crea linia
            var ell2 = document.getElementsByClassName('main__item')[j + 6];//primesc ultima celula pentru a crea linia
            var angle = 90;//valoarea de inclinare a liniei
            draw(ell1, ell2, angle);//functia care deseneaza linia
            setTimeout(() => {//afisez alertul peste 100ms
                document.getElementsByClassName('popup')[0].innerHTML = 'winner: ' + matrix[0][j];
                document.getElementsByClassName('popup')[0].classList.add('show_pop');
            }, 100);
            return;//ies din program fiindca am gasit castigatorul
        }
    }

    //verfic invingatorul pe diagonala mica
    if (matrix[0][0] == matrix[1][1] && matrix[0][0] == matrix[2][2] && matrix[0][0]) {
        document.getElementById('space').style.display = 'flex';//afisez un div peste tabel ca sa nu se mai poata face modificari
        var ell1 = document.getElementsByClassName('main__item')[0];//primesc prima celula pentru a crea linia
        var ell2 = document.getElementsByClassName('main__item')[8];//primesc ultima celula pentru a crea linia
        var angle = 45;//valoarea de inclinare a liniei
        draw(ell1, ell2, angle);//functia care deseneaza linia
        setTimeout(() => {
            document.getElementsByClassName('popup')[0].innerHTML = 'winner: ' + matrix[0][0];
            document.getElementsByClassName('popup')[0].classList.add('show_pop');
        }, 100);
        return;//ies din program fiindca am gasit castigatorul
    }

    //verific invingatorul pe diagonala mare
    if (matrix[0][2] == matrix[1][1] && matrix[0][2] == matrix[2][0] && matrix[0][2]) {
        document.getElementById('space').style.display = 'flex';//afisez un div peste tabel ca sa nu se mai poata face modificari
        var ell1 = document.getElementsByClassName('main__item')[2];//primesc prima celula pentru a crea linia
        var ell2 = document.getElementsByClassName('main__item')[6];//primesc ultima celula pentru a crea linia
        var angle = 135;//valoarea de inclinare a liniei
        draw(ell1, ell2, angle);//functia care deseneaza linia
        setTimeout(() => {
            document.getElementsByClassName('popup')[0].innerHTML = 'winner: ' + matrix[0][2];
            document.getElementsByClassName('popup')[0].classList.add('show_pop');
        }, 100);
        return;//ies din program fiindca am gasit castigatorul
    }
}

//functia ce deseneaza linia, parametri(div1 -> div2 si unghiul de inclinare a liniei)
function draw(div1, div2, angle) {
    off1 = getOffset(div1);//primesc pozitia div-ului(x,y,width,height)
    off2 = getOffset(div2);//primesc pozitia div-ului(x,y,width,height)

    //primul punct
    var x1 = off1.left + off1.width / 2;//returnez centrul div-ului pe axa x
    var y1 = off1.top + off1.height / 2;//returnez centrul div-ului pe axa y
    
    //al doilea punct
    var x2 = off2.left + off2.width / 2;//returnez centrul div-ului pe axa x pentru al doilea punct
    var y2 = off2.top + off2.height / 2;//returnez centrul div-ului pe axa x pentru al doilea punct
    
    //calculez lungimea liniei (chiar si daca la scadere se primeste minus dupa putere tot ok:))
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));

    //obtin punctul de centru de pe linia dintre doua celule pentru a putea roti linia
    var cx = ((x1 + x2) / 2 - length / 2);
    var cy = ((y1 + y2) / 2);

    var line = document.getElementsByClassName('line')[0];//returnez div-ul cu care coi lucra
    line.style.width = length+'px';//dau lungimea liniei
    line.style.top = cy+'px';//dau pozitia liniei pe axa y
    line.style.left = cx+'px';//dau pozitia liniei pe axa x
    line.style.transform = 'rotate('+angle+'deg)';//inclin linia in functie de valoarea obtinuta
}


//functia returneaza caracteristicile div-ului (primeste ca parametru div-ul)
function getOffset(el) {
    var rect = el.getBoundingClientRect();
    return {
        left: rect.left + window.pageXOffset,
        top: rect.top + window.pageYOffset,
        width: rect.width || el.offsetWidth,
        height: rect.height || el.offsetHeight
    };
}

//functia restabileste tabela la starea initiala pentru ca joaca sa inceapa din nou
function refresh() {
    while (document.getElementsByClassName('show')[0]) {
        var elements = document.getElementsByClassName('show')[0];
        elements.classList.remove('show');
        elements.parentNode.removeAttribute('data-sell');
    }
    numClick = 0;
    document.getElementById('space').style.display = 'none';
    document.getElementsByClassName('walk')[0].innerHTML = 'Mersul jucatorului cu: X';
    document.getElementsByClassName('popup')[0].classList.remove('show_pop');
    document.getElementsByClassName('line')[0].style.width = 0;
}