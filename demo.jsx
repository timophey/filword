class App_Demo extends React.Component{

    letters = [
        "МИРБУДУЩЕЕСЧА",
        "СВПРОГРЕССТЬЕ",
        "ЛЛИОНЫПРОШОБО",
        "КОМТРУДЯЩИЕСЯ",
        "МУНЛОЖЬДРУЖБА",
        "ГУММАНИЗМРАЧН",
        "КУЧКАПИТАКВАС",
        "ВРАЖДАРЕГРЕСС",
        "ВАРВАРСТНЕСЧА",
        "ПРАВДАСТЬЕИЗМ",
        "ЭКСПЛУАТЕТЛОЕ",
        "РАБОСТВОЙНАЛИ",
        "КОКАКОЛАЦИЯЗМ"
    ];

    ss = false;
    print_buffer = [];
    shift_buffer = [];
    _switchDelay = 5000;
    _pd = 75;
    _currentWord = 0;
    // 

    constructor(props){
        super(props);
        this.state = {
            leds: [], // 110 LEDS
        }
        //this.scheduledHourMin();
        // setInterval(this.scheduledHourMin.bind(this),this._switchDelay);
        setInterval(this._type.bind(this),this._pd);
        setInterval(this.scheduledWord.bind(this),this._switchDelay);
    }

    scheduledWord(){
        let word = this.words[this._currentWord];
        this.lightsDown();
        this.lightsUp(word,word.length);
        let td = (this._switchDelay) - ((this.print_buffer.length+1) * 1 * this._pd);
        setTimeout(this._tail.bind(this),td);
        this._currentWord++; if( this._currentWord == this.words.length ) this._currentWord = 0;
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
        // console.log(this.shift_buffer.map(n=>+n)); // распечатываем массив из буфера
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
        return;
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
        [0, 1, 2], // мир
        [149, 148, 147, 146, 145], // война
        [10, 11, 12, 16, 15, 14, 13], // счастье
        [112, 113, 114, 115, 116, 123, 122, 121, 120], // несчастье
        [0, 1, 26, 27, 28, 29, 30, 31], // миллионы
        [78, 79, 80, 81, 82], // кучка
        [48, 47, 46, 45, 44, 43, 42, 41, 40, 39], // трудящиеся
        [130, 131, 132, 133, 134, 135, 136, 137, 163, 164, 165, 166], // эксплуатация
        [3, 4, 5, 6, 7, 8, 9], // будущее
        [32, 33, 34, 35, 140, 141, 142], // прошлое
        [25, 24, 138, 139, 140, 141, 142], // светлое
        [69, 68, 67, 66, 65, 141, 142], // мрачное
        [51, 50, 49, 52, 53, 54, 72, 71, 70, 69], // коммунизм
        [81, 82, 83, 84, 85, 86, 144, 143, 167, 168], // капитализм
        [23, 22, 21, 20, 19, 18, 17, 16], // прогресс
        [97, 96, 95, 94, 93, 92, 91], // регресс
        [59, 60, 61, 62, 63, 64], // дружба
        [103, 102, 101, 100, 99, 98], // вражда
        [129, 128, 127, 126, 125, 124], // правда
        [55, 56, 57, 57, 58], // ложь
        [77, 76, 75, 74, 73, 72, 71, 70, 69], // гумманизм
        [104, 105, 106, 107, 108, 109, 110, 111, 149, 148], // варварство
        [25, 24, 36, 37, 38, 99, 98], // свобода
        [155, 154, 153, 151, 150, 149, 148], // рабство
        [87, 88, 89, 90], // квас
        [156, 157, 158, 159, 160, 161, 162, 163], // кокакола
    ];
}
