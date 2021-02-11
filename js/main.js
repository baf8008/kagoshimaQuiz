'use strict'

{
    //cssのIDを探す処理
    const question = document.getElementById('question');
    const choices = document.getElementById('choices');
    const btn = document.getElementById('btn');
    const result = document.getElementById('result');
    //cssのセレクタ文字列を使って探す方法の処理
    const scoreLable = document.querySelector('#result > p');

    const quizSet = shuffle([
        { q: '『てげてげ』とは？', c: ['いい加減', '手を挙げて', 'むちゃくちゃ', '全然ダメ'] },
        { q: '『やっせん』とは？', c: ['全然ダメ', '泣き虫', 'やめてくれ', 'いい加減'] },
        { q: '『よかにせ』とは？', c: ['イケメン', '店によってみて', 'それいいね', 'ニセモノ'] },
        { q: '『おやっとさぁ』とは？', c: ['お疲れ様', 'こんにちは', '親とさぁ', 'おはよう'] },
        { q: '『ぐらしか』とは？', c: ['かわいそう', 'くるしい', '見苦しい', 'かわいい'] },
        { q: '『んだもんしたん』とは？', c: ['あら、まぁ', '嫌だ', 'どうにもならない', 'むちゃくちゃ'] },
        { q: '『わっぜ』とは？', c: ['すごい', '大きい', 'わたし', 'わかった'] },
        { q: '『ラーフル』とは？', c: ['黒板消し', '消しゴム', 'ラッパ', '鉛筆'] },
        { q: '『やぜろしい』とは？', c: ['うるさい', 'やっぱり', 'やめられない', '息苦しい'] },
        { q: '『よんごひんご』とは？', c: ['ゆがんでいる', 'いらっしゃい', 'よろしく', '四文字熟語'] },
        { q: '『むぜ』とは？', c: ['かわいい', 'むせた', '無理', '虫'] },
    ]);

    //変数処理
    //現在何番目の問題か
    let currentNum = 0;
    //回答処理
    let isAnswered;
    //正答数の処理
    let score = 0;

    //選択肢をランダムにする
    function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
    }

    //正誤判定処理
    function checkAnswer(li) {
        if(isAnswered === true) {
            return;
        }
        isAnswered = true;

        if (li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            score++;
        } else {
            li.classList.add('wrong');
        }

        //選択肢をクリックするとNEXTボタンが押せるようになる処理
        btn.classList.remove('disabled');
    }

    //画面描写(画面を最初に表示したときの状態)
    function setQuiz() {
        //まだ回答していないと意味のisAnswered＝flaseになる
        isAnswered = false;
        question.textContent = quizSet[currentNum].q;

        //次の問題にいくときに出ていた問題が消える処理
        while(choices.firstChild) {
            choices.removeChild(choices.firstChild);
        }

        const shuffledChoices = shuffle([...quizSet[currentNum].c]);

        shuffledChoices.forEach(choice => {
            const li = document.createElement('li');
            li.textContent = choice;

            //クリック処理
            li.addEventListener('click', () => {
                checkAnswer(li);
            });
            choices.appendChild(li);
        });

        //最後の問題ではNEXTではなくスコアを見るをつける処理
        if (currentNum === quizSet.length - 1) {
            btn.textContent = 'スコアを表示する';
        }
    }

    setQuiz();

    //NEXTを押すと次の問題がでる処理
    btn.addEventListener('click', () => {
        //選択肢をクリックしないとNEXTが押せない処理（分岐条件）
        if (btn.classList.contains('disabled')) {
            return;
        }
        //次の問題にいくと元に戻る処理（グレーになっている）
        btn.classList.add('disabled');

        if (currentNum === quizSet.length - 1) {
            scoreLable.textContent = `スコア  ${score} / ${quizSet.length}`;
            //resultからhiddenクラスを外す処理
            result.classList.remove('hidden');
        } else {
            currentNum++;
            setQuiz();
        }
    });
}