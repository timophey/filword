class App_Demo extends React.Component{

    letters = [
        "МИБУДУЩЕЧАСТЬ",
        "ИРПРОГРЕССЛОЕ",
        "ЛВОБОДАПРОШЖЬ",
        "ЛСВРАЖРEАВДАЯ",
        "ИОНЫИЗМГРЕССН",
        "ГУМАНМРАЧНОЕИ",
        "КУЧКАПИТАЛИЗМ",
        "ВТРУДЯЩИЕСЧАС",
        "АРВАРОРГНЯКВТ",
        "КРАБСТВОЙНАЕЬ",
        "ОЭКСПЛУАТАЦИЯ",
        "МКОДРУЖБАКОЛА",
        "МУНИЗМСВЕТЛОЕ",
    ];

    ss = false;
    print_buffer = [];
    shift_buffer = [];
    _switchDelay = 3500;
    _pd = 75;
    _currentWord = 0;
    _wordInterval = 0;
    _f = false;
    // 

    constructor(props){
        super(props);
        this.state = {
            leds: [], // 110 LEDS
        }
        setInterval(this._type.bind(this),this._pd);
        this._wordInterval = setInterval(this.scheduledWord.bind(this),this._switchDelay);
        document.addEventListener('keyup',(function(e){
            if(e.code == 'Space'){
                if(this._wordInterval){ clearInterval(this._wordInterval); this._wordInterval = 0; return; }
                this._wordInterval = setInterval(this.scheduledWord.bind(this),this._switchDelay);
            }
            if(e.code == 'Escape'){
                this._tail();
            }
            if(e.key == 'f'){
                this._f = !this._f;
            }
        }).bind(this))
    }

    scheduledWord(){
        let word = this.words[this._currentWord];
        if(!this._f && this._currentWord % 2 == 0) this.lightsDown();
        this.lightsUp(word,word.length);
        let td = (this._switchDelay) - ((this.print_buffer.length+1) * 1 * this._pd);
        if(!this._f) setTimeout(this._tail.bind(this),td);
        this._currentWord++; if( this._currentWord == this.words.length ) this._currentWord = 0;
        if(this._currentWord % 2) this.scheduledWord();
    }

    lightsDown(){
        this.setState({leds:[]});
        this.print_buffer = [];
        this.shift_buffer = [];
    }

    lightsUp(ls, len){
        let leds = this.state.leds;
        for(let i = 0; i<len; i++){
            let l = ls[i];
            // leds[l] = true;
            if(l===undefined) continue;
            if(l==255 || l==0 && i>0) continue;
            this.print_buffer.push(l);
        }
        // this.setState({leds:leds});
    }
    
    _type(){
        if(this.print_buffer.length == 0) return;
        let leds = this.state.leds;
        let l = this.print_buffer.shift();
        leds[l] = true;
        this.shift_buffer.push(l);
        this.setState({leds:leds});
        console.log(this.shift_buffer.map(n=>+n)); // распечатываем массив из буфера
    }

    _tail(){
        let leds = this.state.leds;
        let l = this.shift_buffer.shift();
        leds[l] = false;
        this.setState({leds:leds});
        if(this.shift_buffer.length > 0){
            setTimeout(this._tail.bind(this),this._pd);
        }
        
    }

    highlightOne(e){
        // подсвечиваем кликнутую точку
        // return;
        let n = e.target.dataset.n;
        this.print_buffer.push(n);

    }

    render(){
        let lines = [];
        let lsrc = this.letters;
        let ll = lsrc[0].length; // line length
        for(let i in lsrc){
            let strings = [];
            for(let j in lsrc[i]){
                let char  = lsrc[i][j];
                let L = ll * i + +j;
                if(Math.floor(L / ll) % 2 > 0) L = (Math.floor(L / ll)+1)*ll - (L % ll + 1);
                let cl = (!!this.state.leds[L])?'light':'';
                // let n = i*
                strings.push(<span className={cl} data-n={L} onClick={this.highlightOne.bind(this)}>{char}</span>);
            }
            lines.push(<li>{strings}</li>)
        }
        return <ul className="qlocktwo__letters text-left">
            {lines}
        </ul>
    }

    words = [
        [0, 1, 24], // мир
        [123, 122, 121, 120, 119], // война
        [17, 8, 9, 10, 11, 12, 13], // счастье
        [112, 95, 94, 93, 92, 91, 116, 117, 118], // несчастье
        [0, 25, 26, 51, 52, 53, 54, 55], // миллионы
        [78, 79, 80, 81, 82], // кучка
        [102, 101, 100, 99, 98, 97, 96, 95, 94, 113], // трудящиеся
        [131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142], // эксплуатация
        [2, 3, 4, 5, 6, 7, 18], // будущее
        [33, 34, 35, 36, 15, 14, 13], // прошлое
        [162, 163, 164, 165, 166, 167, 168], // светлое
        [72, 71, 70, 69, 68, 67, 66], // мрачное
        [129, 130, 155, 156, 157, 158, 159, 160, 161], // коммунизм
        [81, 82, 83, 84, 85, 86, 87, 88, 89, 90], // капитализм
        [23, 22, 21, 20, 19, 18, 17, 16], // прогресс
        [45, 44, 59, 60, 61, 62, 63], // регресс
        [152, 151, 150, 149, 148, 147], // дружба
        [49, 48, 47, 46, 31, 32], // вражда
        [33, 34, 43, 42, 41, 40], // правда
        [15, 14, 37, 38], // ложь
        [77, 76, 75, 74, 73, 56, 57, 58], // гумманизм
        [103, 104, 105, 106, 107, 108, 125, 124, 123, 122], // варварство
        [50, 27, 28, 29, 30, 31, 32], // свобода
        [128, 127, 126, 125, 124, 123, 122], // рабство
        [114, 115, 92, 91], // квас
        [154, 153, 132, 127, 146, 145, 144, 143], // кокакола
        [41, 40, 39, 64, 65, 66], // даяние
        [124, 109, 110, 111], // торг
    ];
}
